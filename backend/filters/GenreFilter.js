import { MovieDB } from "../database/MovieDB";
import { Filters } from "./Filters";

export class GenreFilter extends Filters {
    myGenres;

    constructor(genres){
        super();
        this.myGenres = genres
    }

    satisfies(id){

        let genre = MovieDB.getGenres(id);
        return this.myGenres.includes(genre);
        
    }
}