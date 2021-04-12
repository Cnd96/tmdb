const movieText = "Movies"
const tvShowText = "TV Shows"

angular.module('movieApp').component('popularMovies', {
    templateUrl: 'components/popular/popular.html',
    controller: function ($scope, appDataService, $location) {
        const getPopularTvShows=function(){
            appDataService.getPopularTvShows().then(function (data) {
                $scope.popularData = data
                $scope.$apply()
            }, function (error) {
                console.error(error)
            });
        }

        const getPopularMovies=function(){
            appDataService.getPopularMovies().then(function (data) {
                $scope.popularData = data
                $scope.$apply()
            }, function (error) {
                console.error(error)
            });
        }

        $scope.popularText1 = tvShowText
        $scope.popularText2 = movieText
        $scope.popularCurrentItem = tvShowText
        $scope.popularData = [];
        getPopularTvShows()
        
        $scope.onToggleChange = function (clickValue) {
            if (clickValue === movieText) {
                getPopularMovies()
                $scope.popularCurrentItem = movieText
            }
            else {
                getPopularTvShows()
                $scope.popularCurrentItem = tvShowText
            }
        }

        $scope.onItemClick = function (id) {
            if ($scope.popularCurrentItem === movieText) {
                $location.path(`/movie/${id}`)
            }
            else {
                $location.path(`/tv/${id}`)
            }
        }


    }
});
