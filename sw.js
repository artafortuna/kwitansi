const CACHE_NAME = 'kwitansi-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './1000325927.jpg',
    './logo.png'
];

// Install Service Worker dan simpan file ke cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Membuka cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Ambil file dari cache jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Jika ada di cache, gunakan yang di cache. Jika tidak, ambil dari network
            return response || fetch(event.request);
        })
    );
});
