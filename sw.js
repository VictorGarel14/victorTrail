/* Victor Trail : fonctionne hors ligne (réseau d'abord pour les données, cache en secours) */
const V='vt-2';
const CORE=['./','index.html','anim.js','manifest.webmanifest','img/icon.svg','img/apple-touch-icon.png','img/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='vt-tiles').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const net=(req,cache)=>fetch(req).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(cache).then(x=>x.put(req,c))}return r});
async function trimTiles(){const c=await caches.open('vt-tiles');const k=await c.keys();if(k.length>600)for(const r of k.slice(0,k.length-600))await c.delete(r)}
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  // tuiles de carte : cache d'abord (consultées avant la course = disponibles sans réseau)
  if(/tile\.opentopomap\.org|tile\.openstreetmap\.org/.test(u.hostname)){e.respondWith(caches.open('vt-tiles').then(c=>c.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r.ok){c.put(e.request,r.clone());trimTiles()}return r}))));return}
  // bibliothèques et polices : cache d'abord
  if(/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)){e.respondWith(caches.match(e.request).then(m=>m||net(e.request,V)));return}
  // météo, routes : réseau, sinon dernière réponse
  if(/api\.open-meteo\.com|router\.project-osrm\.org/.test(u.hostname)){e.respondWith(net(e.request,V).catch(()=>caches.match(e.request)));return}
  if(u.origin!==location.origin)return;
  // live.json et pages : réseau d'abord, cache si pas de réseau
  e.respondWith(net(e.request,V).catch(()=>caches.match(e.request,{ignoreSearch:/live\.json$/.test(u.pathname)}).then(m=>m||caches.match('index.html'))))});
