import { Router } from "express";
import { MovieRunner } from "../service/MovieRunner.js";
const ratingsApi = Router();

// Home page route.
ratingsApi.get("/", function (req, res) {
    res.send("This is ratings API endpoint");
});

// About page route.
ratingsApi.get("/averageRatings", function (req, res) {

    try {
        let runner = new MovieRunner();
        runner.printAverageRatings().then((val)=>{
            //console.log("result:", val)
            res.status(200).json(val)
        })

    } catch (error) {
        res.sendStatus(500);
    }
});

ratingsApi.get("/similarRatings", function (req, res) {

    try {
        let runner = new MovieRunner();
        let result = runner.printSimilarRatings();
        res.json(result);
    } catch (error) {
        res.send(500);
    }

});

export default ratingsApi;