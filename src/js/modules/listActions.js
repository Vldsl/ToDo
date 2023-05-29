import { renderList } from "./render.js";
import { saveToLS } from "./utils";
import { loader } from "./variables.js";

export const searchQuery = (list, taskSearch) => {
  const searchValue = taskSearch.value.trim().toLowerCase();
  const listTasks = list.querySelectorAll(".list-group-item");
  if (!listTasks.length) return;

  listTasks.forEach((task) => {
    const taskTitle = task
      .querySelector(".task-title")
      .textContent.toLowerCase();
    const isMatch = taskTitle.includes(searchValue);

    if (!isMatch) task.classList.add("d-none");
    else task.classList.remove("d-none");
  });
};

export const addTask = (e, taskInput, tasks, list) => {
  e.preventDefault();
  if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
    taskInput.classList.add("error");
    form.reset();
    return;
  }
  taskInput.classList.remove("error");
  const taskId = +form.dataset.taskId;
  if (taskId) {
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);
    if (taskIndex !== -1) {
      const taskItem = list.querySelector(
        `.list-group-item[data-id="${taskId}"]`
      );
      taskItem.querySelector(".task-title").textContent =
        taskInput.value.trim();
      tasks[taskIndex].text = taskInput.value.trim();
      delete form.dataset.taskId;
      btnForm.textContent = "Add Task";
    }
  } else {
    const newTask = {
      id: Date.now(),
      text: taskInput.value.trim(),
      done: false,
      subtasks: [],
    };
    tasks.unshift(newTask);
    renderList(tasks);
  }
  saveToLS(loader, tasks);
  form.reset();
  taskInput.focus();
};
