const router = require("express").Router();
const db = require("../models/index.js");
const path = require("path");

router.get("/api/workouts/", (req,res)=>
db.Workout.aggregate([
    {
        $addFields: {
            totalDuration: { $sum:"$exercises.duration"},
        }
    }
])
)