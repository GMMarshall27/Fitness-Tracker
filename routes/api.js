const router = require("express").Router();
const Workouts = require("../models/index.js");
const path = require("path");

router.get("/api/workouts", (req,res)=> {
Workouts.Workout.aggregate([
    {
        $addFields: {
            totalDuration: { $sum: "$exercises.duration"}
        }
    }
])
.then((workout)=> res.json(workout))
.catch((err) => res.status(400).json(err))
});

router.get("/api/workouts/range",(req, res)=> {
Workouts.Workout.aggregate([
    {
        $addFields: {
            totalDuration: { $sum: "$exercises.duration"},
            totalDistance: { $sum: "$exercises.distance"},
            totalSets: { $sum: "$exercises.sets"},
            totalReps: { $sum: "$exercises.reps"},
            totalWeight: { $sum: "$exercises.weight"},
        },
    },
])
.then((workout)=> res.json(workout))
.catch((err) => res.status(400).json(err))
});

router.get("/api/workouts", (req,res)=> {
    Workouts.Workout.aggregate([
        {
            $addFields:{
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    .then((workout)=>{
        res.json(workout);
    })
    .catch((err)=>{
        res.status(400).json(err);
    });
});
router.post("/api/workouts",({ body },res)=> {
Workouts.Workout.create(body)
.then((workout)=> res.json(workout))
.catch((err) => res.status(400).json(err))
});

router.put("/api/workouts/:id", (req,res)=> {
Workouts.Workout.updateOne(
    { _id: req.params.id },
    { 
        $push: {
            exercises: req.body,
         }
 }
)
.then((workout)=> res.json(workout))
.catch((err) => res.status(400).json(err))
});

router.get("/",(req,res)=>{
res.sendFile(path.join(_dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/exercise.html"))
);

router.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/stats.html"))
);

module.exports = router;