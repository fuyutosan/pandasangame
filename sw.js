const CACHE = 'pandasangame-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/rank_1.png',
  './images/rank_2.png',
  './images/rank_3.png',
  './images/rank_4.png',
  './images/icon-192.png',
  './images/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
