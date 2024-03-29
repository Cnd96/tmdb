
angular.module('movieApp').factory('appDataService', function (movieDbServices,dynamicCachingService,iDbService) {
    const movieText = "movie", tvText = "tv", personText = "person";

    let popularMovies = [], popularTvShows = [],trendingMovieToday=[],trendingMoviesThisWeek=[];

    // Returns popular movies. First check in popularMovies to stop unneccesary api calls.
    let getPopularMovies = function () {
        return new Promise((resolve, reject) => {
            if (popularMovies.length > 0) {
                resolve(popularMovies)
            }
            else {
                    movieDbServices.getPopularMovies().then(function (data) {
                    popularMovies = data.data.results.map(movie => new MovieTvOverview(movie)) 
                    dynamicCachingService.cacheDynamicImages(popularMovies.map(M=>M.posterW300Path))
                    dynamicCachingService.cacheDynamicUrl(data.url)
                    resolve(popularMovies)
                }, function (error) {
                    reject(error);
                });
            }
        });
    };

    // Returns trending movies today. First check in popularMovies to stop unneccesary api calls.
    let getTrendingMoviesToday = function () {
        return new Promise((resolve, reject) => {
            if (trendingMovieToday.length > 0) {
                resolve(trendingMovieToday)
            }
            else {
                    movieDbServices.getTrendingMoviesToday().then(function (data) {
                    trendingMovieToday = data.data.results.map(movie => new MovieTvOverview(movie))
                    dynamicCachingService.cacheDynamicImages(trendingMovieToday.map(M=>M.posterW300Path))
                    dynamicCachingService.cacheDynamicUrl(data.url)
                    resolve(trendingMovieToday)
                }, function (error) {
                    reject(error);
                });
            }
        });
    };

    // Returns trending movies this week. First check in popularMovies to stop unneccesary api calls.
    let getTrendingMoviesThisWeek = function () {
        return new Promise((resolve, reject) => {
            if (trendingMoviesThisWeek.length > 0) {
                resolve(trendingMoviesThisWeek)
            }
            else {
                    movieDbServices.getTrendingMoviesThisWeek().then(function (data) {
                    trendingMoviesThisWeek = data.data.results.map(movie => new MovieTvOverview(movie))
                    dynamicCachingService.cacheDynamicImages(trendingMoviesThisWeek.map(M=>M.posterW300Path))
                    dynamicCachingService.cacheDynamicUrl(data.url)
                    resolve(trendingMoviesThisWeek)
                }, function (error) {
                    reject(error);
                });
            }
        });
    };

    // Returns popular tv shows. First check in popularTvShows to stop unneccesary api calls.
    let getPopularTvShows = function () {
        return new Promise((resolve, reject) => {
            if (popularTvShows.length > 0) {
                resolve(popularTvShows)
            }
            else {
                movieDbServices.getPopularTvShows().then(function (data) {
                    popularTvShows = data.data.results.map(tv => new MovieTvOverview(tv))
                    dynamicCachingService.cacheDynamicImages(popularTvShows.map(T=>T.posterW300Path))
                    dynamicCachingService.cacheDynamicUrl(data.url)
                    resolve(popularTvShows)
                }, function (error) {
                    reject(error);
                });
            }
        });
    };

    let getSingleMovieDetails = function (id) {
        return new Promise((resolve, reject) => {
            iDbService.getMovie(id).then(function(movie){
                if(movie==undefined){
                    movieDbServices.getOneMovieDetails(id).then(function (data) {
                        const dataToReturn=new Movie(data.data)
                        iDbService.saveMovie(dataToReturn)
                        dynamicCachingService.cacheDynamicImages([dataToReturn.posterPath,dataToReturn.backdropPath])
                        resolve(dataToReturn)
                    }, function (error) {
                        reject(error);
                    });
                }
                else{
                    resolve(movie)
                }
            })
        })
         
    }

    let getMovieCredits=function(id){
        return new Promise((resolve, reject) => {
            iDbService.getMovieCredits(id).then(function(credits){
                if(credits==undefined){
                    movieDbServices.getMovieCredits(id).then(function (data) {
                        const dataToReturn={crew:data.crew.map(c => new Crew(c)),cast:data.cast.map(c => new PersonOverview(c))} 
                        iDbService.saveMovieCredits({id:parseInt(id),data:dataToReturn})
                        dynamicCachingService.cacheDynamicImages(dataToReturn.cast.map(T=>T.posterW138Path))
                        resolve(dataToReturn)
                    }, function (error) {
                        reject(error);
                    });
                }
                else{
                    resolve(credits.data)
                }
            })
        })
    }

    let getTVShowCredits=function(id){
        return movieDbServices.getTVShowCredits(id).then(function (data) {
            return {crew:data.crew.map(c => new Crew(c)),cast:data.cast.map(c => new PersonOverview(c))} 
        }, function (error) {
            return error
        });
    }

    let getSingleTVShowDetails = function (id) {
        return movieDbServices.getOneTvShowDetails(id).then(function (data) {
            return new TVShow(data)
        }, function (error) {
            return error
        });
    }

    let getPersonDetails=function(id){
        return movieDbServices.getPersonDetails(id).then(function (data) {
            return new Person(data)
        }, function (error) {
            return error
        });
    }


    let getMultiSearchResult = function (query) {
        return movieDbServices.getMultiSearchResult(query).then(function (data) {
            const personData = data.filter(r => r.media_type === personText)
            personData.forEach(person => {
                // Extracting person known for if movie from title and if tv series originalName
                const knownForArray = person.known_for.map(item => item.original_name || item.title);
                person.overview = person.known_for_department + " • " + knownForArray.toString()
            })

            const dataToReturn={
                movies:data.filter(r => r.media_type === movieText).map(m => new MovieTvOverview(m)),
                tvShows:data.filter(r => r.media_type === tvText).map(t =>  new MovieTvOverview(t)),
                people:personData.map(p => new PersonOverview(p))
            }
            return dataToReturn;
        }, function (error) {
            return error
        });
    };

    
    let getDateMonthString = function (date) {
        date = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    };

    let getPersonCombineCredits=function(id){
        return movieDbServices.getPersonCombineCredits(id).then(function (data) {
            const dataToReturn=[];
            if(data.cast.length>0)dataToReturn.push({department:"Acting",dataLines:data.cast.map(c => new PersonCastCredit(c))});

            const uniqueDepartments=Array.from(new Set(data.crew.map(c=>c.department)))            
            uniqueDepartments.forEach(dep=>{
                dataToReturn.push({department:dep,dataLines:data.crew.filter(c=>c.department===dep).map(i=>new PersonCrewCredit(i))});
            })

            return dataToReturn
        }, function (error) {
            return error
        });
    };

    let getMovieKeywords=function(id){
        return movieDbServices.getMovieKeywords(id).then(function (data) {
            return data.keywords
        }, function (error) {
            return error
        });
    }
    let getTvShowKeywords=function(id){
        return movieDbServices.getTvShowKeywords(id).then(function (data) {
        
            return data.results
        }, function (error) {
            return error
        });
    }

    let getKeywordDetails=function(id,pageNumber){
        return movieDbServices.getKeywordDetails(id,pageNumber).then(function (data) {
        
            return new KeyWord(data)
        }, function (error) {
            return error
        });
    }
    return {
        getPopularMovies,
        getPopularTvShows,
        getMultiSearchResult,
        getDateMonthString,
        getSingleMovieDetails,
        getMovieCredits,
        getTVShowCredits,
        getPersonDetails,
        getSingleTVShowDetails,
        getTrendingMoviesToday,
        getTrendingMoviesThisWeek,
        getPersonCombineCredits,
        getMovieKeywords,
        getTvShowKeywords,
        getKeywordDetails
    };
});
