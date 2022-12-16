import { MovieDB } from "../database/MovieDB";
import { Filters } from "./Filters";

export class YearFilter extends Filters {
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