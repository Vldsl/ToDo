import {
  markAllDoneButton,
  markAllUndoneButton,
  deleteAllTasksButton,
  deleteDoneTasksButton,
  loader,
  prevCompletedTasks,
} from "./variables.js";

import { renderList } from "./render.js";

export const saveToLS = (tasks) => {
  loader.style.display = "block";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loader.style.display = "none";
};
export const sortTasks = (tasks) => tasks.sort((a, b) => a.done - b.done);

export const checkAllDone = (prevCompletedTasks, tasks) => {
  if (tasks.every((task) => task.done)) {
    markAllUndoneButton.disabled = false;

    if (prevCompletedTasks.length) {
      markAllDoneButton.disabled = false;
      markAllDoneButton.textContent = "Вернуть ранее отмеченные";
    } else {
      markAllDoneButton.disabled = true;
      markAllDoneButton.textContent = "Кнопку не трогали";
    }
  } else {
    markAllUndoneButton.disabled = true;
    markAllDoneButton.disabled = false;
    markAllDoneButton.textContent = "Отметить все";
  }

  if (tasks.some((task) => task.done)) deleteDoneTasksButton.disabled = false;
  else deleteDoneTasksButton.disabled = true;
};

export const checkEmptyList = (tasks) => {
  if (!tasks.length) {
    list.innerHTML = `
		  <li id="emptyList" class="empty-list">
		    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		    <div class="empty-list__title">Список дел пуст</div>
		  </li>
		`;
    markAllDoneButton.disabled = true;
    markAllUndoneButton.disabled = true;
    deleteAllTasksButton.disabled = true;
    deleteDoneTasksButton.disabled = true;
  } else {
    list.querySelector("#emptyList")?.remove();

    markAllDoneButton.disabled = false;
    deleteAllTasksButton.disabled = false;
    deleteDoneTasksButton.disabled = false;
  }
};

export const load = (tasks) => {
  if (tasks.length) {
    renderList(tasks);
    checkAllDone(prevCompletedTasks, tasks);
  } else checkEmptyList(tasks);
};
