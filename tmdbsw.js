const STATICCACHENAME = 'static-v4.00';
const DYNAMIC='dynamic';


const STATICCACHEASSETS = [
  '/',
  './index.html#!/main',
  './pages/main/main-page.html',
  './pages/movie/movie-page.html',
  './pages/movie//movie-page.html',
  './components/cast/cast.html',
  './components/keywords-container/keywords-container.html',
  './components/popular/popular.html',
  './components/trending-movies/trending-movies.html',
  './directives/crew-container.directive.html',
  './directives/toggle-button.directive.html',
  './directives/movie-tv-vertical-card.directive.html',
  './directives/people-vertical-card.directive.html',
  './app.js',
  './assets/main2.jpg',
  './dist/main.css',
  './dist/main.js',
  './assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&family=Poppins:wght@300;400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
];

// Call Install Event
self.addEventListener('install', e => {
  
    e.waitUntil(
      caches.open(STATICCACHENAME)
        .then(cache => {
          cache.addAll(STATICCACHEASSETS);
        })
        .then(() => self.skipWaiting())
    );
  });

  
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key!==STATICCACHENAME&&key!==DYNAMIC){
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim();
});

  // Call Fetch Event
self.addEventListener('fetch', e => {
  // self.clients.matchAll().then(function(w){
  //   console.log(w[0].url===self.registration.scope+'#!/main');
  // })
    // if(e.request.destination==="image"){
    //   e.respondWith(
    //     fetch(e.request)
    //     .then(function(res){
    //       return caches.open(DYNAMIC)
    //       .then(function(cache){
    //         cache.put(e.request.url,res.clone());
    //         return res;
    //       })
    //     })
    //     .catch(function(err){
    //       return caches.match(e.request)
    //     })
    //   );
    // }
    // else{
      e.respondWith(
        fetch(e.request)
        .catch(function(err){
          return caches.match(e.request)
        })
      );
    // }
    
  });
  