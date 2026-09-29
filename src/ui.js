const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=(m)=>{let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2600)};
async function api(url,options={}){const r=await fetch(url,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});let d={};try{d=await r.json()}catch{}if(!r.ok)throw new Error(d.error||'Request failed');return d}
function menu(){ $$('[data-menu]').forEach(b=>b.onclick=()=> $('[data-mobile]')?.classList.toggle('open')); }
async function loadMe(){try{const d=await api('/api/auth/me'); $$('[data-login]').forEach(x=>x.classList.add('hidden')); $$('[data-user]').forEach(x=>{x.textContent=d.user.global_name||d.user.username}); return d.user}catch{return null}}
function loginButtons(){loadMe();$$('[data-logout]').forEach(b=>b.onclick=async()=>{await api('/auth/logout',{method:'POST'});location.href='/'});}
function serverIcon(s){return s.icon?`https://cdn.discordapp.com/icons/${s.id}/${s.icon}.png?size=128`:''}
async function dashboard(){
 const list=$('[data-servers]'); if(!list)return;
 try{const d=await api('/api/servers'); if(!d.servers.length){list.innerHTML='<div class="empty">No manageable servers were returned by Discord.</div>';return}
 list.innerHTML=d.servers.map(s=>`<button class="server-card ${s.botInstalled?'':'not-installed'}" data-server="${s.id}"><span class="server-icon">${serverIcon(s)?`<img src="${serverIcon(s)}" alt="">`:'O'}</span><span><strong>${esc(s.name)}</strong><small>${s.botInstalled?'OpenUtility is installed':'Bot not installed yet'}</small></span><span class="status ${s.botInstalled?'good':''}">${s.botInstalled?'Ready':'Setup'}</span></button>`).join('');
 $$('[data-server]',list).forEach(b=>b.onclick=()=>selectServer(b.dataset.server));
 }catch(e){list.innerHTML=`<div class="empty">${esc(e.message)}<br><a class="btn secondary" href="/auth/discord">Reconnect Discord</a></div>`}
}
async function selectServer(id){localStorage.setItem('ou-server',id);await loadServer(id)}
async function loadServer(id){
 try{const d=await api('/api/servers/'+id); window.__currentConfig=d.config; window.__currentServer=d.server; const root=$('[data-dashboard]');
 if(root){root.classList.remove('hidden'); $('[data-server-list]')?.classList.add('hidden'); $('[data-sname]').textContent=d.server.name; $('[data-members]').textContent=d.server.memberCount??'—'; $('[data-bot]').textContent=d.server.botInstalled?'Online':'Not installed'; $('[data-prefix]').value=d.config.prefix; }
 setSwitch('slash',d.config.commands.slash);setSwitch('prefix',d.config.commands.prefix);setSwitch('mod',d.config.moderation.enabled);setSwitch('logging',d.config.logging.enabled);setSwitch('spam',d.config.moderation.antiSpam);setSwitch('links',d.config.moderation.antiLinks);setSwitch('warnings',d.config.moderation.warnings);setSwitch('messageLog',d.config.logging.message);setSwitch('memberLog',d.config.logging.member);setSwitch('modLog',d.config.logging.moderation);setSwitch('commandLog',d.config.logging.commands);
 fillChannels(d.server.channels||[],d.config); bindDashboard(id);
 }catch(e){toast(e.message)}
}
function fillChannels(channels,c){const opts=['<option value="">Select a channel</option>',...channels.map(x=>`<option value="${x.id}"># ${esc(x.name)}</option>`)];['mod-channel','log-channel'].forEach((id,i)=>{const el=$(`[data-${id}]`);if(el){el.innerHTML=opts.join('');el.value=i?c.logging.channel:c.moderation.modLogChannel}})}
function setSwitch(k,v){const x=$(`[data-switch="${k}"]`);if(x)x.classList.toggle('on',!!v)}
function switchValue(k,fallback=false){const x=$(`[data-switch="${k}"]`);return x?x.classList.contains('on'):fallback}
function bindDashboard(id){
 $$('[data-switch]').forEach(x=>{x.onclick=()=>x.classList.toggle('on')});
 $('[data-save-dashboard]')?.addEventListener('click',async()=>{try{const old=window.__currentConfig||{}; const prefixEl=$('[data-prefix]'); const body={prefix:prefixEl?prefixEl.value:(old.prefix||'!'),commands:{slash:switchValue('slash',old.commands?.slash===true),prefix:switchValue('prefix',old.commands?.prefix===true)},moderation:{...old.moderation,enabled:switchValue('mod'),antiSpam:switchValue('spam'),antiLinks:switchValue('links'),warnings:switchValue('warnings'),modLogChannel:$('[data-mod-channel]')?.value||old.moderation?.modLogChannel||''},logging:{...old.logging,enabled:switchValue('logging'),message:switchValue('messageLog'),member:switchValue('memberLog'),moderation:switchValue('modLog'),commands:switchValue('commandLog'),channel:$('[data-log-channel]')?.value||old.logging?.channel||''}};const d=await api('/api/servers/'+id+'/config',{method:'PUT',body:JSON.stringify(body)});window.__currentConfig=d.config;toast('Changes saved successfully.')}catch(e){toast(e.message)}});
}
function commands(){const input=$('[data-command-search]'),cards=$$('[data-command]'),tabs=$$('[data-mode]'),cats=$$('[data-cat]');let mode='slash',cat='all';const run=()=>{let q=(input?.value||'').toLowerCase();cards.forEach(c=>{let ok=(cat==='all'||c.dataset.cat===cat)&&(!q||c.textContent.toLowerCase().includes(q));c.classList.toggle('hidden',!ok);let code=$('code',c);if(code){const name=c.dataset.name;code.textContent=(mode==='slash'?'/':'!')+name}})};input?.addEventListener('input',run);tabs.forEach(x=>x.onclick=()=>{tabs.forEach(t=>t.classList.remove('active'));x.classList.add('active');mode=x.dataset.mode;run()});cats.forEach(x=>x.onclick=()=>{cats.forEach(c=>c.classList.remove('active'));x.classList.add('active');cat=x.dataset.cat;run()});run()}
function configPage(kind){const id=localStorage.getItem('ou-server');if(!id){toast('Open Dashboard and select a server first.');return}loadServer(id);}
function esc(s){return String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
menu();loginButtons();dashboard();commands();
if(location.pathname.includes('moderation')||location.pathname.includes('logging'))configPage();
