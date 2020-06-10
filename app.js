// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// invoke load "all event listeners" fucntion
loadEventListeners();

// function to load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // clear Tasks
  clearBtn.addEventListener("click", clearTasks);
  // filtered tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link tp li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a todo");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link tp li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear Input
  taskInput.value = "";
}

// storage Task - LocalStorage can only store string so we have to parse with JSON.parse when u call the data and JSON.stringify when pushing data to storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// function removeTask(e) {
//   console.log(e.target);
// }

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks - option 1
function clearTasks(e) {
  console.log(e.target);
  taskList.innerHTML = "";
  // // clear Tasks option 2
  // while(taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  // }
  clearTasksFromLocalStorage();
}

// clear Task from Localstorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
