let container = document.getElementById('container');
let bestWeight = document.getElementById('bests');


function displayWorkouts() {
  container.innerHTML = '';
  fetch('http://localhost:8005/api/workouts')
    .then(data => data.json())
    .then(workouts => {
      workouts.forEach(workout => {
        let nextWorkout = document.createElement('div');
        nextWorkout.innerText = `${workout.workout_name} \n Personal Best Weight: ${workout.best_weight} \n Number of Reps: ${workout.rep_number}`
        container.append(nextWorkout);
      })
    })
}

bests.addEventListener('click', displayWorkouts);