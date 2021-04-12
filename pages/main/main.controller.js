angular.module('movieApp').controller('MainController',["$scope","$location","$window" ,function ($scope, $location, $window) {
    $window.scrollTo(0, 0);
    $scope.searchResult = "";
    $scope.searchClicked = function () {
        if ($scope.searchResult.length == 0) {
            alert("Empty search")
        } else {
            $location.replace()
            $location.url(`/search?query=${$scope.searchResult}`);
        }
    }
    
}]);


