import TodoItem from "./todoItem";

export default class DateTodoItem extends TodoItem {
  constructor(
    status: string,
    description: string,
    date: Date,
    deleteHandler: () => void
  ) {
    super(status, description, deleteHandler);

    const span = document.createElement("span");
    span.className = "date";
    span.textContent = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    this.wrapper.insertBefore(span, this.deleteButton);
  }
}
