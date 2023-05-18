//========================================================================================================================================================

// const form = document.querySelector('#form'),
//   taskInput = document.querySelector('#taskInput'),
//   tasksList = document.querySelector('#tasksList'),
//   searchInput = document.querySelector('#searchInput'),
//   markAllDoneButton = document.querySelector('.mark-all-done'),
//   deleteAllTasksButton = document.querySelector('.delete-all-tasks'),
//   removeDoneTasksButton = document.querySelector('#remove-done-tasks');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${task.id}">

//       <span class="task-title ${task.done ? 'task-title--done' : ''}">${task.text}</span>
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
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }
// if (tasks.length > 0) tasks.forEach(task => renderTask(task));

// const saveToLS = () => localStorage.setItem('tasks', JSON.stringify(tasks));

// const checkEmptyList = () => {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li id="emptyList" class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
//   } else {
//     const emptyListEl = tasksList.querySelector('.emptylist');
//     if (emptyListEl) emptyListEl.remove();
//   }
// }

// // const markAllDone = () => {
// //   let markAsDone = true;
// //   if (tasks.filter(task => task.done === true).length === tasks.length) markAsDone = false;

// //   for (let task of tasks) {
// //     task.done = markAsDone
// //     const taskItem = tasksList.querySelector(`[data-id="${task.id}"]`);
// //     if (taskItem) {
// //       taskItem.querySelector('.task-title').classList.toggle('task-title--done', markAsDone);
// //     }
// //   };
// //   checkAllDone();
// //   saveToLS();
// // }

// // const checkAllDone = () => {
// //   if (tasks.filter(task => task.done === true).length === tasks.length) markAllDone.textContent = 'Снять все';
// //   else markAllDoneButton.textContent = 'Отметить все';
// // }
// // checkAllDone();

// // const deleteAllTasks = () => {
// //   tasksList.innerHTML = '';
// //   tasks = [];
// //   checkEmptyList();
// //   saveToLS();
// // };

// // const removeDoneTasks = () => {
// //   tasks = tasks.filter(task => !task.done);
// //   tasksList.innerHTML = '';
// //   tasks.forEach(task => renderTask(task));
// //   saveToLS();
// //   checkEmptyList();
// // };

// const searchTasks = () => {
//   const tasksItems = tasksList.querySelectorAll('.task-item');

//   tasksItems.forEach(task => {
//     const taskTitle = task.querySelector('.task-title').textContent.toLowerCase();
//     const isMatch = taskTitle.includes(searchInput.value.trim().toLowerCase())

//     if (!isMatch) {
//       task.classList.add('d-none')
//     } else {
//       task.classList.remove('d-none');
//     }
//   })
// }

// const handleTaskAction = e => {
//   const target = e.target;

//   if (!target.matches('.btn-action')) return

//   const taskItem = target.closest('.task-item');
//   if (!taskItem) return

//   const taskId = Number(taskItem.dataset.id);
//   const task = tasks.find(task => task.id === taskId);
//   if (!task) return

//   if (target.dataset.action === 'done') {
//     task.done = !task.done;
//     taskItem.querySelector('.task-title').classList.toggle('task-title--done');
//   } else if (target.dataset.action === 'delete') {
//     tasks = tasks.filter(task => task.id !== taskId)
//     taskItem.remove();
//     checkEmptyList();
//   } else if (target.dataset.action === 'edit') {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = 'Update Task';
//   }
//   saveToLS();
// }

// const addTask = e => {
//   e.preventDefault();
//   if (taskInput.value.trim().length < 1 || !isNaN(taskInput.value.trim())) {
//     taskInput.classList.add('error');
//     taskInput.value = '';
//     return;
//   }
//   taskInput.classList.remove('error');
//   const taskText = taskInput.value.trim();
//   const taskId = form.dataset.taskId;

//   if (taskId) {
//     const taskIndex = tasks.findIndex(task => task.id === Number(taskId));

//     if (taskIndex !== -1) {
//       tasks[taskIndex].text = taskText;
//       const taskItem = tasksList.querySelector(`[data-id="${taskId}"]`)
//       taskItem.querySelector('.task-title').textContent = taskText;
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = 'Add Task';
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       done: false,
//     }
//     tasks.push(newTask);
//     renderTask(newTask);
//     checkEmptyList();
//   }
//   saveToLS();
//   taskInput.value = '';
//   taskInput.focus();
//   // checkEmptyList();
// }

