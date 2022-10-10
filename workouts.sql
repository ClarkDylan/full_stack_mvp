DROP TABLE IF EXISTS workouts;
CREATE TABLE workouts (
  workout_id SERIAL,
  workout_name VARCHAR(35),
  best_weight INTEGER,
  rep_number INTEGER
);

INSERT INTO workouts (workout_name, best_weight, rep_number) VALUES
('Bench Press', 265, 1),
('Dead lift', 405, 1),
('Squat', 275, 1);