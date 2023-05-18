// Разрешить пользователю настраивать цвет и размер шрифта для своих задач.

// Добавить возможность добавления приоритета для каждой задачи и сортировки задач по приоритету.

// Реализовать функцию напоминания для задач, которые должны быть выполнены в определенное время.

// добавлении валидации для формы, возможность сортировки задач, или добавление функционала для перетаскивания задач внутри списка

// Фильтрация задач по статусу (например, "выполнено", "в процессе", "не выполнено").
// Поиск задач по ключевым словам или фразам.
// Возможность добавления приоритетов для задач (например, "высокий", "средний", "низкий").
// Добавление функционала напоминаний о задачах - например, отправка электронной почты или уведомлений на телефон о задачах, которые нужно выполнить в ближайшее время.
// Сортировка задач по дате создания, дате завершения, приоритету и т.д.
// Возможность добавления тегов для задач, чтобы легче было организовывать их в группы.
// Добавление возможности отправлять задачи на почту или в календарь.
// Добавить возможность добавлять подзадачи

// Что лучше: рендер одного элемента на страницу или ререндер всего массива?
//========================================================================================================================================================
//========================================================================================================================================================

"use strict";
// import * as vars from "./variables";
// import { list } from "./variables";

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

// Functions
const renderTask = (task) => {
  const taskHTML = `
    <li class="list-group-item d-flex justify-content-between task-item" data-id="${
      task.id
    }">

      <span class="task-title ${task.done ? "task-title--done" : ""}">${
    task.text
  }
			</span>
      <div class="task-item__buttons">

        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>

        <button type="button" data-action="edit" class="btn-action">
          <img src="./img/edit.svg" alt="Edit" width="18" height="18">
        </button>

        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Delete" width="18" height="18">
        </button>

      </div>
    </li>`;
  list.insertAdjacentHTML("afterbegin", taskHTML);
};

const renderList = () => {
  list.innerHTML = "";
  const taskHTML = tasks
    .map(
      (task) => `
	<li class="list-group-item d-flex justify-content-between flex-column task-item" data-id="${
    task.id
  }">

		<div class="d-flex justify-content-between">
		<span class="task-title ${task.done ? "task-title--done" : ""}">${task.text}
		</span>
		<div class="task-item__buttons">
		
			<button type="button" data-action="addSubtask" class="btn-action">
				<img src="./img/plus.svg" alt="Add Subtask" width="18" height="18">
			</button>

			<button type="button" data-action="done" class="btn-action">
				<img src="./img/tick.svg" alt="Done" width="18" height="18">
			</button>

			<button type="button" data-action="edit" class="btn-action">
				<img src="./img/edit.svg" alt="Edit" width="18" height="18">
			</button>

			<button type="button" data-action="delete" class="btn-action">
				<img src="./img/cross.svg" alt="Delete" width="18" height="18">
			</button>

		</div>
		</div>

		<ul class="subtasks list-group">
      ${
        task.subtasks.length
          ? task.subtasks
              .map(
                (subtask) => `
								<li class="d-flex justify-content-between subtask-item list-group-item" data-id="${
                  subtask.id
                }">
		
									<span class="subtask-title ${subtask.done ? "subtask-title--done" : ""}">${
                  subtask.text
                }</span>

									<div class="subtask-item__buttons">

										<button type="button" data-action="done-subtask" class="btn-action">
											<img src="./img/tick.svg" alt="Done" width="18" height="18">
										</button>
											
										<button type="button" data-action="edit-subtask" class="btn-action">
											<img src="./img/edit.svg" alt="Edit" width="18" height="18">
										</button>
											
										<button type="button" data-action="delete-subtask" class="btn-action">
											<img src="./img/cross.svg" alt="Delete" width="18" height="18">
										</button>
											
									</div>
								</li>`
              )
              .join("")
          : ""
      }
    </ul>

	</li>
	`
    )
    .join("");
  list.insertAdjacentHTML("afterbegin", taskHTML);
};

