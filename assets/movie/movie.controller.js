'use strict';

angular.module('movieApp').controller('MovieController', function ($scope, $route, $location,appData,$window) {
    $window.scrollTo(0, 0);
    const randomNumber = Math.floor(Math.random() * 8) + 1
    $scope.linearColor = "mainLinearColor" + randomNumber
    $scope.colorClass = "colors-class-" + randomNumber

    $scope.movieData;
    $scope.crew = [];

    $scope.movieId = $route.current.params.movieId

    appData.getSingleMovieDetails($scope.movieId).then(function (data) {
       $scope.movieData=data;
       console.log(data)
    }, function (error) {
        console.log(error)
    });

    appData.getMovieCredits($scope.movieId).then(function (data) {
        
        $scope.crew = data.crew.filter(r => r.department == "Directing" || r.department == "Production")
    }, function (error) {
        console.log(error)
    });

  


    

});





