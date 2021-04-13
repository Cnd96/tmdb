const DBPROMISE = idb.open('tmdb-movie-store', 1, function (db) {
  if (!db.objectStoreNames.contains('movies')) {
    db.createObjectStore('movies', { keyPath: 'id' });
    db.createObjectStore('tvShows', { keyPath: 'id' });
    db.createObjectStore('movies-credits', { keyPath: 'id' });
  }
});

angular.module('movieApp').factory('iDbService', function () {

  let saveMovie = function (data) {
    DBPROMISE
      .then(function (db) {
        let tx = db.transaction('movies', 'readwrite');
        let store = tx.objectStore('movies');
        store.put(data);
        return tx.complete;
      });
  }
  let getMovie = function (key) {
    return DBPROMISE
      .then(function (db) {
        let tx = db.transaction('movies', 'readonly');
        let store = tx.objectStore('movies');
        return store.get(parseInt(key));
      })
  }

  let saveMovieCredits = function (data) {
    DBPROMISE
      .then(function (db) {
        let tx = db.transaction('movies-credits', 'readwrite');
        let store = tx.objectStore('movies-credits');
        store.put(data);
        return tx.complete;
      });
  }
  let getMovieCredits = function (key) {
    return DBPROMISE
      .then(function (db) {
        let tx = db.transaction('movies-credits', 'readonly');
        let store = tx.objectStore('movies-credits');
        return store.get(parseInt(key));
      })
  }
  return {
    saveMovie,
    getMovie,
    saveMovieCredits,
    getMovieCredits
  };

})