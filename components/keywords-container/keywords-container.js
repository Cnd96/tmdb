angular.module('movieApp').component('keywordsContainer', {
    templateUrl: 'components/keywords-container/keywords-container.html',
    controller: function ($scope, appDataService, $route,$location) {
        $scope.keywords = [];

        this.$onInit = function () {
            if (this.type === "movie") {
                appDataService.getMovieKeywords($route.current.params.movieId).then(function (data) {
                    $scope.keywords=data
                }, function (error) {
                    console.error(error)
                });
            } else if (this.type === "tv") {
                appDataService.getTvShowKeywords($route.current.params.tvShowId).then(function (data) {
                    $scope.keywords=data
                }, function (error) {
                    console.error(error)
                });
            }
        }

        $scope.onKeywordClick=function(keyword){
            $location.path(`/keyword/${keyword.id}/${keyword.name}` );
        }
    },
    bindings: { type: '@' },
});