// // removeDoneTasksButton.addEventListener('click', removeDoneTasks);
// searchInput.addEventListener('input', searchTasks);
// // markAllDoneButton.addEventListener('click', markAllDone);
// // deleteAllTasksButton.addEventListener('click', deleteAllTasks);
// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', handleTaskAction);

// // const editText = (e, n) => { // Это немного другой код редактирования элементов, нужно решить оставлять ли его
// //   const content = e.target.closest('.todo-item').querySelector('#text'); // Находим ToDo элемент
// //   const editContent = e.target.closest('.todo-item').querySelector('#edit-text'); // Находим input для ввода нового значения. По умолчанию он скрыт
// //   content.classList.toggle('hidden'); // Показываем или прячем ToDo элемент
// //   editContent.classList.toggle('hidden'); // Показываем или прячем поле для ввода нового значения
// //   editContent.value = content.innerText; // Передать значени из элемента в поле изменения
// //   editContent.addEventListener('input', () => content.innerText = editContent.value); // При нажатии на кнопку Edit передает новое значение в текст todo элемента
// //   checkList[n].todo = editContent.value; // Изменение текста в массиве
// //   localStorage.setItem('checkList', JSON.stringify(checkList));
// //   editContent.focus();
// // }

//========================================================================================================================================================

// const form = document.querySelector('#form'),
//   taskInput = document.querySelector('#taskInput'),
//   tasksList = document.querySelector('#tasksList'),
//   markAllDoneButton = document.querySelector('.mark-all-done'),
//   deleteAllTasksButton = document.querySelector('.delete-all-tasks'),
//   searchInput = document.querySelector('#searchInput');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// const saveToLS = () => localStorage.setItem('tasks', JSON.stringify(tasks));

// const checkEmptyList = () => {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
//   } else {
//     const emptyListEl = tasksList.querySelector('.empty-list');
//     if (emptyListEl) emptyListEl.remove();
//   }
// }
// checkEmptyList();

// const renderTask = (task) => {
// const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${task.id}">

//       <span class="task-title ${task.done ? 'task-title--done' : ''}">${task.text}</span>
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
//     </li>
//   `;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }
// if (tasks.length > 0) tasks.forEach(task => renderTask(task));

// const handleTaskAction = (e) => {
//   const target = e.target;
//   if (!target.matches('.btn-action')) return

//   const taskItem = target.closest('.task-item');
//   if (!taskItem) return

//   const taskId = Number(taskItem.dataset.id);
//   const task = tasks.find(task => task.id === taskId);
//   if (!task) return

//   if (target.dataset.action === 'done') {
//     task.done = !task.done;
//     taskItem.querySelector('.task-title').classList.toggle('task-title--done');
//   } else if (target.dataset.action === 'delete') {
//     tasks = tasks.filter(task => task.id !== taskId)
//     taskItem.remove();
//     checkEmptyList();
//   } else if (target.dataset.action === 'edit') {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = 'Update Task';
//   }
//   saveToLS();
// }

// const addTask = (e) => {
//   e.preventDefault();
//   if (taskInput.value.trim() === '' || !isNaN(taskInput.value)) {
//     taskInput.classList.add('error');
//     taskInput.value = '';
//     return;
//   }

//   taskInput.classList.remove('error');

//   const taskText = taskInput.value.trim();
//   const taskId = form.dataset.taskId;

//   if (taskId) {
//     const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));

//     if (taskIndex !== -1) {
//       tasks[taskIndex].text = taskText;
//       const taskItem = tasksList.querySelector(`[data-id="${taskId}"]`);
//       taskItem.querySelector('.task-title').textContent = taskText;
//       taskItem.classList.remove('task-item--editing');
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = 'Add Task';
//     }
//   } else {
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       done: false,
//     };
//     tasks.push(newTask);
//     renderTask(newTask);
//     checkEmptyList();
//   }
//   saveToLS();
//   taskInput.value = '';
//   taskInput.focus();
//   checkEmptyList();
// };

// const updateButton = form.querySelector('button[type="submit"]');
// updateButton.addEventListener('click', (e) => {
//   if (form.hasAttribute('data-task-id')) {
//     addTask(e);
//   }
// });

// const checkAllDone = () => {
//   if (tasks.filter(task => task.done === true).length === tasks.length) markAllDoneButton.textContent = 'Снять все'
//   else markAllDoneButton.textContent = 'Отметить все'
// }
// checkAllDone();

