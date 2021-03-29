'use strict';


angular.module('movieApp').controller('MovieController',["$scope","$route","appDataService","$window" , function ($scope, $route,appDataService,$window) {
    $window.scrollTo(0, 0);
    const randomNumber = Math.floor(Math.random() * 8) + 1
    $scope.linearColor =   `mainLinearColor${randomNumber}`
    $scope.colorClass = `colors-class-${randomNumber}`
    $scope.movieData;
    $scope.crew = [];
    $scope.movieId = $route.current.params.movieId

    appDataService.getSingleMovieDetails($scope.movieId).then(function (data) {
       $scope.movieData=data;
       
       calculateInnerWidth();
    }, function (error) {
        console.log(error)
    });
    
    
    
    appDataService.getMovieCredits($scope.movieId).then(function (data) {
        $scope.crew = data.crew.filter(r => r.department == "Directing" || r.department == "Production")
    }, function (error) {
        console.log(error)
    });
    

    function calculateInnerWidth(){
        if($window.innerWidth<767){
            angular.element('#movie-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1) , rgba(var(--${$scope.linearColor}), 0.05)),url('http://image.tmdb.org/t/p/w780${$scope.movieData.backdropPath}')`);
            
           }else{
            angular.element('#movie-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1), rgba(var(--${$scope.linearColor}), 0.75)),url('http://image.tmdb.org/t/p/w780${$scope.movieData.backdropPath}')`);
              
           }
    }
    angular.element($window).on('resize', calculateInnerWidth);
    $scope.$on('$destroy', function cleanUp() {
        angular.element($window).off('resize', calculateInnerWidth);
    })

  

}]);