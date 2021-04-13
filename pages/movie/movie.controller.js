angular.module('movieApp').controller('MovieController', ["$scope", "$route", "appDataService", "$window", function ($scope, $route, appDataService, $window) {
    $window.scrollTo(0, 0);
    const MOVIEID = $route.current.params.movieId
    const randomNumber = Math.floor(Math.random() * 8) + 1
    $scope.linearColor = `mainLinearColor${randomNumber}`
    $scope.colorClass = `colors-class-${randomNumber}`
    $scope.movieData;
    $scope.crew = [];

    appDataService.getSingleMovieDetails(MOVIEID).then(function (data) {
        $scope.movieData = data;
        calculateInnerWidth();
        $scope.$apply()
    }, function (error) {
        console.error(error)
    });

    appDataService.getMovieCredits(MOVIEID).then(function (data) {
        $scope.crew = data.crew.filter(r => r.department == "Directing" || r.department == "Production")
        $scope.$apply()
    }, function (error) {
        console.error(error)
    });

    function calculateInnerWidth() {
        if ($window.innerWidth < 767) {
            angular.element('#movie-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1) , rgba(var(--${$scope.linearColor}), 0.05)),url('${$scope.movieData.backdropPath}')`);
        } else {
            angular.element('#movie-bg-poster-id').css('background-image', `linear-gradient(to right, rgba(var(--${$scope.linearColor}), 1), rgba(var(--${$scope.linearColor}), 0.75)),url('${$scope.movieData.backdropPath}')`);
        }
    }
    angular.element($window).on('resize', calculateInnerWidth);
    $scope.$on('$destroy', function cleanUp() {
        angular.element($window).off('resize', calculateInnerWidth);
    })
}]);