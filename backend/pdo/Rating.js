
class Rating {
    item;
    value;

    constructor(item,value){
        this.item = item;
        this.value = value;
    }

    getItem(){
        return this.item
    }

    getValue(){
        return this.value
    }

    toString(){
        return "["+this.getItem+","+this.getValue+"]";
    }

    compareTo(aRating,bRating){
        if(aRating.value<bRating.value) 
            return -1;
        if(aRating.value>bRating.value)
            return 1;
        return 0;
    }
}

module.exports = Rating