const checkEmptyList = () => {
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

const searchQuery = () => {
  const query = taskSearch.value.trim().toLowerCase();
  const listTasks = list.querySelectorAll(".list-group-item:not(.d-none)");
  listTasks.forEach((task) => task.classList.add("d-none"));
  listTasks.forEach((task) => {
    const taskTitle = task
      .querySelector(".task-title")
      .textContent.trim()
      .toLowerCase();
    if (taskTitle.includes(query)) task.classList.remove("d-none");
  });
};

const checkAllDone = () => {
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

const markAllDone = () => {
  if (tasks.every((task) => task.done)) {
    console.log("Если каждая задача выполнена");
    if (prevCompletedTasks.length) {
      console.log("Отображать предыдущие задачи");
      tasks = prevCompletedTasks;
      renderList();
    } else {
      console.log("Просто снять все отметки со всех задач");
      markAllUndone();
    }
  } else {
    console.log("Если каждая задача невыполнена");
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
  saveToLS();
  checkAllDone();
};

const markAllUndone = () => {
  tasks.forEach((task) => (task.done = false));

  list
    .querySelectorAll(".task-title")
    .forEach((title) => title.classList.remove("task-title--done"));
  checkAllDone();
  saveToLS();
  if (prevCompletedTasks.length) {
    localStorage.removeItem("prevCompletedTasks");
    prevCompletedTasks = [];
  }
};

const deleteAllTasks = () => {
  if (!tasks.length) return;
  tasks = [];
  list.innerHTML = "";
  saveToLS();
  checkEmptyList();
};

const deleteDoneTasks = () => {
  tasks = tasks.filter((task) => !task.done);
  list.innerHTML = "";

  tasks.length ? renderList() : checkEmptyList();
  saveToLS();
};

const addSubtask = (e, parentNode, task) => {
  parentNode.querySelector(".subtasks").insertAdjacentHTML(
    "beforeend",
    `
		<form class="form-add-subtask">
			<input class="subtask-input" type="text">
			<button class="btn" type="submit">Add Subtask</button>
		</form>`
  );
  const formAddSubtask = parentNode.querySelector(".form-add-subtask");
  const subtaskInput = formAddSubtask.querySelector(".subtask-input");
  subtaskInput.focus();

  formAddSubtask?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (subtaskInput.value.trim() < 1 || !isNaN(subtaskInput.value.trim())) {
      formAddSubtask.remove();
      return;
    }

    const newSubtask = {
      id: Date.now(),
      text: subtaskInput.value.trim(),
      done: false,
    };
    task.subtasks.push(newSubtask);

    parentNode.querySelector(".subtasks").insertAdjacentHTML(
      "beforeend",
      `<li class="d-flex justify-content-between subtask-item list-group-item" data-id="${
        newSubtask.id
      }">
		
					<span class="subtask-title">${subtaskInput.value.trim()}
					</span>
					<div class="subtask-item__buttons">
		
						<button type="button" data-action="done-subtask" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
		
						<button type="button" data-action="edit-subtask" class="btn-action">
							<img src="./img/edit.svg" alt="Edit" width="18" height="18">
						</button>
		
						<button type="button" data-action="delete-subtask" class="btn-action">
							<img src="./img/cross.svg" alt="Delete" width="18" height="18">
						</button>
		
					</div>
				</li>`
    );

    formAddSubtask.remove();
    saveToLS();
  });
};

const handleTaskAction = (e) => {
  if (!e.target.matches(".btn-action")) return;
  const parentNode = e.target.closest(".task-item");
  const taskId = Number(parentNode.dataset.id);
  const task = tasks.find((task) => task.id === taskId);
  const taskTitle = parentNode.querySelector(".task-title");

  if (!parentNode || !taskId || !task || !taskTitle) return;

  if (e.target.dataset.action === "done") {
    task.done = !task.done;
    taskTitle.classList.toggle("task-title--done");
    checkAllDone();
    sortTasks();
    renderList();

    if (prevCompletedTasks.length) {
      localStorage.removeItem("prevCompletedTasks");
      prevCompletedTasks = [];
    }
  } else if (e.target.dataset.action === "delete") {
    tasks = tasks.filter((task) => task.id !== taskId);
    parentNode.remove();
    checkEmptyList();
  } else if (e.target.dataset.action === "edit") {
    taskInput.value = task.text;
    taskInput.focus();
    form.dataset.taskId = taskId;
    form.querySelector('button[type="submit"]').textContent = "Update task";
  } else if (e.target.dataset.action === "addSubtask") {
    addSubtask(e, parentNode, task);
  } else if (e.target.dataset.action === "done-subtask") {
    const subParendNode = e.target.closest(".subtask-item");
    const subtaskId = Number(subParendNode.dataset.id);
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    const subtaskTitle = subParendNode.querySelector(".subtask-title");

    subtask.done = !subtask.done;
    subtaskTitle.classList.toggle("subtask-title--done");
  } else if (e.target.dataset.action === "delete-subtask") {
    const subParendNode = e.target.closest(".subtask-item");
    const subtaskId = Number(subParendNode.dataset.id);
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    const subtaskTitle = subParendNode.querySelector(".subtask-title");

    subParendNode.remove();
    task.subtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);
  } else if (e.target.dataset.action === "edit-subtask") {
  } else return;
  saveToLS();
};

