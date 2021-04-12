angular.module('movieApp').factory('dynamicCachingService', function (movieDbServices) {
    let cacheDynamicData=function(url){
        if('caches'in window){
            caches.open('dynamic')
            .then(cache => {
              cache.add(url);
            })
        }
    }
    return {
        cacheDynamicData
    };


})