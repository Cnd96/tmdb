const baseURL = "https://api.themoviedb.org/3/"
const apiKey = "e45f542dc1606b98a276d491a08b65d9"
const language = "en-US"

// Define API services
angular.module('movieApp').factory('movieDbServices', function ($http, $q) {
    return {
        getPopularMovies: function () {
            return $http.get(`${baseURL}movie/popular?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getPopularTvShows: function () {
            return $http.get(`${baseURL}tv/popular?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getOneMovieDetails: function (id) {
            return $http.get(`${baseURL}movie/${id}?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getOneTvShowDetails: function (id) {
            return $http.get(`${baseURL}tv/${id}?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        getMovieCredits(id) {
            return $http.get(`${baseURL}movie/${id}/credits?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getTVShowCredits(id) {
            return $http.get(`${baseURL}tv/${id}/credits?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        getMultiSearchResult: function (query) {
            return $http.get(`${baseURL}search/multi?api_key=${apiKey}&language=${language}&query=${query}&include_adult=false`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data.results;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getPersonDetails(id) {
            return $http.get(`${baseURL}person/${id}?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getTrendingMoviesToday() {
            return $http.get(`${baseURL}trending/movie/day?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getTrendingMoviesThisWeek() {
            return $http.get(`${baseURL}trending/movie/week?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getPersonCombineCredits(id) {
            return $http.get(`${baseURL}person/${id}/combined_credits?api_key=${apiKey}&language=${language}`)
                .then(function (response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
        },
        getMovieKeywords(id){
            return $http.get(`${baseURL}movie/${id}/keywords?api_key=${apiKey}&language=${language}`)
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            });
        },
        getTvShowKeywords(id){
            return $http.get(`${baseURL}tv/${id}/keywords?api_key=${apiKey}&language=${language}`)
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            });
        },
        getKeywordDetails(id,pageNumber){
            return $http.get(`${baseURL}keyword/${id}/movies?api_key=${apiKey}&language=${language}&page=${pageNumber}`)
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            });
        }
    };

});

