// Brain Master – Offline Service Worker (Cache-First strategy for 100% offline gameplay)
const CACHE_NAME = 'brain-master-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.png',
  '/screenshot-mobile.png',
  '/screenshot-desktop.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For HTML navigation requests (opening the app or refreshing)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Offline fallback
          const cached = await caches.match(event.request, { ignoreSearch: true });
          if (cached) return cached;
          const indexCached = await caches.match('/index.html');
          if (indexCached) return indexCached;
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;
          return new Response('Brain Master Offline', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // For static assets, scripts, images, styles
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          // If image fails offline, return icon
          if (event.request.destination === 'image') {
            return caches.match('/icon-192.png');
          }
        });
    })
  );
});
