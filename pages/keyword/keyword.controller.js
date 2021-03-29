'use strict';

angular.module('movieApp').controller('KeywordController',["$scope","$route","$location","appDataService","$window" , function ($scope, $route,$location, appDataService, $window) {
    $window.scrollTo(0, 0);
    $scope.keywordId = $route.current.params.keywordId
    $scope.keyWord = $route.current.params.keyWord
    $scope.currentPage = 1;
    $scope.totalResults;
    $scope.totalPages=1;
    $scope.results = [];

    let getData=function(id,pageNumber){
        appDataService.getKeywordDetails(id, pageNumber).then(function (data) {
            $scope.totalResults = data.totalResults
            $scope.results = data.results
            $scope.totalPages=data.totalPages
        }, function (error) {
            console.log(error)
        });
    }
    getData($scope.keywordId,1)

    $scope.onPageClick=function(v){
        getData($scope.keywordId,v)
        $window.scrollTo(0, 0);
    }

    $scope.onMovieCardClick = function (id) {
		$location.replace()
		$location.url(`/movie/${id}`);
	}
}]);