import { renderList } from "./render";

export const saveToLS = (loader, tasks) => {
  loader.style.display = "block";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loader.style.display = "none";
};

export const sortTasks = (tasks) => tasks.sort((a, b) => a.done - b.done);

export const showEmptyList = (list) => {
  list.innerHTML = `
		  <li id="emptyList" class="empty-list">
		    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		    <div class="empty-list__title">Список дел пуст</div>
		  </li>
		`;
};

export const load = (tasks, list) => {
  if (tasks.length) renderList(tasks);
  else showEmptyList(list);
};
