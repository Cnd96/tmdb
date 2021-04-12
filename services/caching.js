angular.module('movieApp').factory('dynamicCachingService', function (movieDbServices) {
    let cacheDynamicDataWithImages=function(url,images){
        if('caches'in window){
            caches.open('dynamic')
            .then(cache => {
              cache.addAll([url,...images]);
            })
        }
    }
    return {
        cacheDynamicDataWithImages
    };


})