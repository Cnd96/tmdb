angular.module('movieApp').component('cast', {
    templateUrl: 'components/cast/cast.html',
    controller: function ($scope, appDataService, $route, $location) {
        $scope.cast = [];

        this.$onInit = function () {
            if (this.type === "movie") {
                appDataService.getMovieCredits($route.current.params.movieId).then(function (data) {
                    $scope.cast = data.cast
                }, function (error) {
                    console.log(error)
                });
            } else if (this.type === "tv") {
                appDataService.getTVShowCredits($route.current.params.tvShowId).then(function (data) {
                    $scope.cast = data.cast
                }, function (error) {
                    console.log(error)
                });
            }
        }
        $scope.onPersonCardClick = function (id) {
            $location.path(`/person/${id}`);
        }
    },
    bindings: { type: '@' },
});
