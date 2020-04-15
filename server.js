const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db =  require("./models")
const app = express();

//app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });

// app.post("/submit", (req, res) => {
//   console.log(req.body);

//   db.notes.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});


app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });

  app.put("/api/workouts/:id", (req, res) => {
    console.log("req.params", req.params)
    console.log("body", req.body)

    // update the db
    db.Workout.findByIdAndUpdate(req.params.id,{$push:{exercises: req.body}})
    .then(data=>{res.json(data)})
  });

app.post("/api/workouts", (req, res) => {
db.Workout.create({}).then(data=>{res.json(data)})
 });



app.listen(3000, () => {
  console.log("App running on port 3000!");
});
