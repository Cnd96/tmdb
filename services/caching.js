angular.module('movieApp').factory('dynamicCachingService', function () {
    let cacheDynamicImages=function(images){
        if('caches'in window){
            caches.open('dynamic')
            .then(cache => {
              cache.addAll(images.filter(i=>i!==""));
            })
        }
    }
    let cacheDynamicUrl=function(url){
        if('caches'in window){
            caches.open('dynamic')
            .then(cache => {
              cache.add(url);
            })
        }
    }
    return {
        cacheDynamicImages,
        cacheDynamicUrl
    };


})