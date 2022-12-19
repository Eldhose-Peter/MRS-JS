import { resolve } from "path";
import { MovieDB } from "../database/MovieDB.js";
import { RaterDB } from "../database/RaterDB.js";
import { Rating } from "../pdo/Rating.js";

export class RatingsRunner {

    myRaters;

    getRaters() {
        return this.myRaters;
    }

    async loadRaters() {

        return RaterDB.initialize().then((res) => {
            console.log("Rater initialize status: ", res);
            this.myRaters = RaterDB.getRaters();
        });
    }


    //gets the average rating for a movieId
    getAverageByID(movieId, minimalRaters) {
        let numRates = [];

        this.myRaters = RaterDB.getRaters();
        while (true) {
            let item = this.myRaters.next();
            let rater = item.value
            if (item.done)
                break

            if (rater.hasRating(movieId)) {
                numRates.push(rater.getRating(movieId))
            }
        }

        let sum = 0
        //only take the average if there is atleast minimum number of Raters
        if (numRates.length >= minimalRaters) {
            numRates.forEach((rate) => {
                sum += parseInt(rate)
            })
            return sum / numRates.length
        }
        return 0
    }


    getAverageRatings(minimalRaters, filterCriteria) {

        let movieIDList = [];
        let rList = []
        let rating;
        movieIDList = MovieDB.filterBy(filterCriteria);
        let avgRating;
        movieIDList.forEach((id) => {
            avgRating = this.getAverageByID(id, minimalRaters);

            if (avgRating > 0.0) {
                rating = new Rating(id, avgRating);
                rList.push(rating);
            }
        })

        return rList;
    }


    //similarity between 2 users is calculated as the dotproduct 

    dotProduct(curRater, otherRater) {
        let curUserRating = curRater.getItemsRated()

        let curRating;
        let otherRating;
        let dotProduct = 0;

        while (true) {
            let item = curUserRating.next();
            let movieID = item.value
            if (item.done)
                break

            curRating = parseInt(curRater.getRating(movieID))
            if (otherRater.hasRating(movieID)) {
                otherRating = parseInt(otherRater.getRating(movieID));
                //translate a rating from the scale 0 to 10 to the scale ­-5 to 5
                curRating -= 5;
                otherRating -= 5;

                dotProduct += (curRating * otherRating);
            }
        }
        return dotProduct;
    }

    getSimilarities(raterId) {
        let ourRatings = []
        let curRater = RaterDB.getRater(raterId)
        var rating;

        this.myRaters = RaterDB.getRaters();
        while (true) {
            let item = this.myRaters.next();
            let rater = item.value
            if (item.done)
                break

            if (rater.getID() != (raterId)) {
                rating = new Rating(rater.getID(), this.dotProduct(curRater, rater));
                ourRatings.push(rating);
            }
        }


        //Note that in each Rating object the item field is a rater’s ID, and the value
        //field is the dot product comparison between that rater and the rater whose ID is
        //the parameter to ​getSimilarities 
        //Collections.sort(ourRatings,Collections.reverseOrder());
        ourRatings.sort(Rating.compareTo)
        return ourRatings;
    }

    //gets recommended movies from raters with similar ratings
    getSimilarRatings(curRaterId, numSimilarRaters, minimalRaters, filterCriteria) {
        //raters ID and their closesness to curRater
        let weightRatings = this.getSimilarities(curRaterId);
        //console.log(weightRatings);


        let movieIDList = MovieDB.filterBy(filterCriteria)
        //console.log(movieIDList.length);

        //movie ID and their weighted average ratings
        let rList = [];
        let rating;
        let rater;


        movieIDList.forEach(movieId => {
            let listRatings = []
            //System.out.println(movieId);
            let i = 0;
            for (i = 0; i < numSimilarRaters; i++) {
                rating = weightRatings[0];
                let raterId = rating.getItem();
                let raterClossness = parseInt(rating.getValue());

                if (raterClossness <= 0)
                    break;

                rater = RaterDB.getRater(raterId);

                if (rater.hasRating(movieId)) {
                    listRatings.push(raterClossness * parseInt(rater.getRating(movieId)));
                }

            }
            let sum = 0.0;

            if (listRatings.length >= minimalRaters) {

                listRatings.forEach((rating) => {
                    sum += parseInt(rating);
                })

                rating = new Rating(movieId, sum / listRatings.length);
                rList.push(rating);
            }
        })



        rList.sort(Rating.compareTo);
        return rList;

    }

}
