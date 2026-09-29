import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
function loadEnv(){try{const text=fsSync.readFileSync(path.join(__dirname,'.env'),'utf8');for(const line of text.split(/\r?\n/)){const m=line.match(/^\s*([A-Za-z_][\w]*)\s*=\s*(.*)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'')}}catch{}}
loadEnv();
const PORT=Number(process.env.PORT||3000), DATA_FILE=path.resolve(__dirname,process.env.DATA_FILE||'./data/config.json');
const sessions=new Map(), states=new Map(); let db={guilds:{}};
const defaults={prefix:'!',commands:{slash:true,prefix:true},moderation:{enabled:true,antiSpam:true,antiLinks:false,warnings:true,autoTimeout:false,timeoutMinutes:10,modLogChannel:''},logging:{enabled:true,message:false,member:true,moderation:true,commands:true,channel:''},noPrefixUsers:[]};
async function loadDb(){try{db=JSON.parse(await fs.readFile(DATA_FILE,'utf8'))}catch{await saveDb()}}
let queue=Promise.resolve();function saveDb(){queue=queue.then(async()=>{await fs.mkdir(path.dirname(DATA_FILE),{recursive:true});const t=DATA_FILE+'.tmp';await fs.writeFile(t,JSON.stringify(db,null,2));await fs.rename(t,DATA_FILE)}).catch(console.error);return queue}
function cfg(id){db.guilds[id] ||= structuredClone(defaults);const x=db.guilds[id];x.commands={...defaults.commands,...(x.commands||{})};x.moderation={...defaults.moderation,...(x.moderation||{})};x.logging={...defaults.logging,...(x.logging||{})};return x}
function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').filter(Boolean).map(x=>{const i=x.indexOf('=');return [x.slice(0,i).trim(),decodeURIComponent(x.slice(i+1))]}))}
function setCookie(res,name,value,maxAge=86400){res.setHeader('Set-Cookie',`${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV==='production'?'; Secure':''}`)}
function json(res,status,data){const b=JSON.stringify(data);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(b)});res.end(b)}
function text(res,status,data,type='text/plain'){res.writeHead(status,{'Content-Type':type});res.end(data)}
function session(req){const id=cookies(req).ou_session;return id?sessions.get(id):null}
async function body(req){let b='';for await(const c of req)b+=c;if(b.length>300000)throw Error('Request too large');return b?JSON.parse(b):{}}
async function discord(pathname,opts={}){const r=await fetch('https://discord.com/api/v10'+pathname,{...opts,headers:{Authorization:`Bot ${process.env.DISCORD_BOT_TOKEN}`,...(opts.headers||{})}});const d=await r.json();if(!r.ok)throw Error(d.message||`Discord API ${r.status}`);return d}
async function oauthGet(token,p){const r=await fetch('https://discord.com/api/v10'+p,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();if(!r.ok)throw Error(d.message||'Discord OAuth request failed');return d}
async function tokenExchange(data){const r=await fetch('https://discord.com/api/v10/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data)});const d=await r.json();if(!r.ok)throw Error(d.error_description||d.error||'OAuth token exchange failed');return d}
async function ensure(s){if(s.expiresAt>Date.now()+60000)return;if(!s.refreshToken)throw Error('Discord session expired; please log in again.');const t=await tokenExchange({client_id:process.env.DISCORD_CLIENT_ID,client_secret:process.env.DISCORD_CLIENT_SECRET,grant_type:'refresh_token',refresh_token:s.refreshToken});s.accessToken=t.access_token;s.refreshToken=t.refresh_token||s.refreshToken;s.expiresAt=Date.now()+Number(t.expires_in||604800)*1000}
function manageable(g){return g.owner || ((BigInt(g.permissions||'0')&0x20n)===0x20n)}
async function authorizedGuild(s,id){await ensure(s);const gs=await oauthGet(s.accessToken,'/users/@me/guilds');const g=gs.find(x=>x.id===id&&manageable(x));if(!g)throw Object.assign(Error('You do not have permission to manage this server.'),{status:403});return g}
function redirect(res,to){res.writeHead(302,{Location:to});res.end()}
async function api(req,res,url){
 try{
  if(url.pathname==='/api/health')return json(res,200,{ok:true,oauth:!!(process.env.DISCORD_CLIENT_ID&&process.env.DISCORD_CLIENT_SECRET&&process.env.DISCORD_REDIRECT_URI),bot:!!process.env.DISCORD_BOT_TOKEN,storage:true});
  const s=session(req); if(url.pathname==='/api/auth/me'){if(!s)return json(res,401,{error:'Authentication required'});return json(res,200,{user:s.user})}
  if(url.pathname==='/api/servers'&&req.method==='GET'){
   if(!s)return json(res,401,{error:'Authentication required'});await ensure(s);const gs=await oauthGet(s.accessToken,'/users/@me/guilds');let bot=new Set();if(process.env.DISCORD_BOT_TOKEN){try{bot=new Set((await discord('/users/@me/guilds')).map(x=>x.id))}catch{}}
   return json(res,200,{servers:gs.filter(manageable).map(g=>({id:g.id,name:g.name,icon:g.icon,owner:g.owner,botInstalled:bot.has(g.id),permissions:g.permissions}))})
  }
  const m=url.pathname.match(/^\/api\/servers\/([^/]+)(?:\/config)?$/);if(m){if(!s)return json(res,401,{error:'Authentication required'});const id=m[1];const g=await authorizedGuild(s,id);if(url.pathname.endsWith('/config')){if(req.method==='GET')return json(res,200,{config:cfg(id)});if(req.method==='PUT'){const incoming=await body(req),old=cfg(id),next={...old,...incoming,commands:{...old.commands,...(incoming.commands||{})},moderation:{...old.moderation,...(incoming.moderation||{})},logging:{...old.logging,...(incoming.logging||{})}};if(typeof next.prefix!=='string'||!/^[^\s]{1,5}$/.test(next.prefix))return json(res,400,{error:'Prefix must be 1–5 non-space characters.'});db.guilds[id]=next;await saveDb();return json(res,200,{ok:true,config:next})}}
   let live={id:g.id,name:g.name,icon:g.icon,botInstalled:false,memberCount:null,channels:[]};if(process.env.DISCORD_BOT_TOKEN){try{const bg=await discord(`/guilds/${id}?with_counts=true`);live={...live,name:bg.name,icon:bg.icon,botInstalled:true,memberCount:bg.approximate_member_count||bg.member_count||null};live.channels=(await discord(`/guilds/${id}/channels`)).filter(c=>c.type===0).map(c=>({id:c.id,name:c.name}))}catch(e){live.botError=e.message}}
   return json(res,200,{server:live,config:cfg(id)})
  }
  return json(res,404,{error:'Not found'});
 }catch(e){console.error(e);return json(res,e.status||502,{error:e.message})}
}
async function main(){await loadDb();const server=http.createServer(async(req,res)=>{const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
 if(url.pathname==='/auth/discord'){if(!process.env.DISCORD_CLIENT_ID||!process.env.DISCORD_CLIENT_SECRET||!process.env.DISCORD_REDIRECT_URI)return text(res,503,'Discord OAuth is not configured. Copy .env.example to .env and add your credentials.');const state=crypto.randomBytes(24).toString('hex');states.set(state,Date.now()+300000);const p=new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID,response_type:'code',redirect_uri:process.env.DISCORD_REDIRECT_URI,scope:'identify guilds',state});return redirect(res,'https://discord.com/oauth2/authorize?'+p)}
 if(url.pathname==='/auth/discord/callback'){try{const {code,state}=Object.fromEntries(url.searchParams);const exp=states.get(state);states.delete(state);if(!code||!exp||exp<Date.now())return text(res,400,'Invalid or expired OAuth state.');const t=await tokenExchange({client_id:process.env.DISCORD_CLIENT_ID,client_secret:process.env.DISCORD_CLIENT_SECRET,grant_type:'authorization_code',code,redirect_uri:process.env.DISCORD_REDIRECT_URI});const u=await oauthGet(t.access_token,'/users/@me');const id=crypto.randomBytes(32).toString('hex');sessions.set(id,{user:u,accessToken:t.access_token,refreshToken:t.refresh_token,expiresAt:Date.now()+Number(t.expires_in||604800)*1000});setCookie(res,'ou_session',id);return redirect(res,'/src/pages/dashboard.html')}catch(e){return text(res,500,'Discord login failed: '+e.message)}}
 if(url.pathname==='/auth/logout'&&req.method==='POST'){const id=cookies(req).ou_session;if(id)sessions.delete(id);res.setHeader('Set-Cookie','ou_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');return json(res,200,{ok:true})}
 if(url.pathname.startsWith('/api/'))return api(req,res,url);
 let file=url.pathname==='/'?'/index.html':url.pathname;file=path.normalize(path.join(__dirname,file));if(!file.startsWith(__dirname))return text(res,403,'Forbidden');try{const data=await fs.readFile(file);const ext=path.extname(file);const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});res.end(data)}catch{text(res,404,'Not found')}});server.listen(PORT,()=>console.log(`OpenUtility Bot web running on http://localhost:${PORT}`))}
main();