const addTask = (e) => {
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
    checkEmptyList();
    checkAllDone();
  }
  saveToLS();
  form.reset();
  taskInput.focus();
};

const load = () => {
  if (tasks.length) {
    renderList();
    checkAllDone();
  } else checkEmptyList();
};

const saveToLS = () => {
  loader.style.display = "block";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loader.style.display = "none";
};

const sortTasks = () => tasks.sort((a, b) => a.done - b.done);

// Listeners
// window.addEventListener("load", load);
document.addEventListener("DOMContentLoaded", load);
deleteAllTasksButton.addEventListener("click", deleteAllTasks);
deleteDoneTasksButton.addEventListener("click", deleteAllTasks);
markAllDoneButton.addEventListener("click", markAllDone);
markAllUndoneButton.addEventListener("click", markAllUndone);
taskSearch.addEventListener("input", searchQuery);
list.addEventListener("click", handleTaskAction);
form.addEventListener("submit", addTask);

//========================================================================================================================================================

// const form = document.querySelector("#form"),
//   list = document.querySelector("#list"),
//   taskInput = document.querySelector("#task-input"),
//   taskSearch = document.querySelector("#task-search"),
//   markAllDoneButton = document.querySelector(".mark-all-done"),
//   markAllUndoneButton = document.querySelector(".remove-all-marks"),
//   deleteAllTasksButton = document.querySelector(".delete-all-tasks"),
//   deleteDoneTasksButton = document.querySelector(".delete-done-tasks"),
//   loader = document.getElementById("loader");

// let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
// let prevCompletedTasks = [];

// // Functions
// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${
//       task.id
//     }">

//       <span class="task-title ${task.done ? "task-title--done" : ""}">${
//     task.text
//   }
// 			</span>
//       <div class="task-item__buttons">

//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>

//         <button type="button" data-action="edit" class="btn-action">
//           <img src="./img/edit.svg" alt="Edit" width="18" height="18">
//         </button>

//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>

//       </div>
//     </li>`;
//   list.insertAdjacentHTML("afterbegin", taskHTML);
// };

// const renderList = () => {
//   list.innerHTML = "";
//   const taskHTML = tasks
//     .map(
//       (task) => `
// 	<li class="list-group-item d-flex justify-content-between task-item" data-id="${
//     task.id
//   }">

// 		<span class="task-title ${task.done ? "task-title--done" : ""}">${task.text}
// 		</span>
// 		<div class="task-item__buttons">

// 			<button type="button" data-action="done" class="btn-action">
// 				<img src="./img/tick.svg" alt="Done" width="18" height="18">
// 			</button>

// 			<button type="button" data-action="edit" class="btn-action">
// 				<img src="./img/edit.svg" alt="Edit" width="18" height="18">
// 			</button>

// 			<button type="button" data-action="delete" class="btn-action">
// 				<img src="./img/cross.svg" alt="Delete" width="18" height="18">
// 			</button>

// 		</div>
// 	</li>
// 	`
//     )
//     .join("");
//   list.insertAdjacentHTML("afterbegin", taskHTML);
// };

// const checkEmptyList = () => {
//   if (!tasks.length) {
//     list.innerHTML = `
// 		  <li id="emptyList" class="empty-list">
// 		    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
// 		    <div class="empty-list__title">Список дел пуст</div>
// 		  </li>
// 		`;
//     markAllDoneButton.disabled = true;
//     markAllUndoneButton.disabled = true;
//     deleteAllTasksButton.disabled = true;
//     deleteDoneTasksButton.disabled = true;
//   } else {
//     list.querySelector("#emptyList")?.remove();

//     markAllDoneButton.disabled = false;
//     deleteAllTasksButton.disabled = false;
//     deleteDoneTasksButton.disabled = false;
//   }
// };

// const searchQuery = () => {
//   const query = taskSearch.value.trim().toLowerCase();
//   const listTasks = list.querySelectorAll(".list-group-item:not(.d-none)");
//   listTasks.forEach((task) => task.classList.add("d-none"));
//   listTasks.forEach((task) => {
//     const taskTitle = task
//       .querySelector(".task-title")
//       .textContent.trim()
//       .toLowerCase();
//     if (taskTitle.includes(query)) task.classList.remove("d-none");
//   });
// };

