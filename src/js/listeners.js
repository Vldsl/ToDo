document.addEventListener("DOMContentLoaded", load);
deleteAllTasksButton.addEventListener("click", deleteAllTasks);
deleteDoneTasksButton.addEventListener("click", deleteAllTasks);
markAllDoneButton.addEventListener("click", markAllDone);
markAllUndoneButton.addEventListener("click", markAllUndone);
taskSearch.addEventListener("input", searchQuery);
list.addEventListener("click", handleTaskAction);
form.addEventListener("submit", addTask);
