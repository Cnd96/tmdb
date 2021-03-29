const movieText = "Movies"
const tvShowText = "TV Shows"

angular.module('movieApp').component('popularMovies', {
    templateUrl: 'components/popular/popular.html',
    controller: function ($scope, appDataService, $location) {
        $scope.popularText1 = tvShowText
        $scope.popularText2 = movieText
        $scope.popularCurrentItem = tvShowText
        $scope.popularMovies = [];
        $scope.popularTvShows = [];
        $scope.popularData = [];

        appDataService.getPopularMovies().then(function (data) {
            $scope.popularMovies = data  
            $scope.$apply()
        }, function (error) {
            console.log(error)
        });

        appDataService.getPopularTvShows().then(function (data) {
            $scope.popularTvShows = data
            $scope.popularData = $scope.popularTvShows
            $scope.$apply()
        }, function (error) {
            console.log(error)
        });

        $scope.onToggleChange = function (clickValue) {
            if (clickValue === movieText) {
                $scope.popularData = $scope.popularMovies
                $scope.popularCurrentItem = movieText
            }
            else {
                $scope.popularData = $scope.popularTvShows
                $scope.popularCurrentItem = tvShowText
            }
        }

        $scope.onItemClick = function (id) {
            $location.replace()
            if ($scope.popularCurrentItem === movieText) {
                $location.url(`/movie/${id}`);
            }
            else {
                $location.url(`/tv/${id}`);
            }
        }


    }
});
