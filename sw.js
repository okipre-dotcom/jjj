// FP1級トレーナー オフラインキャッシュ
const C='fp1-trainer-v4.14';
const ASSETS=['./','./index.html','./FP1級応用編トレーナー_v4.14_PWA.html','./manifest.json','./icon-192.png','./icon-512.png'].map(u=>encodeURI(u));
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})))});
