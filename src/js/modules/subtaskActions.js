import { renderSubtask } from "./render.js";

import { saveToLS } from "./utils";
import { loader, tasks } from "./variables.js";

export const handleAddSubtask = (parentNode, task) => {
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
  const subtaskInput = formAddSubtask?.querySelector(".subtask-input");
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
    renderSubtask(newSubtask, parentNode);

    formAddSubtask.remove();
    saveToLS(loader, tasks);
  });
};

export const handleSubtaskAction = (e, task) => {
  const { target } = e;
  const subParendNode = target.closest(".subtask-item");
  const subtaskId = +subParendNode?.dataset?.id;
  const subtask = task.subtasks.find(({ id }) => id === subtaskId);
  const subtaskIndex = task.subtasks.findIndex(({ id }) => id === subtaskId);

  if (!subParendNode || isNaN(subtaskId) || !subtask) return;

  if (target.dataset.action === "done-subtask") {
    const subtaskTitle = subParendNode.querySelector(".subtask-title");
    subtask.done = !subtask.done;
    subtaskTitle.classList.toggle("subtask-title--done");
  } else if (target.dataset.action === "delete-subtask") {
    if (subtaskIndex !== -1) {
      task.subtasks.splice(subtaskIndex, 1);
      subParendNode.remove();
    }
  }

  saveToLS(loader, tasks);
};
