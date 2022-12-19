import { MovieDB } from "../database/MovieDB.js";
import { RaterDB } from "../database/RaterDB.js";
import { RatingsRunner } from "./RatingsRunner.js";
import { Rating } from "../pdo/Rating.js";
import { DirectorFilter } from "../filters/DirectorFilter.js";
import { TrueFilter } from "../filters/TrueFilter.js"
import { AllFilters } from "../filters/AllFilters.js";
import { GenreFilter } from "../filters/GenreFilter.js";
import { MinutesFilter } from "../filters/MinutesFilter.js";
import { YearAfterFilter } from "../filters/YearAfterFilter.js";

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

    async printAverageRatings(minimumRaters,filters) {

        let ratings = []
        let filterCriteria = await this.getFilterCriteria(filters);
        ratings = this.ratingsRunner.getAverageRatings(minimumRaters,filterCriteria);
        console.log("Number of movies found: " + ratings.length);
        ratings.sort(Rating.compareTo)
        return ratings;

    }

    async printSimilarRatings(currUserId,numSimilarRaters,minimalRaters,filters) {
        let ratings = []
        let filterCriteria = await this.getFilterCriteria(filters);
        ratings = this.ratingsRunner.getSimilarRatings(currUserId, numSimilarRaters, minimalRaters,filterCriteria);
        console.log("Number of movies found:" + ratings.length);
        return ratings;

    }


    async getFilterCriteria(query){
        let allFilters = new AllFilters();

        if(query){
            if(query.director){
                allFilters.addFilter(new DirectorFilter(query.director));
            }
            if(query.genre){
                allFilters.addFilter(new GenreFilter(query.genre));
            }
            if(query.minutes){
                allFilters.addFilter(new MinutesFilter(query.minutes));
            }
            if(query.year){
                allFilters.addFilter(new YearAfterFilter(query.year));
            }
        }
        else{
            allFilters.addFilter(new TrueFilter());
        }
        return allFilters;

        
    }

}