// const checkAllDone = () => {
//   if (tasks.filter((task) => task.done).length === tasks.length) {
//     markAllUndoneButton.disabled = false;
//   } else {
//     markAllUndoneButton.disabled = true;
//   }
// };

// // const markAllDone = () => {
// //   if (tasks.filter((task) => task.done).length === tasks.length) {
// //     if (!prevCompletedTasks.length) return;
// //     markAllDoneButton.textContent = "Отметить все";

// //     tasks = prevCompletedTasks;
// //     renderList();
// //     checkAllDone();
// //   } else {
// //     markAllDoneButton.textContent = "Вернуть как было";
// //     prevCompletedTasks = JSON.parse(localStorage.getItem("tasks"));

// //     tasks.forEach((task) => (task.done = true));

// //     list
// //       .querySelectorAll(".task-title")
// //       .forEach((title) => title.classList.add("task-title--done"));
// //   }

// //   checkAllDone();
// //   saveToLS();
// // };

// const markAllDone = () => {
//   if (tasks.every((task) => task.done)) {
//     if (!prevCompletedTasks) return;
//     markAllDoneButton.textContent = "Отметить все";
//     tasks = prevCompletedTasks;
//     renderList();
//   } else {
//     markAllDoneButton.textContent = "Вернуть как было";
//     prevCompletedTasks = JSON.parse(localStorage.getItem("tasks"));
//     tasks.forEach((task) => (task.done = true));
//     list
//       .querySelectorAll(".task-title")
//       .forEach((title) => title.classList.add("task-title--done"));
//   }
//   saveToLS();
//   checkAllDone();
// };

// // const markAllDone = () => {
// //   if (tasks.some((task) => !task.done)) {
// //     tasks.forEach((task) => (task.done = true));
// //     list.querySelectorAll(".task-title").forEach((title) => title.classList.add("task-title--done"));
// //   } else {
// //     tasks.forEach((task) => (task.done = false));
// //     list.querySelectorAll(".task-title").forEach((title) => title.classList.remove("task-title--done"));
// //   }
// //   saveToLS();
// // };

// const markAllUndone = () => {
//   tasks.forEach((task) => (task.done = false));

//   list
//     .querySelectorAll(".task-title")
//     .forEach((title) => title.classList.remove("task-title--done"));
//   checkAllDone();
//   saveToLS();
// };

// const deleteAllTasks = () => {
//   tasks = [];
//   list.innerHTML = "";
//   saveToLS();
//   checkEmptyList();
// };

// const deleteDoneTasks = () => {
//   if (!tasks.filter((task) => !task.done).length) return;
//   tasks = tasks.filter((task) => !task.done);
//   tasks = tasks.filter(({ done }) => !done);
//   list.innerHTML = "";
//   if (tasks.length) renderList();
//   saveToLS();
//   checkEmptyList();
// };

// const handleTaskAction = (e) => {
//   if (!e.target.matches(".btn-action")) return;
//   const parentNode = e.target.closest(".list-group-item");
//   const taskId = Number(parentNode.dataset.id);
//   const taskTitle = parentNode.querySelector(".task-title");
//   const task = tasks.find((task) => task.id === taskId);
//   if (!parentNode || !taskId || !taskTitle || !task) return;

//   if (e.target.dataset.action === "done") {
//     task.done = !task.done;
//     taskTitle.classList.toggle("task-title--done");
//     if (tasks.filter((task) => task.done).length === tasks.length)
//       markAllDoneButton.disabled = true;
//     else markAllDoneButton.disabled = false;
//     checkAllDone();
//     sortTasks();
//     renderList();
//   } else if (e.target.dataset.action === "delete") {
//     tasks = tasks.filter((task) => task.id !== taskId);
//     parentNode.remove();
//     checkEmptyList();
//   } else if (e.target.dataset.action === "edit") {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = "Update task";
//   } else return;
//   saveToLS();
// };

// const addTask = (e) => {
//   e.preventDefault();
//   if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
//     taskInput.classList.add("error");
//     form.reset();
//     return;
//   }
//   taskInput.classList.remove("error");
//   const taskId = Number(form.dataset.taskId);
//   if (taskId) {
//     const taskIndex = tasks.findIndex((task) => task.id === taskId);
//     if (taskIndex !== -1) {
//       const taskItem = list.querySelector(
//         `.list-group-item[data-id="${taskId}"]`
//       );
//       taskItem.querySelector(".task-title").textContent =
//         taskInput.value.trim();
//       tasks[taskIndex].text = taskInput.value.trim();
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = "Add task";
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskInput.value.trim(),
//       done: false,
//     };
//     tasks.unshift(newTask);
//     renderTask(newTask);

