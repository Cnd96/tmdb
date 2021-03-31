'use strict';

angular.module('movieApp').controller('TvController',["$scope","$route","appDataService","$window" , function ($scope, $route,appDataService,$window) {
    $window.scrollTo(0, 0);
    const TVSHOWID = $route.current.params.tvShowId
    const randomNumber = Math.floor(Math.random() * 8) + 1
    $scope.linearColor =   `mainLinearColor${randomNumber}`
    $scope.colorClass = `colors-class-${randomNumber}`
    $scope.tvShowData = []
    $scope.seasons=[]

    appDataService.getSingleTVShowDetails(TVSHOWID).then(function (data) {
        
        data.seasons.sort((b,a) => (a.seasonNo > b.seasonNo) ? 1 : ((b.seasonNo > a.seasonNo) ? -1 : 0))  
        data.seasons.forEach(s=>{
            if(s.overview==undefined||s.overview==""){
                s.overview=`Season ${s.seasonNo} of ${data.title} premiered on ${appDataService.getDateMonthString(s.realeseDate)}.`;
            }
        })
        $scope.tvShowData = data
        $scope.seasons=data.seasons
        calculateInnerWidth();
     }, function (error) {
         console.error(error)
     });


    function calculateInnerWidth(){
        if($window.innerWidth<767){
         angular.element('#tv-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1), rgba(var(--${$scope.linearColor}), 0.05)),url('http://image.tmdb.org/t/p/w780${$scope.tvShowData.backdropPath}')`);
         
        }else{
         angular.element('#tv-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1), rgba(var(--${$scope.linearColor}), 0.75)),url('http://image.tmdb.org/t/p/w780${$scope.tvShowData.backdropPath}')`);
        }
    }
    angular.element($window).on('resize', calculateInnerWidth);
    $scope.$on('$destroy', function cleanUp() {
        angular.element($window).off('resize', calculateInnerWidth);
    })
}]);