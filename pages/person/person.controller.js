'use strict';

angular.module('movieApp').controller('PersonController',[ "$scope","$route","appDataService","$window" , function ($scope, $route, appDataService, $window) {
    $window.scrollTo(0, 0);
    const PERSONID = $route.current.params.personId
    $scope.personDetails;
    $scope.strLimit = 850;
    $scope.showMore = false


    appDataService.getPersonDetails(PERSONID).then(function (data) {
        $scope.personDetails = data;
        
        if ($scope.personDetails.biography.length > $scope.strLimit) {
            $scope.showMore = true
        }
    }, function (error) {
        console.log(error)
    });


    $scope.onShowMoreClick = function () {
        $scope.strLimit = $scope.personDetails.biography.length;
        $scope.showMore = false;
    };


}]);