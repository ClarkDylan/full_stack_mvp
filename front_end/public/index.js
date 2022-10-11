let container = document.getElementById('resultsContainer');
let bestWeightBtn = document.getElementById('bests');
let updateBtn = document.getElementById('update');
let deleteBtn = document.getElementById('delete');
let addBtn = document.getElementById('add');
let dateDisplay = document.getElementById('date');

let date = new Date();
const dateFormat = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

dateDisplay.innerText = `Today is ${dateFormat}`;

// shows all current workouts and personal bests
function displayWorkouts() {
  container.innerHTML = '';
  container.style.backgroundColor = 'white';
  fetch('https://workout-tracker-kdyx.onrender.com/api/workouts')
    .then(data => data.json())
    .then(workouts => {
      workouts.forEach(workout => {
        let nextWorkout = document.createElement('div');
        nextWorkout.id = 'workoutCard'
        nextWorkout.innerText = `${workout.workout_name} \n Personal Best Weight: ${workout.best_weight} \n Number of Reps: ${workout.rep_number}`
        container.append(nextWorkout);
      })
    })
}

// populates input boxes and submit button
function populateUpdate() {
  container.innerHTML = '';
  container.style.backgroundColor = 'white';
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

  submitButton.innerText = 'Update Workout';

  let updatedData = {
    best_weight: null,
    rep_number: null
  }

  // updates data for workout
  function makeChanges() {
    fetch(`https://workout-tracker-kdyx.onrender.com/api/workouts/update/${workoutInput.value}`, {
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
    prompt('this');
  });
}

// populates input box and delete button
function populateDelete() {
  container.innerHTML = '';
  container.style.backgroundColor = 'white';
  let workoutInput = document.createElement('input');
  let deleteButton = document.createElement('button')
  container.append(workoutInput, deleteButton)

  deleteButton.innerText = "Delete";
  workoutInput.placeholder = "Workout Name:"

  function deleteWorkout() {
    fetch(`https://workout-tracker-kdyx.onrender.com/api/workouts/delete/${workoutInput.value}`, {
      method: "DELETE"
    })
  }
  deleteButton.addEventListener('click', () => {
    deleteWorkout();
    alert("Workout Deleted.")
  })
}

function populateAdd() {
  container.innerHTML = '';
  container.style.backgroundColor = 'white';
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

  submitButton.innerText = 'Add Workout';

  let newWorkout = {
    "workout_name": null,
    "best_weight": null,
    "rep_number": null
  }

  function addWorkout() {
    fetch('https://workout-tracker-kdyx.onrender.com/api/workouts/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newWorkout)
    })
  }
  submitButton.addEventListener('click', () => {
    newWorkout.workout_name = workoutInput.value;
    newWorkout.best_weight = parseInt(weightInput.value);
    newWorkout.rep_number = parseInt(repInput.value);
    addWorkout();
    alert(`You are now tracking ${workoutInput.value}`)
  })
}

// event listeners for buttons
bestWeightBtn.addEventListener('click', displayWorkouts);
updateBtn.addEventListener('click', populateUpdate);
deleteBtn.addEventListener('click', populateDelete);
addBtn.addEventListener('click', populateAdd);
