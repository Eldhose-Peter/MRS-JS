var fs = require('fs')
var path = require('path')
var os = require('os')
const { parse } = require("csv-parse");
const Movie = require('../pdo/Movie');

class MovieDB {
    ourMovies; //maps movieId to movie

    initialize(moviefile) {
        if (!this.ourMovies) {
            this.ourMovies = new Map();
            this.loadMovies(moviefile);
        }
    }

    initialize() {
        if (!this.ourMovies) {
            this.ourMovies = new Map();
            this.loadMovies("ratedmoviesfull.csv");
        }
    }	

	
    loadMovies(filename) {

        var filePath = path.join(os.homedir(), 'Documents/MRS/backend/database/CSVdata', filename)
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row)=> {
                //console.log(row);
                let movie = new Movie(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7])
                this.ourMovies.set(movie.getID(),movie)

            })
            .on("end", function () {
                console.log("finished reading from CSV ");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    }

    containsID(id) {
        this.initialize();
        return this.ourMovies.has(id);
    }

    getYear(id) {
        this.initialize();
        return this.ourMovies.get(id).getYear();
    }

    getGenres(id) {
        this.initialize();
        return this.ourMovies.get(id).getGenres();
    }

    getTitle(id) {
        this.initialize();
        return this.ourMovies.get(id).getTitle();
    }

    getMovie(id) {
       this.initialize();
        return this.ourMovies.get(id);
    }

    getPoster(id) {
       this.initialize();
        return this.ourMovies.get(id).getPoster();
    }

    getMinutes(id) {
       this.initialize();
        return this.ourMovies.get(id).getMinutes();
    }

    getCountry(id) {
       this.initialize();
        return this.ourMovies.get(id).getCountry();
    }

    getDirector(id) {
       this.initialize();
        return this.ourMovies.get(id).getDirector();
    }

    size() {
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

}

module.exports =MovieDB