//     checkEmptyList();
//     checkAllDone();
//   }
//   saveToLS();
//   form.reset();
//   taskInput.focus();
// };

// const load = () => {
//   if (tasks.length) {
//     renderList();
//     checkAllDone();
//   } else checkEmptyList();
// };

// const saveToLS = () => {
//   loader.style.display = "block";
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   loader.style.display = "none";
// };

// const sortTasks = () => tasks.sort((a, b) => a.done - b.done);

// // Listeners
// window.addEventListener("load", load);
// deleteAllTasksButton.addEventListener("click", deleteAllTasks);
// deleteDoneTasksButton.addEventListener("click", deleteAllTasks);
// markAllDoneButton.addEventListener("click", markAllDone);
// markAllUndoneButton.addEventListener("click", markAllUndone);
// taskSearch.addEventListener("input", searchQuery);
// list.addEventListener("click", handleTaskAction);
// form.addEventListener("submit", addTask);

//========================================================================================================================================================

// const form = document.querySelector("#form"),
//   list = document.querySelector("#list"),
//   taskInput = document.querySelector("#task-input"),
//   taskSearch = document.querySelector("#task-search"),
//   markAllDoneButton = document.querySelector(".mark-all-done"),
//   deleteAllTasksButton = document.querySelector(".delete-all-tasks"),
//   deleteDoneTasksButton = document.querySelector(".delete-done-tasks");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const checkEmptyList = () => {
//   // Может перед этим стоит очищать весь список на всякий случай
//   list.querySelector("#emptyList")?.remove();
//   if (tasks.length === 0)
//     list.insertAdjacentHTML(
//       "afterbegin",
//       `
// 		  <li id="emptyList" class="empty-list">
// 	      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
// 	      <div class="empty-list__title">Список дел пуст</div>
// 	    </li>`
//     );
//   else list.querySelector("#emptyList")?.remove();
// };

// checkEmptyList();

// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${
//       task.id
//     }">

//       <span class="task-title ${task.done ? "task-title--done" : ""}">${
//     task.text
//   }
// 			</span>
//       <div class="task-item__buttons">

//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>

//         <button type="button" data-action="edit" class="btn-action">
//           <img src="./img/edit.svg" alt="Edit" width="18" height="18">
//         </button>

//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>

//       </div>
//     </li>`;
//   list.insertAdjacentHTML("beforeend", taskHTML);
// };

// const renderList = () => {
//   list.innerHTML = "";

//   const taskHTML = tasks
//     .map(
//       (
//         task
//       ) => `<li class="list-group-item d-flex justify-content-between task-item" data-id="${
//         task.id
//       }">

// 		<span class="task-title ${task.done ? "task-title--done" : ""}">${task.text}
// 		</span>
// 		<div class="task-item__buttons">

// 			<button type="button" data-action="done" class="btn-action">
// 				<img src="./img/tick.svg" alt="Done" width="18" height="18">
// 			</button>

// 			<button type="button" data-action="edit" class="btn-action">
// 				<img src="./img/edit.svg" alt="Edit" width="18" height="18">
// 			</button>

// 			<button type="button" data-action="delete" class="btn-action">
// 				<img src="./img/cross.svg" alt="Delete" width="18" height="18">
// 			</button>

// 		</div>
// 	</li>`
//     )
//     .join("");
//   list.insertAdjacentHTML("beforeend", taskHTML);
// };

// const sortTasks = () => {
//   const activeTasks = tasks.filter((task) => !task.done);
//   const deactiveTasks = tasks.filter((task) => task.done);

//   tasks = [...activeTasks, ...deactiveTasks];
//   // Здесь нужно добавить перерисовку всех элементов или делать сортировку не массива, а тех элементов которые есть на странице
// };
// sortTasks();

// if (tasks.length) tasks.forEach(renderTask);

// const saveToLS = () => localStorage.setItem("tasks", JSON.stringify(tasks));

// const markAllDone = () => {
//   let markAsDone = true;
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAsDone = false;

//   for (let task of tasks) {
//     task.done = markAsDone;
//     const taskItem = list.querySelector(`[data-id="${task.id}"]`);
//     if (taskItem) {
//       taskItem
//         .querySelector(".task-title")
//         .classList.toggle("task-title--done", markAsDone);
//     }
//   }
//   checkAllDone();
//   saveToLS();
// };

// const checkAllDone = () => {
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAllDone.textContent = "Снять все";
//   else markAllDoneButton.textContent = "Отметить все";
// };
// checkAllDone();

