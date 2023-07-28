export default class TodoItem {
  status: string;
  description: string;
  wrapper: HTMLDivElement;
  input: HTMLInputElement;
  select: HTMLSelectElement;
  deleteButton: HTMLButtonElement;

  constructor(status: string, description: string, deleteHandler: () => void) {
    this.description = description;
    this.status = status;

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("todo-item");
    this.input = document.createElement("input");
    this.select = document.createElement("select");
    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("todo-item-delete-button");
    this.deleteButton.textContent = "Delete";
    this.deleteButton.addEventListener("click", deleteHandler);

    ["Planed", "In Progress", "Done"].forEach((status) => {
      const option = document.createElement("option");
      option.text = status;
      option.value = status;
      this.select.appendChild(option);
    });

    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(this.select);
    this.wrapper.appendChild(this.deleteButton);

    this.input.addEventListener("input", this.onInput);
    this.select.addEventListener("change", this.onSelect);
  }

  getStatusClass() {
    switch (this.status) {
      case "Planed":
        return "status-planed";
      case "Done":
        return "status-done";
      case "In Progress":
        return "status-in-progress";
      default:
        return "status-default";
    }
  }

  changeStatusColor() {
    this.wrapper.classList.remove(
      "status-planed",
      "status-done",
      "status-in-progress"
    );

    this.wrapper.classList.add(this.getStatusClass());
  }

  onSelect=(e: Event)=> {
    const selectedValue = (e.target as HTMLSelectElement).value;
    this.status = selectedValue;
    this.changeStatusColor();
  }

  onInput=(e: Event)=> {
    const inputValue = (e.target as HTMLInputElement).value;
    this.description = inputValue;
  }

  render(): HTMLElement {
    this.input.value = this.description;
    this.select.value = this.status;
    this.changeStatusColor();

    return this.wrapper;
  }
}
