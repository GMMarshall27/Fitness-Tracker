const router = require("express").Router();
const WORKOUT = require("../models/index.js");
const path = require("path");

router.get("/api/workouts/", (req,res)=>
WORKOUT.Workout.aggregate([
    {
        $addFields: {
            totalDuration: { $sum:"$exercises.duration"},
            totalDistance: { $sum: "$exercises.distance"},
            totalSets: { $sum:"$exercises.sets"},
            totalReps: { $sum:"$exercises.reps"},
            totalWeight: { $sum:"$exercises.weight"},
        },
    },
])
.then((workout)=> res.json(workout))
.catch((err) => res.status(400).json(err))
);