const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const config = require('./config.js')[process.env.NODE_ENV || "dev"]
const PORT = 8005;

const client = new Client({
  connectionString: config.connectionString
});

client.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
});

app.get('/api/workouts', (req, res) => {
  client.query("SELECT * FROM workouts")
    .then(result => {
      res.status(200).send(result.rows)
    })
})

app.patch('/api/workouts/update/:name', (req, res) => {
  let workoutName = req.params.name;
  let weight = req.body.best_weight
  let reps = req.body.rep_number
  client.query("UPDATE workouts SET best_weight = $1, rep_number = $2 WHERE workout_name = $3", [weight, reps, workoutName])
    .then(result => {
      res.status(201).send("Workout updated.")
    })
})

app.delete('/api/workouts/delete/:name', (req, res) => {
  let workoutName = req.params.name;
  client.query("DELETE FROM workouts WHERE workout_name = $1", [workoutName])
    .then(result => {
      res.status(200).send("Workout deleted.")
    })
})

app.post('/api/workouts/add', (req, res) => {
  let workoutBody = req.body;
  client.query("INSERT INTO workouts (workout_name, best_weight, rep_number) VALUES ($1, $2, $3)", [workoutBody.workout_name, workoutBody.best_weight, workoutBody.rep_number])
    .then(result => {
      res.status(201).send('Workout added.')
    })
})