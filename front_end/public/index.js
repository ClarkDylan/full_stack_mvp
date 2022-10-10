let container = document.getElementById('container');
let bestWeightBtn = document.getElementById('bests');
let updateBtn = document.getElementById('update');
let deleteBtn = document.getElementById('delete');

// shows all current workouts and personal bests
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

// populates input boxes and submit button
function populateUpdate() {
  container.innerHTML = '';
  let workoutInput = document.createElement('input');
  let weightInput = document.createElement('input');
  let repInput = document.createElement('input');
  let submitButton = document.createElement('button')
  container.append(workoutInput, weightInput, repInput, submitButton);

  workoutInput.placeholder = 'Workout Name:';
  workoutInput.id = 'workoutInput';

  weightInput.placeholder = 'New best weight:';
  weightInput.id = 'weightInput';

  repInput.placeholder = 'Number of reps:';
  repInput.id = 'repInput';

  submitButton.innerText = 'Submit';

  let updatedData = {
    best_weight: null,
    rep_number: null
  }

  // updates data for workout
  function makeChanges() {
    fetch(`http://localhost:8005/api/workouts/update/${workoutInput.value}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })
  }
  submitButton.addEventListener('click', () => {
    updatedData.best_weight = parseInt(weightInput.value);
    updatedData.rep_number = parseInt(repInput.value);
    makeChanges();
    alert('Workout Updated!')
  });
}

// populates input box and delete button
function populateDelete() {
  container.innerHTML = '';
  let workoutInput = document.createElement('input');
  let deleteButton = document.createElement('button')
  container.append(workoutInput, deleteButton)

  deleteButton.innerText = "Delete";
  workoutInput.placeholder = "Workout Name:"

  function deleteWorkout() {
    fetch(`http://localhost:8005/api/workouts/delete/${workoutInput.value}`, {
      method: "DELETE"
    })
  }
  deleteButton.addEventListener('click', () => {
    deleteWorkout();
    alert("Workout Deleted.")
  })
}

// event listeners for buttons
bestWeightBtn.addEventListener('click', displayWorkouts);
updateBtn.addEventListener('click', populateUpdate);
deleteBtn.addEventListener('click', populateDelete);