// const markAllDone = () => {
//   let markAsDone = true;
//   if (tasks.filter(task => task.done === true).length === tasks.length) markAsDone = false;

//   tasks.forEach((task) => {
//     task.done = markAsDone;
//     const taskItem = tasksList.querySelector(`[data-id="${task.id}"]`);
//     if (taskItem) {
//       taskItem.querySelector('.task-title').classList.toggle('task-title--done', markAsDone);
//     }
//   });
//   checkAllDone();
//   saveToLS();
// };

// const deleteAllTasks = () => {
//   tasksList.innerHTML = '';
//   tasks = [];
//   checkEmptyList();
//   saveToLS();
// };

// const searchTasks = (searchQuery) => {
//                                                                                    // Получаем список всех задач
//   const tasks = document.querySelectorAll('.task-item');

//                                                                                    // Проходимся по каждой задаче и проверяем соответствие поисковому запросу
//   tasks.forEach((task) => {
//     const title = task.querySelector('.task-title').textContent.toLowerCase();
//     const isMatch = title.includes(searchQuery.toLowerCase());

//                                                                                    // Скрываем задачи, которые не соответствуют поисковому запросу
//     if (!isMatch) {
//       task.classList.add('d-none');
//     } else {
//       task.classList.remove('d-none');
//     }
//   });
// };

//                                                                                     // Добавляем обработчик события input на текстовое поле поиска
// searchInput.addEventListener('input', (event) => {
//   const searchQuery = event.target.value.trim();
//   searchTasks(searchQuery);
// });

// markAllDoneButton.addEventListener('click', markAllDone);
// deleteAllTasksButton.addEventListener('click', deleteAllTasks);
// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', handleTaskAction);

//========================================================================================================================================================

// Находим элементы формы и списка задач в DOM
// const form = document.querySelector('#form'), // выбираем форму
//       taskInput = document.querySelector('#taskInput'), // выбираем поле ввода
//       tasksList = document.querySelector('#tasksList'); // выбираем список задач

// // Загружаем список задач из localStorage
// let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // получаем задачи из localStorage или создаём пустой массив

// // Функция для сохранения списка задач в localStorage
// const saveToLS = () => localStorage.setItem('tasks', JSON.stringify(tasks)); // сохраняем задачи в localStorage

// // Функция для проверки списка задач на пустоту и отображения соответствующего сообщения
// const checkEmptyList = () => { // проверяем, есть ли задачи в списке
//   if (tasks.length === 0) { // если список пуст
//     const emptyListHTML = `
//       <li class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML); // вставляем сообщение о пустом списке
//   } else { // если в списке есть задачи
//     const emptyListEl = tasksList.querySelector('.empty-list');
//     if (emptyListEl) emptyListEl.remove(); // удаляем сообщение о пустом списке
//   }
// }

// // Проверяем список задач на пустоту и отображаем соответствующее сообщение при загрузке страницы
// checkEmptyList(); // проверяем список на пустоту

// // Функция-обработчик событий для кнопок редактирования/удаления задачи
// const handleTaskAction = (event) => { // обработчик для кнопок задач
//   const target = event.target; // получаем цель (кнопку, на которую нажали)
//   if (!target.matches('.btn-action')) return; // если цель не является кнопкой - выходим

//   const taskItem = target.closest('.task-item'); // получаем ближайшую задачу к кнопке

//   if (!taskItem) return; // если задача не найдена - выходим

//   const taskId = Number(taskItem.dataset.id); // получаем ID задачи
//   const task = tasks.find(task => task.id === taskId); // получаем объект задачи по ID

//   if (!task) return; // если задача не найдена - выходим

//   if (target.dataset.action === 'done') { // если нажата кнопка "Выполнено"
//     task.done = !task.done; // меняем статус задачи
//     taskItem.querySelector('.task-title').classList.toggle('task-title--done'); // меняем классы задачи, чтобы обозначить выполненную задачу
//   } else if (target.dataset.action === 'delete') { // если нажата кнопка "Удалить"
//     tasks = tasks.filter(task => task.id !== taskId); // удаляем задачу из массива задач
//     taskItem.remove(); // удаляем задачу из списка
//     checkEmptyList(); // проверяем список на пустоту
//   } else if (target.dataset.action === 'edit') { // если нажата кнопка "Редактировать"
//     taskInput.value = task.text; // устанавливаем текст задачи в поле ввода
//     taskInput.focus()
//     form.dataset.taskId = taskId; // устанавливаем ID задачи в атрибут формы
//     form.querySelector('button[type="submit"]').textContent = 'Update Task'; // изменяем текст кнопки

