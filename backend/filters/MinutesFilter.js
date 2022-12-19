import { MovieDB } from "../database/MovieDB.js";
import { Filters } from "./Filters.js";

export class MinutesFilter extends Filters {
    min;
    max

    constructor(min,max){
        super();
        this.min = min
        this.max =max
    }

    satisfies(id){

        let minute = MovieDB.getMinutes(id);
        return (this.min <= minute)&(this.max >=minute);
        
    }
}