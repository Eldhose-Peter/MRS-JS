import { MovieDB } from "../database/MovieDB.js";
import { Filters } from "./Filters.js";

export class DirectorFilter extends Filters{
    myDirectors;

    constructor(directors){
        super();
        this.myDirectors = directors
    }

    satisfies(id){

        let director = MovieDB.getDirector(id);
        return this.myDirectors.includes(director);
        
    }
}