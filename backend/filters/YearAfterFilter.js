import { MovieDB } from "../database/MovieDB.js";
import { Filters } from "./Filters.js";

export class YearAfterFilter extends Filters {
    myYear;

    constructor(year){
        super();
        this.myYear = year
    }

    satisfies(id){

        let year = MovieDB.getYear(id);
        return this.myYear <= year;
        
    }
}