import { createReadStream } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { parse } from "csv-parse";
import { Rater }from "../pdo/Rater.js";

export class RaterDB {
    ourRaters;

    static initialize() {
        if (!this.ourRaters) {
            this.ourRaters = new Map();
            this.addRatings('ratings_short.csv')
        }
    }

    // static initialize(filename) {
    //     if (!this.ourRaters) {
    //         this.ourRaters = new Map();
    //         this.addRatings(filename)
    //     }
    // }

    static addRatings(filename) {

        var filePath = join(homedir(), 'Documents/MRS/backend/database/CSVdata', filename)
        createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row) => {
                this.addRaterRating(row[0], row[1], row[2])

            })
            .on("end", function () {
                console.log("finished reading from ratings CSV ");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    }

    static addRaterRating(raterID, movieID, rating) {

        var rater;

        if (this.ourRaters.has(raterID)) {
            rater = this.ourRaters.get(raterID);
        }
        else {
            rater = new Rater(raterID)
            this.ourRaters.set(raterID, rater)
        }
        rater.addRating(movieID, rating)

    }

    static getRater(id) {
        this.initialize();
        return this.ourRaters.get(id)
    }

    static getRaters() {
        this.initialize();
        var list = this.ourRaters.values();
        return list;

    }

    static size() {
        this.ourRaters.size;
    }

}

