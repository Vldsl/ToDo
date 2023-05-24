import { renderTask, renderList } from "./render.js";

import { form, list, taskInput, tasks, prevCompletedTasks } from "./variables";
import { saveToLS, sortTasks, checkAllDone, checkEmptyList } from "./utils";

import { handleAddSubtask, handleSubtaskAction } from "./subtaskActions.js";

const handleTaskDone = (prevCompletedTasks, task, taskTitle) => {
  task.done = !task.done;
  taskTitle.classList.toggle("task-title--done");
  checkAllDone(prevCompletedTasks, tasks);
  sortTasks(tasks);
  renderList(tasks);

  if (prevCompletedTasks.length) {
    localStorage.removeItem("prevCompletedTasks");
    prevCompletedTasks = [];
  }
};

const handleTaskDelete = (tasks, taskId, parentNode) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    parentNode.remove();
    checkEmptyList(tasks);
  }
};

const handleTaskEdit = (task, form, taskInput) => {
  taskInput.value = task.text;
  taskInput.focus();
  form.dataset.taskId = task.id;
  form.querySelector('button[type="submit"]').textContent = "Update task";
};

export const handleTaskAction = (e, tasks, prevCompletedTasks) => {
  if (!e.target.matches(".btn-action")) return;
  const parentNode = e.target.closest(".task-item");
  const taskId = Number(parentNode?.dataset?.id);
  const task = tasks.find((task) => task.id === taskId);
  const taskTitle = parentNode?.querySelector(".task-title");

  if (!parentNode || !taskId || !task || !taskTitle) return;

  if (e.target.dataset.action === "done") {
    handleTaskDone(prevCompletedTasks, task, taskTitle);
  } else if (e.target.dataset.action === "delete") {
    handleTaskDelete(tasks, taskId, parentNode);
  } else if (e.target.dataset.action === "edit") {
    handleTaskEdit(task, form, taskInput);
  } else if (e.target.dataset.action === "addSubtask") {
    handleAddSubtask(e, parentNode, task);
  } else if (
    e.target.dataset.action === "done-subtask" ||
    e.target.dataset.action === "delete-subtask"
  ) {
    handleSubtaskAction(e, task);
  } else return;

  saveToLS(tasks);
};

export const addTask = (e) => {
  e.preventDefault();
  if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
    taskInput.classList.add("error");
    form.reset();
    return;
  }
  taskInput.classList.remove("error");
  const taskId = Number(form.dataset.taskId);
  if (taskId) {
    const taskIndex = tasks.findIndex((task) => (task.id = taskId));
    if (taskIndex !== -1) {
      const taskItem = list.querySelector(
        `.list-group-item[data-id="${taskId}"]`
      );
      taskItem.querySelector(".task-title").textContent =
        taskInput.value.trim();
      tasks[taskIndex].text = taskInput.value.trim();
      delete form.dataset.taskId;
      form.querySelector('button[type="submit"]').textContent = "Add Task";
    }
  } else {
    const newTask = {
      id: Date.now(),
      text: taskInput.value.trim(),
      done: false,
      subtasks: [],
    };
    tasks.unshift(newTask);
    renderTask(newTask);
    checkEmptyList(tasks);
    checkAllDone(prevCompletedTasks, tasks);
  }
  saveToLS(tasks);
  form.reset();
  taskInput.focus();
};