// const deleteAllTasks = () => {
//   list.innerHTML = "";
//   tasks = [];
//   checkEmptyList();
//   saveToLS();
// };

// const removeDoneTasks = () => {
//   tasks = tasks.filter((task) => !task.done);
//   list.innerHTML = "";
//   tasks.forEach((task) => renderTask(task));
//   saveToLS();
//   checkEmptyList();
// };

// const searchQuery = () => {
//   const listTasks = list.querySelectorAll(".list-group-item");
//   if (!listTasks.length) return;
//   listTasks.forEach((task) => {
//     const taskTitle = task
//       .querySelector(".task-title")
//       .textContent.toLowerCase();
//     const isMatch = taskTitle.includes(taskSearch.value.trim().toLowerCase());
//     if (!isMatch) task.classList.add("d-none");
//     else task.classList.remove("d-none");
//   });
// };

// const handleTaskAction = (e) => {
//   if (!e.target.matches(".btn-action")) return;
//   const parentNode = e.target.closest(".list-group-item");
//   const taskId = Number(parentNode.dataset.id);
//   const taskTitle = parentNode.querySelector(".task-title");
//   const task = tasks.find((task) => task.id === taskId);
//   if (!parentNode || !taskId || !taskTitle || !task) return;

//   if (e.target.dataset.action === "done") {
//     task.done = !task.done;
//     taskTitle.classList.toggle("task-title--done");
//     sortTasks();
//   } else if (e.target.dataset.action === "delete") {
//     tasks = tasks.filter((task) => task.id !== taskId);
//     parentNode.remove();
//     checkEmptyList();
//   } else if (e.target.dataset.action === "edit") {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = "Update Task";
//   } else return;
//   // sortTasks(); Здесь происходят лишние вызовы функции сортировки
//   saveToLS();
// };

// const addTask = (e) => {
//   e.preventDefault();
//   if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
//     taskInput.classList.add("error");
//     form.reset();
//     return;
//   }
//   taskInput.classList.remove("error");
//   const taskId = Number(form.dataset.taskId);

//   if (taskId) {
//     const taskIndex = tasks.findIndex((task) => task.id === taskId);
//     if (taskIndex !== -1) {
//       const taskItem = list.querySelector(
//         `.list-group-item[data-id="${taskId}"]`
//       );
//       taskItem.querySelector(".task-title").textContent =
//         taskInput.value.trim();
//       tasks[taskIndex].text = taskInput.value.trim();
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = "Add task";
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskInput.value.trim(),
//       done: false,
//     };

//     tasks.push(newTask);
//     // renderTask(newTask);
//     sortTasks();
//     renderList();
//     saveToLS();
//     checkEmptyList();
//   }

//   form.reset();
//   taskInput.focus();
// };

// deleteDoneTasksButton.addEventListener("click", removeDoneTasks);
// markAllDoneButton.addEventListener("click", markAllDone);
// deleteAllTasksButton.addEventListener("click", deleteAllTasks);
// taskSearch.addEventListener("input", searchQuery);
// list.addEventListener("click", handleTaskAction);
// form.addEventListener("submit", addTask);

//========================================================================================================================================================

// const form = document.querySelector("#form"),
//   taskInput = document.querySelector("#task-input"),
//   list = document.querySelector("#tasks-list"),
//   taskSearch = document.querySelector("#task-search"),
//   markAllDoneButton = document.querySelector(".mark-all-done"),
//   deleteAllTasksButton = document.querySelector(".delete-all-tasks"),
//   deleteDoneTasksButton = document.querySelector(".delete-done-tasks");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const checkEmptyList = () => {
//   if (tasks.length === 0)
//     list.insertAdjacentHTML(
//       "beforebegin",
//       `
// 	        <li id="emptyList" class="list-group-item empty-list">
// 	          <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
// 	          <div class="empty-list__title">Список дел пуст</div>
// 	        </li>`
//     );
//   else list.querySelector(".emptyList")?.remove();
// };

// checkEmptyList();

// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${
//       task.id
//     }">

//       <span class="task-title ${task.done ? "task-title--done" : ""}">${
//     task.text
//   }</span>
//       <div class="task-item__buttons">

//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>

//         <button type="button" data-action="edit" class="btn-action">
//           <img src="./img/edit.svg" alt="Edit" width="18" height="18">
//         </button>

//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>

//       </div>
//     </li>`;
//   list.insertAdjacentHTML("beforeend", taskHTML);
// };

// const sortTasks = () => {
//   const activeTasks = tasks.filter((task) => !task.done);
//   const deactiveTasks = tasks.filter((task) => task.done);
//   tasks = [...activeTasks, ...deactiveTasks];
// };

