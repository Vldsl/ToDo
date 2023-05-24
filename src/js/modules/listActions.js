import { renderList } from "./render.js";

import { list, taskSearch } from "./variables";
import { saveToLS, checkAllDone, checkEmptyList } from "./utils";

export const searchQuery = () => {
  const listTasks = list.querySelectorAll(".list-group-item");

  if (!listTasks.length) return;

  listTasks.forEach((task) => {
    const taskTitle = task
      .querySelector(".task-title")
      .textContent.toLowerCase();
    const isMatch = taskTitle.includes(taskSearch.value.trim().toLowerCase());

    if (!isMatch) task.classList.add("d-none");
    else task.classList.remove("d-none");
  });
};

export const markAllDone = (prevCompletedTasks, tasks) => {
  if (tasks.every((task) => task.done)) {
    prevCompletedTasks =
      JSON.parse(localStorage.getItem("prevCompletedTasks")) ?? [];
    tasks.splice(0, tasks.length, ...prevCompletedTasks);
    renderList(tasks);
    localStorage.removeItem("prevCompletedTasks");
    prevCompletedTasks = [];
  } else {
    prevCompletedTasks = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem(
      "prevCompletedTasks",
      JSON.stringify(prevCompletedTasks)
    );
    tasks.forEach((task) => (task.done = true));
    list
      .querySelectorAll(".task-title")
      .forEach((title) => title.classList.add("task-title--done"));
  }
  saveToLS(tasks);
  checkAllDone(prevCompletedTasks, tasks);
};

export const markAllUndone = (prevCompletedTasks, tasks) => {
  tasks.forEach((task) => (task.done = false));

  list
    .querySelectorAll(".task-title")
    .forEach((title) => title.classList.remove("task-title--done"));
  checkAllDone(prevCompletedTasks, tasks);
  saveToLS(tasks);
  if (prevCompletedTasks.length) {
    localStorage.removeItem("prevCompletedTasks");
    prevCompletedTasks = [];
  }
};

export const deleteAllTasks = (tasks) => {
  if (!tasks.length) return;
  tasks = [];
  list.innerHTML = "";
  saveToLS(tasks);
  checkEmptyList();
};

export const deleteDoneTasks = (tasks) => {
  tasks = tasks.filter((task) => !task.done);
  list.innerHTML = "";

  tasks.length ? renderList(tasks) : checkEmptyList();
  saveToLS(tasks);
};
