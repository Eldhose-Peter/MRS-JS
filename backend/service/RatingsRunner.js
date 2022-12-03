import Rater from "../pdo/Rater";
import Rating, { compareTo } from "../pdo/Rating";

class RatingRunner {

    myRaters;
    constructor(filename){
        RaterDatabase.initialize(filename);
        this.myRaters =RaterDatabase.getRaters();
    }

    getAverageByID(movieId,minimalRaters){
        var numRates;

        this.myRaters.forEach(rater => {
            if(rater.hasRating(movieId)){
                numRates.push(rater.getRating(movieId))
            }
        });

        let sum=0.0

        //only take the average if there is atleast minimum number of Raters
        if(numRates.length>=minimalRaters){
            numRates.forEach((rate)=>{
                sum+=rate
            })

            return sum/numRates.length
        }
        return 0.0
    }

    //TODO : implement Filters
    // public ArrayList<Rating> getAverageRatingsByFilter(int minimalRaters , Filter filterCriteria)
    // {
        
    //     ArrayList<String> movieIDList = new ArrayList<>();
    //     ArrayList<Rating> rList = new ArrayList<>();
    //     Rating r;
    //     movieIDList = MovieDatabase.filterBy(filterCriteria);
    //     Double avgRating;
    //     for(String id : movieIDList)
    //     {
    //         avgRating = getAverageByID(id, minimalRaters);

    //         if(avgRating>0.0)
    //         {
    //            r=new Rating(id, avgRating);
    //            rList.add(r);
    //         }
    //     }
    //     return rList;
    // }

    dotProduct(curRater,otherRater){
        let curUserRating = curRater.getItemsRated()

        let curRating;
        let otherRating;
        let dotProduct =0;

        curUserRating.forEach((movieID)=>{
            curRating = curRater.getRating(movieID)
            if(otherRater.hasRating(movieID)){
                otherRating = otherRater.getRating(movieID);
                //translate a rating from the scale 0 to 10 to the scale ­-5 to 5
                curRating-=5;
                otherRating-=5;

                dotProduct+=(curRating*otherRating);
            }
        })
        return dotProduct;
    }

    getSimilarities(raterId)
    {
            let ourRatings = []
            let curRater = RaterDB.getRater(raterID)
            var rating;
            this.myRaters.forEach((rater)=>{

                if(rater.getID()!=(raterId))
                {
                    rating = new Rating(rater.getID(), dotProduct(curRater, rater));
                    ourRatings.add(rating);
                }
            })
            
            
            //Note that in each Rating object the item field is a rater’s ID, and the value
            //field is the dot product comparison between that rater and the rater whose ID is
            //the parameter to ​getSimilarities
            //Collections.sort(ourRatings,Collections.reverseOrder());
            ourRatings.sort(compareTo)
            return ourRatings;
    }

    getSimilarRatings(raterId ,numSimilarRaters , minimalRaters)
    {
            //raters ID and their closesness to curRater
            let weightRatings = getSimilarities(raterId);
            console.log(weightRatings.length);

            // TODO : use True Filter here
            //movieIDList = MovieDatabase.filterBy(new TrueFilter());
            let movieIDList = MovieDB.getMovieIdList()
            console.log(movieIDList.length);

            //movie ID and their weighted average ratings
            let rList = [];
            let rating;  
            let rater;

            movieIDList.forEach((movieID)=>{

           
                let listRatings = []
                //System.out.println(movieId);
                for(let i = 0;i<numSimilarRaters;i++){
                    rating = weightRatings.get(i);
                    let raterId = rating.getItem();
                    let raterClossness = rating.getValue();
                 
                    if(raterClossness<=0)
                        break;

                    rater = RaterDB.getRater(raterId);

                    if(rater.hasRating(movieId))
                    {
                        listRatings.add(raterClossness*rater.getRating(movieId));
                    }
                
                }
                let sum=0.0;

                if(listRatings.length>=minimalRaters){
                
                    listRatings.forEach((rating)=>{
                        sum+=rating;
                    })
                    
                    rating = new Rating(movieId, sum/listRatings.length);
                    rList.add(rating);
                }
            
            })

            rList.sort(compareTo);
            return rList;
            
    }

    //TODO : implement Filters
    // public ArrayList<Rating> getSimilarRatingsByFilter(String id , int numSimilarRaters , int minimalRaters,Filter filterCriteria)
    // {
    //     ArrayList<Rating> weightRatings = getSimilarities(id);
       

    //     ArrayList<String> movieIDList = MovieDatabase.filterBy(filterCriteria);

    //     //movie ID and their weighted average ratings
    //     ArrayList<Rating> rList = new ArrayList<>();
    //     Rating r;  
    //     Rater rater;

    //     for(String movieId: movieIDList)
    //     {
    //         ArrayList<Double> listRatings = new ArrayList<>();
                    
    //         for(int i =0;i<numSimilarRaters;i++)
    //         {
    //             r = weightRatings.get(i);
    //             String raterId = r.getItem();
    //             double raterClossness = r.getValue();

    //             if(raterClossness<=0)
    //             {break;}

    //             rater = RaterDatabase.getRater(raterId);

    //             if(rater.hasRating(movieId))
    //             {
    //                 listRatings.add(raterClossness*rater.getRating(movieId));
    //             }
            
    //         }
    //         Double sum=0.0;

    //          if(listRatings.size()>=minimalRaters)
    //         {
    //             for(Double rating : listRatings)
    //             {
    //                 sum+=rating;
    //             } 
    //             r = new Rating(movieId, sum/listRatings.size());
    //             rList.add(r);
    //         }
        
    //     }
    //     Collections.sort(rList,Collections.reverseOrder());
    //     return rList;

    // }

}
