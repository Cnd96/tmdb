const cacheName = 'static-v1.10';

const cacheAssets = [
  '/',
  './index.html#!/main',
  './pages/main/main-page.html',
  './components/popular/popular.html',
  './directives/toggle-button.directive.html',
  './directives/movie-tv-vertical-card.directive.html',
  './app.js',
  './assets/main2.jpg',
  './dist/main.css',
  './dist/main.js',
  './assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
  // 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&family=Poppins:wght@300;400;500&display=swap',
  // 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  // 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cuNRnDX02digyoqYVyFGkwd78fn.jpg',
//   './app.js'
];

// Call Install Event
self.addEventListener('install', e => {
  
    e.waitUntil(
      caches.open(cacheName)
        .then(cache => {
          console.log('Service Worker: Caching Files');
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  });

  // Call Fetch Event
self.addEventListener('fetch', e => {
    e.respondWith(
      fetch(e.request)
      .catch(function(err){
        return caches.match(e.request)
      })
    );
  });
  