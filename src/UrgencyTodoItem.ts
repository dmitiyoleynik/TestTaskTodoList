import TodoItem from "./todoItem";

export default class UrgencyTodoItem extends TodoItem {
  constructor(
    status: string,
    description: string,
    urgency: string,
    deleteHandler: () => void
  ) {
    super(status, description, deleteHandler);

    const span = document.createElement("span");
    span.className = "urgency";
    span.textContent = urgency;

    this.wrapper.insertBefore(span, this.deleteButton);
  }
}
