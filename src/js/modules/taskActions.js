import { renderList } from "./render.js";
import { saveToLS, showEmptyList, sortTasks } from "./utils";
import { handleAddSubtask, handleSubtaskAction } from "./subtaskActions.js";
import { list, loader, tasks } from "./variables.js";

const handleTaskDone = (task, taskTitle) => {
  task.done = !task.done;
  taskTitle.classList.toggle("task-title--done");

  sortTasks(tasks);
  renderList(tasks);
};

const handleTaskDelete = (taskIndex, parentNode, tasks) => {
  tasks.splice(taskIndex, 1);
  parentNode.remove();
  if (!tasks.length) showEmptyList(list);
};

const handleTaskEdit = (task, form, taskInput, btnForm) => {
  taskInput.value = task.text;
  taskInput.focus();
  form.dataset.taskId = task.id;
  btnForm.textContent = "Update task";
};

export const handleTaskAction = (e, tasks, form, taskInput) => {
  const { target } = e;
  if (!target.matches(".btn-action")) return;
  const parentNode = target.closest(".task-item");
  const taskId = +parentNode?.dataset?.id;
  const task = tasks.find(({ id }) => id === taskId);
  const taskTitle = parentNode?.querySelector(".task-title");
  const taskIndex = tasks.findIndex(({ id }) => id === taskId);

  if (!parentNode || !taskId || !task || !taskTitle || taskIndex === -1) return;

  if (target.dataset.action === "done") {
    handleTaskDone(task, taskTitle);
  } else if (target.dataset.action === "delete") {
    handleTaskDelete(taskIndex, parentNode, tasks);
  } else if (target.dataset.action === "edit") {
    handleTaskEdit(task, form, taskInput, btnForm);
  } else if (target.dataset.action === "addSubtask") {
    handleAddSubtask(e, parentNode, task);
  } else if (
    target.dataset.action === "done-subtask" ||
    target.dataset.action === "delete-subtask"
  ) {
    handleSubtaskAction(e, task);
  } else return;

  saveToLS(loader, tasks);
};
