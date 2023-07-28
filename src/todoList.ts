import DateTodoItem from "./DateTodoItem";
import TodoItem from "./todoItem";

export class TodoList {
  items: Map<number, TodoItem>;
  wrapper: HTMLDivElement;
  todoItems: HTMLDivElement;
  addTodoButton: HTMLButtonElement;
  id: number;

  constructor(items: TodoItem[]) {
    this.id = 0;
    this.addTodo = this.addTodo.bind(this);

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("todo-list");

    this.addTodoButton = document.createElement("button");
    this.addTodoButton.textContent = "Add Task";
    this.addTodoButton.classList.add("add-todo");
    this.addTodoButton.addEventListener("click", this.addTodo);

    this.wrapper.appendChild(this.addTodoButton);

    this.todoItems = document.createElement("div");
    this.todoItems.classList.add("todo-list-items");
    this.wrapper.appendChild(this.todoItems);
    this.items = new Map<number, TodoItem>();
    items.forEach((item, id) => {
      this.items.set(id, item);
    });
  }

  addTodo() {
    const id = ++this.id;

    const deleteHandler = () => {
      this.todoItems.removeChild(this.items.get(id).render());
    };

    const todo = new DateTodoItem("Planed", "", new Date(), deleteHandler);
    this.items.set(id, todo);
    this.todoItems.appendChild(todo.render());
  }

  render(): HTMLElement {
    this.items.forEach((item) => this.todoItems.appendChild(item.render()));

    return this.wrapper;
  }
}
