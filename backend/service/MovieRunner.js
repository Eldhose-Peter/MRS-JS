import { MovieDB } from "../database/MovieDB.js";
import { RaterDB } from "../database/RaterDB.js";
import { RatingsRunner } from "./RatingsRunner.js";
import { Rating } from "../pdo/Rating.js";
import { DirectorFilter } from "../filters/DirectorFilter.js";
import { TrueFilter } from "../filters/TrueFilter.js"

export class MovieRunner {

    ratingsRunner;

    async initializeDB() {
        await new Promise(async (resolve, reject) => {
            this.ratingsRunner = new RatingsRunner();
            await this.ratingsRunner.loadRaters().then((res) => {
                console.log("Number of raters read: ", RaterDB.size());
            })

            await MovieDB.initialize().then((res) => {
                console.log("Movie initialize status: ", res);
                console.log("Number of movies read: ", MovieDB.size());
            })
            resolve('done')
        }).then((res) => {
            console.log("initialize DB status : ", res);
        })

    }

    async printAverageRatings() {

        let ratings = []
        let minimumRaters = 1;
        ratings = this.ratingsRunner.getAverageRatings(minimumRaters,new TrueFilter());
        console.log("Number of movies found: " + ratings.length);
        ratings.sort(Rating.compareTo)
        return ratings;

    }

    async printSimilarRatings() {

        let id = "5"; //this will be the id of the current user
        let numSimilarRaters = 20;
        let minimalRaters = 5;
        let ratings = []
        ratings = this.ratingsRunner.getSimilarRatings(id, numSimilarRaters, minimalRaters,new TrueFilter());
        console.log("Number of movies found:" + ratings.length);
        return ratings;

    }

    async printAverageRatingsByDirector(){
        let ratings = []
        let minimumRaters = 1;
        let directors = "Michael Mann,Oliver Stone,Spike Jonze"
        ratings = this.ratingsRunner.getAverageRatingsByFilter(minimumRaters,new DirectorFilter(directors) );
        console.log("Number of movies found: " + ratings.length);
        ratings.sort(Rating.compareTo)
        return ratings;
    }

    //TODO : implement filters

    //  printSimilarRatingsByGenre() {
    //     RatingsRunner  ratingsRunner = new RatingsRunner("ratings.csv");
    //     console.log("Number of raters read: " + RaterDB.size());

    //     MovieDB.initialize("ratedmoviesfull.csv");
    //     console.log("Number of movies read: " + MovieDB.size());

    //     let ratings = [];
    //     let id = "65";
    //     let numSimilarRaters = 20;
    //     let minimumraters = 5;
    //     let genre = "Action";
    //     ratings =  ratingsRunner.getSimilarRatingsByFilter(id, numSimilarRaters, minimumraters, new GenreFilter(genre));
    //     console.log("Number of movies found: " + ratings.size());
    //     //Collections.sort(ratings);

    //     let title;
    //     let genre1;

    //     for (Rating r : ratings)
    //     {
    //         title = MovieDB.getTitle(r.getItem());
    //         genre1 = MovieDB.getGenres(r.getItem());
    //         console.log(r.getValue() + "  " + genre1 + " " + title);
    //     }
    // }

    //  printSimilarRatingsByDirector() {
    //     RatingsRunner  ratingsRunner = new RatingsRunner("ratings.csv");
    //     console.log("Number of raters read: " + RaterDB.size());

    //     MovieDB.initialize("ratedmoviesfull.csv");
    //     console.log("Number of movies read: " + MovieDB.size());

    //     let ratings = [];
    //     let id = "1034";
    //     let numSimilarRaters = 10;
    //     let minimumraters = 3;
    //     let directors = "Clint Eastwood,Sydney Pollack,David Cronenberg,Oliver Stone";
    //     ratings =  ratingsRunner.getSimilarRatingsByFilter(id, numSimilarRaters, minimumraters, new DirectorFilter(directors));
    //     console.log("Number of movies found: " + ratings.size());
    //     //Collections.sort(ratings);

    //     let title;
    //     let minutes;
    //     let director;

    //     for (Rating r : ratings)
    //     {
    //         title = MovieDB.getTitle(r.getItem());
    //         minutes = MovieDB.getMinutes(r.getItem());
    //         director = MovieDB.getDirector(r.getItem());
    //         console.log(r.getValue() + " , Time : " + minutes + " , " + title + " director :" + director);
    //     }
    // }