//   }
//   saveToLS();
// }

// // Функция для отрисовки задачи в списке
// const renderTask = (task) => {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${task.id}">

//       <span class="task-title ${task.done ? 'task-title--done' : ''}">${task.text}</span>
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
//     </li>
//   `;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

// if (tasks.length > 0) tasks.forEach(el => renderTask(el));

// const addTask = (e) => {
//   e.preventDefault();

//   if (taskInput.value.trim() === '' || !isNaN(taskInput.value)) {
//     taskInput.classList.add('error');
//     taskInput.value = '';
//     return;
//   }

//   taskInput.classList.remove('error');

//   const taskText = taskInput.value.trim();
//   const taskId = form.dataset.taskId;

//   if (taskId) {
//     // Edit mode
//     const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));

//     if (taskIndex !== -1) {
//       tasks[taskIndex].text = taskText;
//       const taskItem = tasksList.querySelector(`[data-id="${taskId}"]`);
//       taskItem.querySelector('.task-title').textContent = taskText;
//       taskItem.classList.remove('task-item--editing');
//       delete form.dataset.taskId;
//       form.querySelector('button[type="submit"]').textContent = 'Add Task';
//     }
//   } else {
//     // Add mode
//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       done: false,
//     };

//     tasks.push(newTask);
//     renderTask(newTask);
//     checkEmptyList();
//   }

//   saveToLS();

//   taskInput.value = '';
//   taskInput.focus();

//   checkEmptyList();
// };

// Add event listener for clicking "Update Task" button in edit mode
// const updateButton = form.querySelector('button[type="submit"]');
// updateButton.addEventListener('click', (e) => {
//   if (form.hasAttribute('data-task-id')) {
//     addTask(e);
//   }
// });

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', handleTaskAction);

//========================================================================================================================================================

// const form = document.querySelector('#form');
// const taskInput = document.querySelector('#taskInput');
// const tasksList = document.querySelector('#tasksList');
// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// if (tasks.length > 0) {
//   tasks.forEach(task => renderTask(task));
// }
// checkEmptyList();

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', handleTaskAction);

// function addTask(event) {
//   event.preventDefault();
//   if (taskInput.value.trim() === '') {
//     taskInput.classList.add('error');
//     return;
//   }
//   taskInput.classList.remove('error');
//   const newTask = {
//     id: Date.now(),
//     text: taskInput.value.trim(),
//     done: false
//   };
//   tasks.push(newTask);
//   saveToLS();
//   renderTask(newTask);
//   taskInput.value = '';
//   taskInput.focus();
//   checkEmptyList();
// }

// function handleTaskAction(event) {
//   const target = event.target;
//   if (!target.matches('.btn-action')) return;

//   const taskItem = target.closest('.task-item');

//   if (!taskItem) return;

//   const taskId = Number(taskItem.dataset.id);
//   const task = tasks.find(task => task.id === taskId);

//   if (!task) return;

//   if (target.dataset.action === 'done') {
//     task.done = !task.done;
//     taskItem.querySelector('.task-title').classList.toggle('task-title--done');
//   } else if (target.dataset.action === 'delete') {
//     tasks = tasks.filter(task => task.id !== taskId);
//     taskItem.remove();
//     checkEmptyList();
//   }

//   saveToLS();
// }

// function renderTask(task) {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${task.id}">
//       <span class="task-title ${task.done ? 'task-title--done' : ''}">${task.text}</span>
//       <div class="task-item__buttons">
//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>
//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>
//       </div>
//     </li>
//   `;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

// function checkEmptyList() {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
//   } else {
//     const emptyListEl = tasksList.querySelector('.empty-list');
//     if (emptyListEl) emptyListEl.remove();
//   }
// }

// function saveToLS() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

//========================================================================================================================================================

// const form = document.querySelector('#form'),
//       taskInput = document.querySelector('#taskInput'),
//       tasksList = document.querySelector('#tasksList');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// if (tasks.length > 0) tasks.forEach(el => renderTask(el));

