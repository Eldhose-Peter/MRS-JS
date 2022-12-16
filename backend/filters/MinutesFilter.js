import { MovieDB } from "../database/MovieDB";
import { Filters } from "./Filters";

export class MinuteFilter extends Filters {
    myMinutes;

    constructor(minutes){
        super();
        this.myMinutes = minutes
    }

    satisfies(id){

        let minute = MovieDB.getMinutes(id);
        return this.myMinutes.includes(minute);
        
    }
}