export default class InputTodoModal {
  dialog: HTMLDialogElement;
  closeButton: HTMLButtonElement;
  input: HTMLInputElement;
  select: HTMLSelectElement;
  urgencyInput: HTMLSelectElement;
  dateInput: HTMLInputElement;

  closeHandler: (
    status: string,
    description: string,
    urgent?: string,
    date?: Date
  ) => void;

  constructor(
    closeHandler: (
      status: string,
      description: string,
      urgent?: string,
      date?: Date
    ) => void
  ) {
    this.closeHandler = closeHandler;
    const main = document.querySelector("main");

    this.dialog = document.createElement("dialog");
    this.dialog.className = "todo-dialog";

    this.dateInput = document.createElement("input");
    this.urgencyInput = document.createElement("select");
    this.dateInput.type = "date";
    this.input = document.createElement("input");
    this.select = document.createElement("select");
    this.closeButton = document.createElement("button");
    this.closeButton.textContent = "Add Todo";

    ["Urgent", "Not Urgent"].forEach((status) => {
      const option = document.createElement("option");
      option.text = status;
      option.value = status;
      this.urgencyInput.appendChild(option);
    });

    this.dialog.appendChild(this.input);
    this.dialog.appendChild(this.select);
    this.dialog.appendChild(this.dateInput);
    this.dialog.appendChild(this.urgencyInput);
    this.dialog.appendChild(this.closeButton);

    ["Planed", "In Progress", "Done"].forEach((status) => {
      const option = document.createElement("option");
      option.text = status;
      option.value = status;
      this.select.appendChild(option);
    });

    main.appendChild(this.dialog);

  }

  handleAddTodo = (e: Event) => {
    e.preventDefault();

    const status = this.select.value;
    const description = this.input.value;

    this.closeHandler(status, description);

    this.dialog.close();
  };

  handleAddUrgentTodo = (e: Event) => {
    e.preventDefault();

    const status = this.select.value;
    const description = this.input.value;
    const urgency = this.urgencyInput.value;

    this.closeHandler(status, description, urgency);

    this.dialog.close();
  };

  handleAddDateTodo = (e: Event) => {
    e.preventDefault();

    const status = this.select.value;
    const description = this.input.value;
    const date = this.dateInput.value;
    this.closeHandler(status, description, date);

    this.dialog.close();
  };

  cleanAllEventListeners = () => {
    this.closeButton.removeEventListener("click", this.handleAddTodo);
    this.closeButton.removeEventListener("click", this.handleAddUrgentTodo);
    this.closeButton.removeEventListener("click", this.handleAddDateTodo);
  };

  readNewTodo=()=> {
    this.cleanAllEventListeners();
    this.input.value = "";
    this.select.value = "Planed";
    this.urgencyInput.className = "vanish";
    this.dateInput.className = "vanish";
    this.closeButton.addEventListener("click", this.handleAddTodo);
    this.dialog.showModal();
  }

  readNewUrgentTodo=()=> {
    this.cleanAllEventListeners();
    this.urgencyInput.className = "";
    this.dateInput.className = "vanish";
    this.input.value = "";
    this.select.value = "Planed";
    this.closeButton.addEventListener("click", this.handleAddUrgentTodo);
    this.dialog.showModal();
  }

  readNewDateTodo =() =>{
    this.cleanAllEventListeners();
    this.urgencyInput.className = "vanish";
    this.dateInput.className = "";
    this.input.value = "";
    this.select.value = "Planed";
    this.closeButton.addEventListener("click", this.handleAddDateTodo);
    this.dialog.showModal();
  }
}