// checkEmptyList()

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', deleteTask);
// tasksList.addEventListener('click', doneTask);

// function addTask(e) {
//   e.preventDefault();
//   if (taskInput.value.trim() === '' || !isNaN(taskInput.value)) {
//     taskInput.classList.add('error')
//     return;
//   }
//   taskInput.classList.remove('error');

//   const newTask = {
//     id: Date.now(),
//     text: taskInput.value.trim(),
//     done: false,
//   }

//   tasks.push(newTask);
//   saveToLS();
//   renderTask(newTask);

//   taskInput.value = '';
//   taskInput.focus();

//   checkEmptyList()
// }

// function deleteTask(e) {
//   if (e.target.dataset.action !== 'delete') return

//   const parentNode = e.target.closest('.list-group-item');
//   const id = Number(parentNode.id);

//   tasks = tasks.filter((task) => task.id !== id);

//   saveToLS();
//   parentNode.remove();

//   checkEmptyList()
// }

// function doneTask(e) {
//   if (e.target.dataset.action !== 'done') return

//   const parentNode = e.target.closest('.list-group-item')
//   const id = Number(parentNode.id);
//   console.log(id)

//   const task = tasks.find(task => task.id === id)
//   console.log(task)
//   task.done = !task.done;

//   saveToLS()

//   const taskTitle = parentNode.querySelector('.task-title');
//   taskTitle.classList.toggle('task-title--done');
// }

// function checkEmptyList() {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
//   } else {
//     const emptyListEl = tasksList.querySelector('.empty-list');
//     if (emptyListEl) emptyListEl.remove();
//   }
// }

// function saveToLS() {
//   localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// function renderTask(task) {
//   const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item" data-id="${task.id}">
//       <span class="task-title ${task.done ? 'task-title--done' : ''}">${task.text}</span>
//       <div class="task-item__buttons">
//         <button type="button" data-action="done" class="btn-action">
//           <img src="./img/tick.svg" alt="Done" width="18" height="18">
//         </button>
//         <button type="button" data-action="delete" class="btn-action">
//           <img src="./img/cross.svg" alt="Delete" width="18" height="18">
//         </button>
//       </div>
//     </li>
//   `;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

//========================================================================================================================================================

// const taskInput = document.querySelector('#taskInput'),
//   tasksList = document.querySelector('#tasksList'),
//   form = document.querySelector('#form');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// if (tasks.length > 0) tasks.forEach(task => renderTask(task));
// checkEmptyList();

// form.addEventListener('submit', addTask);
// if (tasks.length > 0) {
//   tasksList.addEventListener('click', deleteTask);
//   tasksList.addEventListener('click', doneTask);
// }

// function addTask(e) {
//   e.preventDefault();
//   const taskText = taskInput.value;
//   if (taskText.length < 1 || !isNaN(taskText)) {
//     taskInput.classList.add('error');
//   } else {
//     taskInput.classList.remove('error');

//     const task = {
//       id: Date.now(),
//       text: taskText,
//       done: false,
//     }

//     tasks.push(task);
//     saveToLS();
//     renderTask(task);

//     taskInput.value = '';
//     taskInput.focus();

//     checkEmptyList();
//   }
// }

// function deleteTask(e) {
//   if (e.target.dataset.action !== 'delete') return
//   const parentNode = e.target.closest('.list-group-item');
//   const id = Number(parentNode.id);
//   tasks = tasks.filter(task => task.id !== id);
//   saveToLS();
//   parentNode.remove();
//   checkEmptyList();
// }

// function doneTask(e) {
//   if (e.target.dataset.action !== 'done') return
//   const parentNode = e.target.closest('.list-group-item')
//   const id = Number(parentNode.id);
//   const task = tasks.find(task => task.id === id)
//   task.done = !task.done;
//   saveToLS();
//   const taskTitle = parentNode.querySelector('.task-title');
//   taskTitle.classList.toggle('task-title--done');
// }

// function renderTask(task) {
//   const cssClass = task.done ? 'task-title--done' : 'task-title';
//   const taskHTML = `
//   <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
// 		<span class="${cssClass}">${task.text}</span>
// 		<div class="task-item__buttons">
// 			<button type="button" data-action="done" class="btn-action">
// 				<img src="./img/tick.svg" alt="Done" width="18" height="18">
// 			</button>
// 			<button type="button" data-action="delete" class="btn-action">
// 				<img src="./img/cross.svg" alt="Done" width="18" height="18">
// 			</button>
// 		</div>
// 	</li>`;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

