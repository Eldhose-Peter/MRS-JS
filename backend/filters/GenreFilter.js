import { MovieDB } from "../database/MovieDB.js";
import { Filters } from "./Filters.js";

export class GenreFilter extends Filters {
    myGenres;

    constructor(genres){
        super();
        this.myGenres = genres
    }

    satisfies(id){

        let genre = MovieDB.getGenres(id);
        return genre.includes(this.myGenres);
        
    }
}