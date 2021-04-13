const POSTERW300URL='https://image.tmdb.org/t/p/w300'
const POSTERW32URL='https://image.tmdb.org/t/p/w92'
const POSTERW780URL='https://image.tmdb.org/t/p/w780'
const POSTERW500URL='https://image.tmdb.org/t/p/w500'
const POSTERW138FACEURL='https://www.themoviedb.org/t/p/w138_and_h175_face'
class MovieTvOverview {
    constructor(data) {
        this.id = data.id;
        this.title = data.original_name||data.title;
        this.realeseDate = data.first_air_date||data.release_date;
        this.posterW300Path =POSTERW300URL+ data.poster_path;
        this.posterW32Path =POSTERW32URL+ data.poster_path;
        this.overview=data.overview;
    }
}
class Movie {
    constructor(data) {
        this.id = data.id;
        this.title = data.title||data.original_name;
        this.tagline = data.tagline;
        this.realeseDate = data.first_air_date||data.release_date;
        this.posterPath = POSTERW500URL+data.poster_path;
        this.realeseDateShortFormat=new Date(this.realeseDate ).toLocaleDateString();
        this.runTimeString=(parseInt(data.runtime / 60) + "h " + data.runtime % 60 + "m");
        this.overview=data.overview;

        const genreArray = data.genres.map(genre => genre.name);
        this.genreString = genreArray.toString();
        this.backdropPath=POSTERW780URL+data.backdrop_path;
        this.status=data.status;
        this.originalLanguage=languageData.find(x => x.iso_639_1 === data.original_language).english_name;
        this.budget=data.budget;
        this.revenue=data.revenue
    }
}

class TVShow {
    constructor(data) {

        this.id = data.id;
        this.title = data.title||data.original_name;
        this.tagline = data.tagline;
        this.realeseDate = data.first_air_date||data.release_date;
        this.posterPath = POSTERW500URL+data.poster_path;
        this.realeseDateShortFormat=new Date(this.realeseDate ).toLocaleDateString();
        this.runTimeString=data.episode_run_time[0]+'m';
        this.overview=data.overview;

        const genreArray = data.genres.map(genre => genre.name);
        this.genreString = genreArray.toString();

        this.backdropPath=POSTERW780URL+data.backdrop_path;
        this.createdBy=data.created_by.map(person=>new Crew(person))
        this.status=data.status
        this.networkLogo=data.networks[0].logo_path
        this.type=data.type
        this.originalLanguage=languageData.find(x => x.iso_639_1 === data.original_language).english_name
        this.seasons= data.seasons.map(season=>new Season(season)) 
    }
}

class Crew{
    constructor(data) {
        this.name = data.name;
        this.knownForDepartment = data.known_for_department||"Creator";
        this.department=data.department||"Creator";
    }
}


class PersonOverview{
    constructor(data) {
        this.id = data.id;
        this.character = data.character;
        this.name = data.name;
        this.title=this.name;
        // this.posterW138Path =POSTERW138FACEURL+ data.profile_path;
        this.posterW138Path =data.profile_path?POSTERW138FACEURL+ data.profile_path:"";
        this.posterW32Path =POSTERW32URL+ data.profile_path;
        this.overview=data.overview||"";
    }
}

class Person {
    constructor(data) {
        this.id = data.id;
        this.name =  data.name;
        this.biography=data.biography;
        this.knownForDepartment =  data.known_for_department;
        this.department=data.department;
        this.posterPath = data.profile_path;
        this.alsoKnownAs=data.also_known_as;
        this.placeOfBirth=data.place_of_birth;
        this.birthday=data.birthday;
    }
}

class PersonCastCredit{

    constructor(data){
        this.id = data.id;
        this.title = data.original_name||data.title;
        this.realeseDate = data.first_air_date||data.release_date;
        this.year=this.realeseDate? new Date(this.realeseDate).getFullYear():"  —  ";
        this.posterW300Path =POSTERW300URL+ data.poster_path;
        this.popularity=data.vote_count;
        this.mediaType=data.media_type
        this.creditString=data.media_type=='tv'? "("+data.episode_count+" episode)" :""
        if(data.character&&data.character!=="") this.creditString+=(" as " +data.character);
    }
}

class PersonCrewCredit{

    constructor(data){
        this.id = data.id;
        this.title = data.original_name||data.title;
        this.realeseDate = data.first_air_date||data.release_date;
        this.year=this.realeseDate? new Date(this.realeseDate).getFullYear():"  —  ";
        this.posterPath = data.poster_path;
        this.popularity=data.vote_count;
        this.mediaType=data.media_type
        this.job=data.job;
        this.creditString=" ... "+data.job;
    }
}

class Season{
    constructor(data){
        this.id=data.id;
        this.seasonNo=data.season_number
        this.episodesCount=data.episode_count;
        this.overview=data.overview
        this.posterPath=data.poster_path;
        this.realeseDate=data.air_date;
        this.year=new Date(data.air_date).getFullYear()
    }
}

class KeyWord{
    constructor(data){
        this.id=data.id
        this.page=data.page;
        this.totalPages=data.total_pages;
        this.totalResults=data.total_results;
        this.results= data.results.map(result => new MovieTvOverview(result)) 

    }
}