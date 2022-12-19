import { Router } from "express";
import { MovieRunner } from "../service/MovieRunner.js";
const ratingsApi = Router();


var runner;

ratingsApi.get("/", function (req, res) {
    res.send("This is ratings API endpoint");
});


ratingsApi.get("/averageRatings", async function (req, res) {

    try {
        if(!runner){
            runner = new MovieRunner();
            await runner.initializeDB();
        }
        let filters;
        if(req.query.filterBy){
            filters = req.query.filterBy
        }
        runner.printAverageRatings(req.query.minimalRaters,filters).then((val)=>{
            //console.log("result:", val)
            res.status(200).json(val)
        })

    } catch (error) {
        res.sendStatus(500);
    }
});


ratingsApi.get("/similarRatings", async function (req, res) {

    try {
        if(!runner){
            runner = new MovieRunner();
            await runner.initializeDB();
        }
        let filters;
        if(req.query.filterBy){
            filters = req.query.filterBy
        }
        runner.printSimilarRatings(req.query.id,req.query.numSimilarRaters,req.query.minimalRaters,filters).then((val)=>{
            //console.log("result:", val)
            res.status(200).json(val)
        })

    } catch (error) {
        res.sendStatus(500);
    }

});

export default ratingsApi;