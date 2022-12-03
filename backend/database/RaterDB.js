var fs = require('fs')
var path = require('path')
var os = require('os')
const { parse } = require("csv-parse");
const Rater = require("../pdo/Rater");

class RaterDB {
    static ourRaters;

    initialize() {
        if (!this.ourRaters) {
            this.ourRaters = new Map()
        }
    }

    initialize(filename) {
        if (!this.ourRaters) {
            this.ourRaters = new Map();
            this.addRatings(filename)
        }
    }

    addRatings(filename) {
        this.initialize()

        var filePath = path.join(os.homedir(), 'Documents/MRS/backend/database/CSVdata', filename)
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row) => {
                //console.log(row);
                this.addRaterRating(row[0], row[1], row[2])

            })
            .on("end", function () {
                console.log("finished reading from CSV ");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    }

    addRaterRating(raterID, movieID, rating) {
        this.initialize();

        var rater;

        if (this.ourRaters.has(raterID)) {
            rater = this.ourRaters.get(raterID);
        }
        else {
            rater = new Rater(raterID)
            this.ourRaters.set(raterID,rater)
        }
        rater.addRating(movieID,rating)

    }

    getRater(id){
        this.initialize();
        return this.ourRaters.get(id)
    }

    getRaters(){
        this.initialize();
        var list = this.ourRaters.values();
        return list;

    }

    size(){
        this.ourRaters.size;
    }

}

module.exports = RaterDB