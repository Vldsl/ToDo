export const form = document.querySelector("#form"),
  list = document.querySelector("#list"),
  taskInput = document.querySelector("#task-input"),
  taskSearch = document.querySelector("#task-search"),
  btnForm = form.querySelector("#btn-form"),
  loader = document.querySelector("#loader");

export let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
