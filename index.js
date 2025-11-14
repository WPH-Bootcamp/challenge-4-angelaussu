const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

function addTodo() {
  const text = prompt("Enter your to-do: ").trim();

  if (!text) {
    console.log("Error: To-do text cannot be empty.");
    return;
  }

  const newTodo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };

  todos.push(newTodo);
  console.log(`To-do "${text}" added successfully!`);
  return newTodo;
}

function markTodoCompleted() {
  if (todos.length === 0) {
    console.log("No to-dos to mark as completed.");
    return;
  }

  listTodos();

  const input = prompt("Enter the NUMBER of the to-do to mark as completed: ");
  const index = parseInt(input) - 1;

  // ⬇️ perhatikan teksnya HARUS sama persis seperti di test
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const todo = todos[index];

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }

  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" marked as completed!`);
  return todo;
}

function deleteTodo() {
  if (todos.length === 0) {
    console.log("No to-dos to delete.");
    return;
  }

  listTodos();

  const input = prompt("Enter the NUMBER of the to-do to delete: ");
  const index = parseInt(input) - 1;

  // ⬇️ sama juga di sini
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const removed = todos.splice(index, 1)[0];
  console.log(`To-do "${removed.text}" deleted!`);
  return removed;
}

function listTodos() {
  console.log("\n--- YOUR TO-DO LIST ---");

  if (todos.length === 0) {
    console.log("No to-dos to display.");
    console.log("------------------------\n");
    return [];
  }

  todos.forEach((todo, i) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${i + 1}. ${status} | ${todo.text}`);
  });

  console.log("------------------------\n");
  return todos;
}

function runTodoApp() {
  let running = true;

  while (running) {
    console.log("\nAvailable commands: add | complete | delete | list | exit");
    const command = prompt("Enter a command: ").trim().toLowerCase();

    switch (command) {
      case "add":
        addTodo();
        break;
      case "complete":
        markTodoCompleted();
        break;
      case "delete":
        deleteTodo();
        break;
      case "list":
        listTodos();
        break;
      case "exit":
        console.log("Exiting the to-do app. Goodbye!");
        running = false;
        break;
      default:
        console.log("Invalid command. Please try again.");
    }
  }
}

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
