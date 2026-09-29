document.addEventListener('DOMContentLoaded',()=>{
  const m=document.querySelector('[data-menu]');
  const n=document.querySelector('[data-mobile]');
  if(m&&n)m.onclick=()=>n.classList.toggle('hidden');
  document.querySelectorAll('[data-toggle]').forEach(x=>x.onclick=()=>x.classList.toggle('on'));
  const s=document.querySelector('[data-search]');
  if(s){const rows=[...document.querySelectorAll('[data-command]')];s.oninput=()=>{const q=s.value.toLowerCase();rows.forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?'block':'none')}}
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.links a').forEach(a=>{const href=a.getAttribute('href')||'';if(href.endsWith(page))a.classList.add('active');});
});