// function saveToLS() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function checkEmptyList() {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li id="emptyList" class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
//   }
//   if (tasks.length > 0) {
//     const emptyListEl = document.querySelector('#emptyList');
//     emptyListEl ? emptyListEl.remove() : null;
//   }
// }

//========================================================================================================================================================

// const form = document.querySelector('#form'),
//   taskInput = document.querySelector('#taskInput'),
//   tasksList = document.querySelector('#tasksList');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// if (tasks.length > 0) tasks.forEach(task => renderTask(task));
// checkEmptyList();

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', deleteTask)
// tasksList.addEventListener('click', doneTask)

// // Функции
// function addTask(e) {
//   e.preventDefault();
//   if (taskInput.value < 1 || !isNaN(taskInput.value)) {
//     taskInput.classList.add('error');
//   } else {
//     taskInput.classList.remove('error')

//     const taskText = taskInput.value;

//     const newTask = {
//       id: Date.now(),
//       text: taskText,
//       done: false,
//     }

//     tasks.push(newTask);
//     saveToLS();
//     renderTask(newTask);

//     taskInput.value = '';
//     taskInput.focus();

//     checkEmptyList();
//   }
// };

// function deleteTask(e) {
//   if (e.target.dataset.action !== 'delete') return

//   const parentNode = e.target.closest('.list-group-item');
//   const id = Number(parentNode.id);
//   // const index = tasks.findIndex(task => task.id === id);
//   // tasks.splice(index, 1);

//   // Удаление задачи через фильтрацию массива
//   tasks = tasks.filter(task => task.id !== id);

//   saveToLS();
//   parentNode.remove();
//   checkEmptyList();
// };

// function doneTask(e) {
//   if (e.target.dataset.action !== 'done') return

//   const parentNode = e.target.closest('.list-group-item');

//   const id = Number(parentNode.id);
//   const task = tasks.find(task => task.id === id);
//   task.done = !task.done;

//   saveToLS();

//   const taskTitle = parentNode.querySelector('.task-title');
//   taskTitle.classList.toggle('task-title--done');
// };

// function checkEmptyList() {
//   if (tasks.length === 0) {
//     const emptyListHTML = `
//       <li id="emptyList" class="list-group-item empty-list">
//         <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//         <div class="empty-list__title">Список дел пуст</div>
//       </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
//   }

//   if (tasks.length > 0) {
//     const emptyListEl = document.querySelector('#emptyList');
//     emptyListEl ? emptyListEl.remove() : null;
//   }
// };

// function saveToLS() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function renderTask(task) {
//   const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

//   const taskHTML = `
//       <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
// 		  	<span class="${cssClass}">${task.text}</span>
// 		  	<div class="task-item__buttons">
// 		  		<button type="button" data-action="done" class="btn-action">
// 		  			<img src="./img/tick.svg" alt="Done" width="18" height="18">
// 		  		</button>
// 		  		<button type="button" data-action="delete" class="btn-action">
// 		  			<img src="./img/cross.svg" alt="Done" width="18" height="18">
// 		  		</button>
// 		  	</div>
// 		  </li>
//     `;
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

//========================================================================================================================================================

// Находим элементы на странице
// const form = document.querySelector('#form');
// const taskInput = document.querySelector('#taskInput');
// const tasksList = document.querySelector('#tasksList');
// const emptyList = document.querySelector('#emptyList');

// let tasks = [];

// if (localStorage.getItem('tasks')) {
//   tasks = JSON.parse(localStorage.getItem('tasks'));
//   tasks.forEach((task) => renderTask(task));
// }

// checkEmptyList();

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', deleteTask);
// tasksList.addEventListener('click', doneTask);

// // Функции
// function addTask(event) {
//   // Отменяем отправку формы
//   event.preventDefault();

//   // Достаем текст задачи из поля ввода
//   const taskText = taskInput.value;

//   // Описываем задачу в виде объекта
//   const newTask = {
//     id: Date.now(),
//     text: taskText,
//     done: false,
//   };

//   // Добавляем задачу в массив с задачами
//   tasks.push(newTask);

//   // Сохраняем список задач в хранилище браузера localStorage
//   saveToLS();

//   // Рендерим задачу на странице
//   renderTask(newTask);

