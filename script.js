const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const modeToggle = document.getElementById("modeToggle");

// Load tasks from localStorage
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => renderTask(task.text, task.done));
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀";
  }
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  renderTask(text, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("done");

  li.innerHTML = `
    <span>${text}</span>
    <button onclick="deleteTask(this)">🗑</button>
  `;

  li.addEventListener("click", function (e) {
    if (e.target.tagName !== "BUTTON") {
      li.classList.toggle("done");
      saveTasks();
    }
  });

  taskList.appendChild(li);
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

modeToggle.onclick = function () {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};