    //  printSimilarRatingsByGenreAndMinutes() {
    //     RatingsRunner  ratingsRunner = new RatingsRunner("ratings.csv");
    //     console.log("Number of raters read: " + RaterDB.size());

    //     MovieDB.initialize("ratedmoviesfull.csv");
    //     console.log("Number of movies read: " + MovieDB.size());


    //     let ratings = [];
    //     let minimumraters = 5;

    //     let genre = "Adventure";
    //     let min = 100;
    //     let max = 200;

    //     let id = "65";
    //     let numSimilarRaters = 10;

    //     AllFilters allFilters = new AllFilters();
    //     allFilters.addFilter(new GenreFilter(genre));
    //     allFilters.addFilter(new MinutesFilter(min, max));

    //     ratings =  ratingsRunner.getSimilarRatingsByFilter(id, numSimilarRaters, minimumraters, allFilters);
    //     console.log("Number of movies found: " + ratings.size());
    //     //Collections.sort(ratings);

    //     let title;
    //     let minutes;
    //     let director;
    //     let Year;
    //     let Genre;

    //     for (Rating r : ratings)
    //     {
    //         title = MovieDB.getTitle(r.getItem());
    //         minutes = MovieDB.getMinutes(r.getItem());
    //         director = MovieDB.getDirector(r.getItem());
    //         Year = MovieDB.getYear(r.getItem());
    //         Genre = MovieDB.getGenres(r.getItem());
    //         console.log(r.getValue() + " ,Time : " + minutes + ", " + title + " ,Year : " + Year + ", " + Genre + " ,director :" + director);
    //     }

    // }

    //  printAverageRatingsByYearAfterAndMinutes() {
    //     RatingsRunner  ratingsRunner = new RatingsRunner("ratings.csv");
    //     console.log("Number of raters read: " + RaterDB.size());

    //     MovieDB.initialize("ratedmoviesfull.csv");
    //     console.log("Number of movies read: " + MovieDB.size());


    //     let ratings = [];
    //     let id = "65";
    //     let minimumraters = 5;
    //     let numSimilarRaters = 10;
    //     let min = 80;
    //     let max = 100;
    //     let year = 2000;

    //     AllFilters allFilters = new AllFilters();
    //     allFilters.addFilter(new YearAfterFilter(year));
    //     allFilters.addFilter(new MinutesFilter(min, max));

    //     ratings =  ratingsRunner.getSimilarRatingsByFilter(id, numSimilarRaters, minimumraters, allFilters);
    //     console.log("Number of movies found: " + ratings.size());
    //     //Collections.sort(ratings);

    //     let title;
    //     let minutes;

    //     let Year;


    //     for (Rating r : ratings)
    //     {
    //         title = MovieDB.getTitle(r.getItem());
    //         minutes = MovieDB.getMinutes(r.getItem());
    //         //director = MovieDB.getDirector(r.getItem());
    //         Year = MovieDB.getYear(r.getItem());
    //         //Genre = MovieDB.getGenres(r.getItem());
    //         console.log(r.getValue() + " ,Time : " + minutes + ", " + title + " ,Year : " + Year + ", ");
    //     }

    // }

    // printAverageRatingsByYearAfterAndGenre() {
    //     let ratingsRunner = new RatingsRunner("ratings_short.csv");
    //     console.log("Number of raters read: " + RaterDB.size());

    //     MovieDB.initialize("ratedmovies_short.csv");
    //     console.log("Number of movies read: " + MovieDB.size());


    //     let ratings = [];
    //     let minimumraters = 1;
    //     let genre = "Romance";
    //     let year = 1980;

    //     AllFilters allFilters = new AllFilters();
    //     allFilters.addFilter(new YearAfterFilter(year));
    //     allFilters.addFilter(new GenreFilter(genre));

    //     ratings =  ratingsRunner.getAverageRatingsByFilter(minimumraters, allFilters);
    //     console.log("Number of movies found: " + ratings.size());
    //     Collections.sort(ratings);

    //     let title;
    //     let minutes;
    //     let director;
    //     let Year;
    //     let Genre;

    //     for (Rating r : ratings)
    //     {
    //         title = MovieDB.getTitle(r.getItem());
    //         minutes = MovieDB.getMinutes(r.getItem());
    //         director = MovieDB.getDirector(r.getItem());
    //         Year = MovieDB.getYear(r.getItem());
    //         Genre = MovieDB.getGenres(r.getItem());
    //         console.log(r.getValue() + " ,Time : " + minutes + ", " + title + " ,Year : " + Year + ", " + Genre + " ,director :" + director);
    //     }


    // }

}