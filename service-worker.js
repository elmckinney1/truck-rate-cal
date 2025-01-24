const cacheName = 'truck-rate-calculator-v1';
const filesToCache = [
'/',
'/index.html',
'/app.js',
'/manifest.json',
'/icon-192x192.png',
'/icon-512x512.png'
];

self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
);
});

self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => response || fetch(event.request))
);
});