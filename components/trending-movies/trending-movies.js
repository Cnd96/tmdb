const today = "Today"
const thisWeek = "Week"

angular.module('movieApp').component('trendingMovies', {

    templateUrl: 'components/trending-movies/trending-movies.html',
    controller: function ($scope, appDataService,$location) {
        $scope.title = 'Trending Movies'

        $scope.trendingText1 = today
        $scope.trendingText2 = thisWeek
        $scope.trendingCurrentItem = today
        $scope.trendingMovies = [];
        $scope.trendingTvShows = [];
        $scope.trendingData = [];
        appDataService.getTrendingMoviesThisWeek().then(function (data) {
            $scope.trendingMoviesThisWeek = data
            $scope.$apply()
        }, function (error) {
            console.log(error)
        });

        appDataService.getTrendingMoviesToday().then(function (data) {
            $scope.trendingMoviesToday = data
            $scope.trendingData = $scope.trendingMoviesToday
            $scope.$apply()
        }, function (error) {
            console.log(error)
        });

        $scope.onToggleTrendingChange = function (clickValue) {
            if (clickValue === today) {
                $scope.trendingData = $scope.trendingMoviesToday
                $scope.trendingCurrentItem = today
            }
            else {
                $scope.trendingData = $scope.trendingMoviesThisWeek
                $scope.trendingCurrentItem = thisWeek
            }
        }

        $scope.onTrendingItemClick = function (id) {
            $location.replace()
            $location.url(`/movie/${id}`);

        }
    }
});
