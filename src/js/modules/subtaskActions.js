import { renderSubtask } from "./render.js";

import { tasks } from "./variables";
import { saveToLS } from "./utils";

export const handleAddSubtask = (e, parentNode, task) => {
  parentNode.querySelector(".subtasks").insertAdjacentHTML(
    "beforeend",
    `
		<form class="form-add-subtask">
    <input class="subtask-input form-control" type="text">
    <button class="btn btn-primary" type="submit">Add Subtask</button>
</form>
`
  );
  const formAddSubtask = parentNode.querySelector(".form-add-subtask");
  const subtaskInput = formAddSubtask.querySelector(".subtask-input");
  subtaskInput.focus();

  formAddSubtask?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      subtaskInput.value.trim().length < 1 ||
      !isNaN(subtaskInput.value.trim())
    ) {
      formAddSubtask.remove();
      return;
    }

    const newSubtask = {
      id: Date.now(),
      text: subtaskInput.value.trim(),
      done: false,
    };
    task.subtasks.push(newSubtask);

    // parentNode.querySelector(".subtasks").insertAdjacentHTML(
    //   "beforeend",
    //   `<li class="d-flex justify-content-between subtask-item list-group-item" data-id="${
    //     newSubtask.id
    //   }">

    // 			<span class="subtask-title">${subtaskInput.value.trim()}
    // 			</span>
    // 			<div class="subtask-item__buttons">

    // 				<button type="button" data-action="done-subtask" class="btn-action">
    // 					<img src="./img/tick.svg" alt="Done" width="18" height="18">
    // 				</button>

    // 				<button type="button" data-action="edit-subtask" class="btn-action">
    // 					<img src="./img/edit.svg" alt="Edit" width="18" height="18">
    // 				</button>

    // 				<button type="button" data-action="delete-subtask" class="btn-action">
    // 					<img src="./img/cross.svg" alt="Delete" width="18" height="18">
    // 				</button>

    // 			</div>
    // 		</li>`
    // );

    renderSubtask(newSubtask, parentNode);

    formAddSubtask.remove();
    saveToLS(tasks);
  });
};

export const handleSubtaskAction = (e, task) => {
  const subParendNode = e.target.closest(".subtask-item");
  const subtaskId = Number(subParendNode?.dataset?.id);
  const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);

  if (!subParendNode || isNaN(subtaskId) || !subtask) return;

  if (e.target.dataset.action === "done-subtask") {
    const subtaskTitle = subParendNode.querySelector(".subtask-title");
    subtask.done = !subtask.done;
    subtaskTitle.classList.toggle("subtask-title--done");
  } else if (e.target.dataset.action === "delete-subtask") {
    const subtaskIndex = task.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId
    );
    if (subtaskIndex !== -1) {
      task.subtasks.splice(subtaskIndex, 1);
      subParendNode.remove();
    }
  }

  saveToLS(tasks);
};