// sortTasks();

// if (tasks.length) tasks.forEach(renderTask);

// const saveToLS = () => localStorage.setItem("tasks", JSON.stringify(tasks));

// const markAllDone = () => {
//   let markAsDone = true;
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAsDone = false;

//   for (let task of tasks) {
//     task.done = markAsDone;
//     const taskItem = list.querySelector(`[data-id="${task.id}"]`);
//     if (taskItem) {
//       taskItem
//         .querySelector(".task-title")
//         .classList.toggle("task-title--done", markAsDone);
//     }
//   }
//   checkAllDone();
//   saveToLS();
// };

// const checkAllDone = () => {
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAllDone.textContent = "Снять все";
//   else markAllDoneButton.textContent = "Отметить все";
// };
// checkAllDone();

// const deleteAllTasks = () => {
//   list.innerHTML = "";
//   tasks = [];
//   checkEmptyList();
//   saveToLS();
// };

// const removeDoneTasks = () => {
//   tasks = tasks.filter((task) => !task.done);
//   list.innerHTML = "";
//   tasks.forEach((task) => renderTask(task));
//   saveToLS();
//   checkEmptyList();
// };

// const searchQuery = () => {
//   const listTasks = list.querySelectorAll(".list-group-item");

//   if (!listTasks.length) return;

//   listTasks.forEach((task) => {
//     const taskTitle = task
//       .querySelector(".task-title")
//       .textContent.toLowerCase();
//     const isMatch = taskTitle.includes(taskSearch.value.trim().toLowerCase());

//     if (!isMatch) task.classList.add("d-none");
//     else task.classList.remove("d-none");
//   });
// };

// const handleTaskAction = (e) => {
//   if (!e.target.matches(".btn-action")) return;
//   const parentNode = e.target.closest(".list-group-item");
//   const taskId = Number(parentNode.dataset.id);
//   const taskTitle = parentNode.querySelector(".task-title");
//   const task = tasks.find((task) => task.id === taskId);
//   if (!parentNode || !taskId || !taskTitle || !task) return;

//   if (e.target.dataset.action === "done") {
//     task.done = !task.done;
//     taskTitle.classList.toggle("task-title--done");
//     // sortTasks();
//   } else if (e.target.dataset.action === "delete") {
//     tasks = tasks.filter((task = task.id !== taskId));
//     parentNode.remove();
//     checkEmptyList();
//   } else if (e.target.dataset.action === "edit") {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = "Update Task";
//   } else return;
//   sortTasks();
//   saveToLS();
// };

// const addTask = (e) => {
//   e.preventDefault();
//   if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
//     taskInput.classList.add("error");
//     form.reset();
//     return;
//   }
//   taskInput.classList.remove("error");
//   const taskId = form.dataset.taskId;
//   if (taskId) {
//     const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
//     if (taskIndex !== -1) {
//       const taskItem = list.querySelector(
//         `.list-group-item[data-id='${taskId}']`
//       );
//       taskItem.querySelector(".task-title").textContent =
//         taskInput.value.trim();
//       tasks[taskIndex].text = taskInput.value.trim();
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = "Add Task";
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskInput.value.trim(),
//       done: false,
//     };
//     tasks.push(newTask);
//     renderTask(newTask);
//   }
//   form.reset();
//   taskInput.focus();

//   // sortTasks();
//   saveToLS();
//   checkEmptyList();
// };

// deleteDoneTasksButton.addEventListener("click", removeDoneTasks);
// markAllDoneButton.addEventListener("click", markAllDone);
// deleteAllTasksButton.addEventListener("click", deleteAllTasks);
// taskSearch.addEventListener("input", searchQuery);
// list.addEventListener("click", handleTaskAction);
// form.addEventListener("submit", addTask);

//========================================================================================================================================================

