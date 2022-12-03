
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

    compareTo(otherRating){
        if(this.value<otherRating.value) 
            return -1;
        if(this.value>otherRating.value)
            return 1;
        return 0;
    }
}

module.exports = Rating