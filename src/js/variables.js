const form = document.querySelector("#form"),
  list = document.querySelector("#list"),
  taskInput = document.querySelector("#task-input"),
  taskSearch = document.querySelector("#task-search"),
  markAllDoneButton = document.querySelector(".mark-all-done"),
  markAllUndoneButton = document.querySelector(".remove-all-marks"),
  deleteAllTasksButton = document.querySelector(".delete-all-tasks"),
  deleteDoneTasksButton = document.querySelector(".delete-done-tasks"),
  loader = document.getElementById("loader");

let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
let prevCompletedTasks =
  JSON.parse(localStorage.getItem("prevCompletedTasks")) ?? [];
let prevDeletedTasks;

export default {};
