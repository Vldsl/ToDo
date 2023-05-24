import { load } from "./modules/utils.js";
import {
  searchQuery,
  markAllDone,
  markAllUndone,
  deleteAllTasks,
  deleteDoneTasks,
} from "./modules/listActions.js";
import { addTask, handleTaskAction } from "./modules/taskActions.js";

import {
  form,
  list,
  taskSearch,
  markAllDoneButton,
  markAllUndoneButton,
  deleteAllTasksButton,
  deleteDoneTasksButton,
  tasks,
  prevCompletedTasks,
  prevDeletedTasks,
} from "./modules/variables.js";

document.addEventListener("DOMContentLoaded", () =>
  load(tasks, prevCompletedTasks)
);
markAllDoneButton.addEventListener("click", () =>
  markAllDone(prevCompletedTasks, tasks)
);
markAllUndoneButton.addEventListener("click", () =>
  markAllUndone(prevCompletedTasks, tasks)
);
deleteAllTasksButton.addEventListener("click", () => deleteAllTasks(tasks));
deleteDoneTasksButton.addEventListener("click", () => deleteDoneTasks(tasks));
taskSearch.addEventListener("input", searchQuery);
list.addEventListener("click", (e) =>
  handleTaskAction(e, tasks, prevCompletedTasks)
);
form.addEventListener("submit", addTask);