// const form = document.querySelector("#form"),
//   taskInput = document.querySelector("#taskInput"),
//   list = document.querySelector("#list"),
//   searchInput = document.querySelector("#taskSearch"),
//   markAllDoneButton = document.querySelector(".mark-all-done"),
//   deleteAllTasksButton = document.querySelector(".delete-all-tasks"),
//   deleteDoneTasksButton = document.querySelector(".delete-done-tasks");

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${
//       task.id
//     }">

//       <span class="task-title ${task.done ? "task-title--done" : ""}">${
//     task.text
//   }</span>
//       <div class="task-item__buttons">

//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>

//         <button type="button" data-action="edit" class="btn-action">
//           <img src="./img/edit.svg" alt="Edit" width="18" height="18">
//         </button>

//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>

//       </div>
//     </li>`;
//   list.insertAdjacentHTML("beforeend", taskHTML);
// };

// const sortTasks = () => {
//   const activeTasks = tasks.filter((task) => !task.done);
//   const deactiveTasks = tasks.filter((task) => task.done);

//   tasks = [...activeTasks, ...deactiveTasks];
// };

// sortTasks();

// if (tasks.length) tasks.forEach(renderTask);

// const saveToLS = () => localStorage.setItem("tasks", JSON.stringify(tasks));

// const checkEmptyList = () => {
//   if (tasks.length === 0) {
//     list.insertAdjacentHTML(
//       "afterbegin",
//       `
//         <li id="emptyList" class="list-group-item empty-list">
//           <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//           <div class="empty-list__title">Список дел пуст</div>
//         </li>`
//     );
//   } else list.querySelector(".emptyList")?.remove();
// };

// const markAllDone = () => {
//   let markAsDone = true;
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAsDone = false;

//   for (let task of tasks) {
//     task.done = markAsDone;
//     const taskItem = list.querySelector(`[data-id="${task.id}"]`);
//     if (taskItem) {
//       taskItem
//         .querySelector(".task-title")
//         .classList.toggle("task-title--done", markAsDone);
//     }
//   }
//   checkAllDone();
//   saveToLS();
// };

// const checkAllDone = () => {
//   if (tasks.filter((task) => task.done).length === tasks.length)
//     markAllDone.textContent = "Снять все";
//   else markAllDoneButton.textContent = "Отметить все";
// };
// checkAllDone();

// const deleteAllTasks = () => {
//   list.innerHTML = "";
//   tasks = [];
//   checkEmptyList();
//   saveToLS();
// };

// const removeDoneTasks = () => {
//   tasks = tasks.filter((task) => !task.done);
//   list.innerHTML = "";
//   tasks.forEach((task) => renderTask(task));
//   saveToLS();
//   checkEmptyList();
// };

// const searchQuery = () => {
//   const tasksItems = list.querySelectorAll(".list-group-item");

//   tasksItems.forEach((task) => {
//     const taskTitle = task
//       .querySelector(".task-title")
//       .textContent.toLowerCase();
//     const isMatch = taskTitle.includes(searchInput.value.trim().toLowerCase());

//     if (!isMatch) task.classList.add("d-none");
//     else task.classList.remove("d-none");
//   });
// };

// const handleTaskAction = (e) => {
//   if (!e.target.matches(".btn-action")) return;
//   const parentNode = e.target.closest(".list-group-item");
//   const taskId = Number(parentNode.dataset.id);
//   const taskTitle = parentNode.querySelector(".task-title");
//   const task = tasks.find((task) => task.id === taskId);
//   if (!parentNode || !taskId || !task || !taskTitle) return;

//   if (e.target.dataset.action === "done") {
//     task.done = !task.done;
//     taskTitle.classList.toggle("task-title--done");
//     sortTasks();
//   } else if (e.target.dataset.action === "delete") {
//     tasks = tasks.filter((task) => task.id !== taskId);
//     parentNode.remove();
//     checkEmptyList();
//   } else if (e.target.dataset.action === "edit") {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = "Update Task";
//   } else {
//     return;
//   }
//   sortTasks();
//   saveToLS();
// };

// const addTask = (e) => {
//   e.preventDefault();
//   if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
//     taskInput.classList.add("error");
//     form.reset();
//     return;
//   }
//   taskInput.classList.remove("error");
//   const taskId = form.dataset.taskId;

//   if (taskId) {
//     const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
//     if (taskIndex !== -1) {
//       const taskItem = list.querySelector(
//         `.list-group-item[data-id="${taskId}"]`
//       );
//       taskItem.querySelector(".task-title").textContent =
//         taskInput.value.trim();
//       tasks[taskIndex].text = taskInput.value.trim();

//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = "Add Task";
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskInput.value.trim(),
//       done: false,
//     };

//     tasks.push(newTask);
//     renderTask(newTask);
//   }

//   form.reset();
//   taskInput.focus();

//   saveToLS();
//   checkEmptyList();
// };

// deleteDoneTasksButton.addEventListener("click", removeDoneTasks);
// markAllDoneButton.addEventListener("click", markAllDone);
// deleteAllTasksButton.addEventListener("click", deleteAllTasks);
// searchInput.addEventListener("input", searchQuery);
// list.addEventListener("click", handleTaskAction);
// form?.addEventListener("submit", addTask);
