require("./index.css");
import { TodoList } from "./todoList";

function init() {
  const main = document.querySelector("main");
  // const todoItems = [
  //   new TodoItem("In Progress", "Some description"),
  //   new TodoItem("Done", "Some description"),
  //   new TodoItem("In Progress", "Some description"),
  // ];

  const todoList = new TodoList([]);
  main.appendChild(todoList.render());
}

init();
