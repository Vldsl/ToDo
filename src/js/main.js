import "./../scss/style.scss";

import { load } from "./modules/utils.js";
import { searchQuery, addTask } from "./modules/listActions.js";
import { handleTaskAction } from "./modules/taskActions.js";

import {
  form,
  list,
  taskInput,
  taskSearch,
  tasks,
} from "./modules/variables.js";

document.addEventListener("DOMContentLoaded", () => load(tasks));
taskSearch.addEventListener("input", () => searchQuery(list, taskSearch));
list.addEventListener("click", (e) =>
  handleTaskAction(e, tasks, form, taskInput)
);
form.addEventListener("submit", (e) => addTask(e, taskInput, tasks, list));
