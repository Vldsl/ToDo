export const renderSubtask = (newSubtask, parentNode) => {
  const subtaskHTML = `
	<li class="d-flex justify-content-between subtask-item list-group-item" data-id="${newSubtask.id}">
	<span class="subtask-title">${newSubtask.text}</span>
	<div class="subtask-item__buttons">
			<button type="button" data-action="done-subtask" class="btn btn-action">
					<img src="./img/tick.svg" alt="Done" width="18" height="18">
			</button>
			<button type="button" data-action="edit-subtask" class="btn btn-action">
					<img src="./img/edit.svg" alt="Edit" width="18" height="18">
			</button>
			<button type="button" data-action="delete-subtask" class="btn btn-action">
					<img src="./img/cross.svg" alt="Delete" width="18" height="18">
			</button>
	</div>
</li>
`;
  parentNode
    .querySelector(".subtasks")
    .insertAdjacentHTML("beforeend", subtaskHTML);
};

export const renderList = (tasks) => {
  list.innerHTML = tasks
    .map(
      (task) => `
			<li class="list-group-item d-flex justify-content-between flex-column task-item" data-id="${
        task.id
      }">
			<div class="d-flex justify-content-between">
					<span class="task-title ${task.done ? "task-title--done" : ""}">${
        task.text
      }</span>
					<div class="task-item__buttons">
							<button type="button" data-action="addSubtask" class="btn btn-action">
									<img src="./img/plus.svg" alt="Add Subtask" width="18" height="18">
							</button>
							<button type="button" data-action="done" class="btn btn-action">
									<img src="./img/tick.svg" alt="Done" width="18" height="18">
							</button>
							<button type="button" data-action="edit" class="btn btn-action">
									<img src="./img/edit.svg" alt="Edit" width="18" height="18">
							</button>
							<button type="button" data-action="delete" class="btn btn-action">
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
														<button type="button" data-action="done-subtask" class="btn btn-action">
																<img src="./img/tick.svg" alt="Done" width="18" height="18">
														</button>
														<button type="button" data-action="edit-subtask" class="btn btn-action">
																<img src="./img/edit.svg" alt="Edit" width="18" height="18">
														</button>
														<button type="button" data-action="delete-subtask" class="btn btn-action">
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
};
