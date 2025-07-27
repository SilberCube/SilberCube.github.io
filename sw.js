// Dieser Code sollte in einer Datei namens sw.js im Hauptverzeichnis gespeichert werden.

const CACHE_NAME = 'dashboard-cache-v1';
// Liste der Dateien, die für den Offline-Modus zwischengespeichert werden sollen.
const urlsToCache = [
  '/',
  '/index.html', // Fügen Sie den Namen Ihrer HTML-Datei hinzu, falls er anders ist
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/lucide/dist/umd/lucide.min.js'
];

// Installation des Service Workers und Caching der App-Shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
});

// Abrufen von Anfragen aus dem Cache oder dem Netzwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Wenn die Anfrage im Cache gefunden wird, wird sie von dort zurückgegeben
        if (response) {
          return response;
        }
        // Andernfalls wird die Anfrage an das Netzwerk weitergeleitet
        return fetch(event.request);
      })
  );
});

// Aufräumen von altem Cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
