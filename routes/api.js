const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
   db.Workout.find({})
      .then(dbWorkout => {
         for (const workout of dbWorkout) {
            workout.getDuration();
         }
         res.json(dbWorkout);
      })
      .catch(err => {
         res.status(400).json(err);
      });
});

router.post("/api/workouts", (req, res) => {

   db.Workout.create(req.body)
      .then(dbWorkout => {
         res.json(dbWorkout);
      })
      .catch(err => {
         res.json(err);
      });
});

router.put("/api/workouts/:id", (req, res) => {
   db.Workout.updateOne(
      {
         _id: req.params.id
      },
      {
         $push: {
            exercises: req.body
         }
      }
   )
      .then(dbWorkout => {
         res.json(dbWorkout);
      })
      .catch(err => {
         res.json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
   db.Workout.find({})
      .sort(
         {
            day: -1
         }
      )
      .limit(7)
      .then(dbWorkout => {
         dbWorkout.reverse();
         res.json(dbWorkout);
      })
      .catch(err => {
         res.status(400).json(err);
      });
});

module.exports = router;