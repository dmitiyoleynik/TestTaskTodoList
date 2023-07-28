import DateTodoItem from "./dateTodoItem";
import InputTodoModal from "./inputTodoModal";
import TodoItem from "./todoItem";
import UrgencyTodoItem from "./urgencyTodoItem";

export class TodoList {
  items: Map<number, TodoItem>;
  wrapper: HTMLDivElement;
  todoItems: HTMLDivElement;
  addTodoButton: HTMLButtonElement;
  addTodoUrgentButton: HTMLButtonElement;
  addTodoDateButton: HTMLButtonElement;
  id: number;
  modal: InputTodoModal;

  constructor(items: TodoItem[]) {
    this.id = 0;
    this.modal = new InputTodoModal(this.addTodo);

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("todo-list");

    this.addTodoButton = document.createElement("button");
    this.addTodoUrgentButton = document.createElement("button");
    this.addTodoDateButton = document.createElement("button");
    this.addTodoButton.textContent = "Add Task";
    this.addTodoUrgentButton.textContent = "Add Urgent Task";
    this.addTodoDateButton.textContent = "Add Task with date";
    this.addTodoButton.classList.add("add-todo");
    this.addTodoUrgentButton.classList.add("add-todo");
    this.addTodoDateButton.classList.add("add-todo");
    this.addTodoButton.addEventListener("click", this.modal.readNewTodo);
    this.addTodoUrgentButton.addEventListener(
      "click",
      this.modal.readNewUrgentTodo
    );
    this.addTodoDateButton.addEventListener(
      "click",
      this.modal.readNewDateTodo
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.appendChild(this.addTodoButton);
    buttonContainer.appendChild(this.addTodoUrgentButton);
    buttonContainer.appendChild(this.addTodoDateButton);
    this.wrapper.appendChild(buttonContainer);

    this.todoItems = document.createElement("div");
    this.todoItems.classList.add("todo-list-items");
    this.wrapper.appendChild(this.todoItems);
    this.items = new Map<number, TodoItem>();
    items.forEach((item, id) => {
      this.items.set(id, item);
    });
  }

  addTodo=(status: string, description: string, urgent?: string, date?: Date) =>{
    const id = ++this.id;

    const deleteHandler = () => {
      this.todoItems.removeChild(this.items.get(id).render());
    };
    
    let todo;
    
    if (date) {
      todo = new DateTodoItem(status, description, date, deleteHandler);
    } else if (urgent) {
      todo = new UrgencyTodoItem(status, description, urgent, deleteHandler);
    } else {
      todo = new TodoItem(status, description, deleteHandler);
    }

    this.items.set(id, todo);
    this.todoItems.appendChild(todo.render());
  }

  render(): HTMLElement {
    this.items.forEach((item) => this.todoItems.appendChild(item.render()));

    return this.wrapper;
  }
}
