const Rating = require("./Rating");

class Rater {

    myID;
    myRatings;

    Rater(id){
        this.myID =id
        this.myRatings = new Map();
    }

    addRating(item,rating){
        this.myRatings.set(item,new Rating(item,rating));
    }

    hasRating(item){
        if(item in this.myRatings.keys())
            return true;
        return false;
    }

    getID(){
        return this.myID
    }

    getRating(item){
        if(item in this.myRatings.keys())
            return this.myRatings.get(item).getValue();
        return -1;
    }

    numRatings(){
        return this.myRatings.length;
    }

    getItemsRated(){
        var list = [];
        let k=0;
        for(k=0;k<this.myRatings.size;k++){
            list = this.myRatings.keys()
        }
        return list
    }
}

module.exports = Rater