//   // Очищаем поле ввода и возвращаем на него фокус
//   taskInput.value = '';
//   taskInput.focus();

//   checkEmptyList();
// }

// function deleteTask(event) {
//   // Проверяем если клик был НЕ по кнопке "удалить задачу"
//   if (event.target.dataset.action !== 'delete') return;

//   const parentNode = event.target.closest('.list-group-item');

//   // Определяем ID задачи
//   const id = Number(parentNode.id);

//   // Удаляем задча через фильтрацию массива
//   tasks = tasks.filter((task) => task.id !== id);

//   // Сохраняем список задач в хранилище браузера localStorage
//   saveToLS();

//   // Удаляем задачу из разметки
//   parentNode.remove();

//   checkEmptyList();
// }

// function doneTask(event) {
//   // Проверяем что клик был НЕ по кнопке "задача выполнена"
//   if (event.target.dataset.action !== 'done') return;

//   const parentNode = event.target.closest('.list-group-item');

//   // Определяем ID задачи
//   const id = Number(parentNode.id);
//   const task = tasks.find((task) => task.id === id);
//   task.done = !task.done;

//   // Сохраняем список задач в хранилище браузера localStorage
//   saveToLS();

//   const taskTitle = parentNode.querySelector('.task-title');
//   taskTitle.classList.toggle('task-title--done');
// }

// function checkEmptyList() {
//   if (tasks.length === 0) {
//     const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
//           <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
//           <div class="empty-list__title">Список дел пуст</div>
//         </li>`;
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
//   }

//   if (tasks.length > 0) {
//     const emptyListEl = document.querySelector('#emptyList');
//     emptyListEl ? emptyListEl.remove() : null;
//   }
// }

// function saveToLS() {
//   localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// function renderTask(task) {
//   // Формируем CSS класс
//   const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

//   // Формируем разметку для новой задачи
//   const taskHTML = `
//                 <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
//           <span class="${cssClass}">${task.text}</span>
//           <div class="task-item__buttons">
//             <button type="button" data-action="done" class="btn-action">
//               <img src="./img/tick.svg" alt="Done" width="18" height="18">
//             </button>
//             <button type="button" data-action="delete" class="btn-action">
//               <img src="./img/cross.svg" alt="Done" width="18" height="18">
//             </button>
//           </div>
//         </li>`;

//   // Добавляем задачу на страницу
//   tasksList.insertAdjacentHTML('beforeend', taskHTML);
// }

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
//   const itemsHTML = tasks
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
//   list.insertAdjacentHTML("afterbegin", itemsHTML);
// };

// const checkEmptyList = () => {
//   list.querySelector("#emptyList")?.remove();
//   if (!tasks.length)
//     list.innerHTML = `
// 		  <li id="emptyList" class="empty-list">
// 		    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
// 		    <div class="empty-list__title">Список дел пуст</div>
// 		  </li>
// 		`;
// };

// const searchQuery = () => {
//   const query = taskSearch.value.trim().toLowerCase();
//   const listTasks = list.querySelectorAll(".list-group-item");
//   listTasks.forEach((task) => task.classList.add("d-none"));
//   listTasks.forEach((task) => {
//     const taskTitle = task
//       .querySelector(".task-title")
//       .textContent.trim()
//       .toLowerCase();
//     if (taskTitle.includes(query)) task.classList.remove("d-none");
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
//     renderList();
//   } else if (e.target.dataset.action === "delete") {
//     tasks = tasks.filter((task) => task.id !== taskId);
//     parentNode.remove();
//     saveToLS();
//     checkEmptyList();
//   } else if (e.target.dataset.action === "edit") {
//     taskInput.value = task.text;
//     taskInput.focus();
//     form.dataset.taskId = taskId;
//     form.querySelector('button[type="submit"]').textContent = "Update task";
//   } else return;
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
//   }
//   saveToLS();
//   form.reset();
//   taskInput.focus();
// };

// const load = () => {
//   if (tasks.length) renderList();
//   else checkEmptyList();
// };

// const saveToLS = () => {
//   loader.style.display = "block";
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   loader.style.display = "none";
// };

// const sortTasks = () => tasks.sort((a, b) => a.done - b.done);

// window.addEventListener("load", load);
// taskSearch.addEventListener("input", searchQuery);
// list.addEventListener("click", handleTaskAction);
// form.addEventListener("submit", addTask);
