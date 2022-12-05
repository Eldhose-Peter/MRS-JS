import { createReadStream } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { parse } from "csv-parse";
import { Movie } from '../pdo/Movie.js';

export class MovieDB {
    ourMovies; //maps movieId to movie

    // static initialize(moviefile) {
    //     if (!this.ourMovies) {
    //         this.ourMovies = new Map();
    //         this.loadMovies(moviefile);
    //     }
    // }

    static initialize() {
        if (!this.ourMovies) {
            this.ourMovies = new Map();
            return this.loadMovies("ratedmovies_short.csv")
        }            
    }


    static loadMovies(filename) {
        try {
            let filePath = join(homedir(), 'Documents/MRS/backend/database/CSVdata', filename)
            return new Promise((resolve,reject)=>{

                createReadStream(filePath)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", (row) => {
                    let movie = new Movie(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])
                    this.ourMovies.set(movie.getID(), movie)

                })
                .on("end", function () {
                    console.log("finished reading from movie CSV ");
                    resolve('success')
                })
                .on("error", function (error) {
                    console.log(error.message);
                    reject('error')
                });

            })
            
        }
        catch (error) {
            console.log("Error in loading movies : ", error);
        }
    }

    static containsID(id) {
        this.initialize();
        return this.ourMovies.has(id);
    }

    static getYear(id) {
        this.initialize();
        return this.ourMovies.get(id).getYear();
    }

    static getGenres(id) {
        this.initialize();
        return this.ourMovies.get(id).getGenres();
    }

    static getTitle(id) {
        this.initialize();
        return this.ourMovies.get(id).getTitle();
    }

    static getMovie(id) {
        this.initialize();
        return this.ourMovies.get(id);
    }

    static getPoster(id) {
        this.initialize();
        return this.ourMovies.get(id).getPoster();
    }

    static getMinutes(id) {
        this.initialize();
        return this.ourMovies.get(id).getMinutes();
    }

    static getCountry(id) {
        this.initialize();
        return this.ourMovies.get(id).getCountry();
    }

    static getDirector(id) {
        this.initialize();
        return this.ourMovies.get(id).getDirector();
    }

    static size() {
        return this.ourMovies.size;
    }

    //TODO : implement Filters
    // filterBy(Filter f) {
    //    this.initialize();
    //     let list
    //     this.ourMovies.keys().forEach(id => {
    //         if (f.satisfies(id)) {
    //             list.push(id);
    //         }
    //     });
    //     return list;
    // }

    // TODO : remove this function after implementing Filters
    static getMovieIdList() {
        this.initialize();
        return this.ourMovies.keys()
    }

}
