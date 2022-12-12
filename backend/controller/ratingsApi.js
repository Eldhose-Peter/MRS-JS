import { Router } from "express";
import { MovieRunner } from "../service/MovieRunner.js";
const ratingsApi = Router();

ratingsApi.get("/", function (req, res) {
    res.send("This is ratings API endpoint");
});

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
        runner.printSimilarRatings().then((val)=>{
            //console.log("result:", val)
            res.status(200).json(val)
        })

    } catch (error) {
        res.sendStatus(500);
    }

});

export default ratingsApi;