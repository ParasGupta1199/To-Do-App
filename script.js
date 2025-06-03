const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');

let tasks = [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task DOM element
function createTaskElement(task) {
  const li = document.createElement('li');

  const checkBtn = document.createElement('button');
  checkBtn.classList.add(task.completed ? 'check-btn' : 'uncheck-btn');
  checkBtn.setAttribute('aria-label', task.completed ? 'Mark task as incomplete' : 'Mark task as complete');

  const text = document.createElement('span');
  text.textContent = task.text;
  if (task.completed) text.classList.add('checked');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('aria-label', 'Delete task');

  li.appendChild(checkBtn);
  li.appendChild(text);
  li.appendChild(deleteBtn);

  // Toggle completed state
  checkBtn.addEventListener('click', () => {
    task.completed = !task.completed;
    checkBtn.classList.toggle('check-btn');
    checkBtn.classList.toggle('uncheck-btn');
    text.classList.toggle('checked');
    checkBtn.setAttribute('aria-label', task.completed ? 'Mark task as incomplete' : 'Mark task as complete');
    saveTasks();
  });

  // Delete task
  deleteBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => t !== task);
    list.removeChild(li);
    saveTasks();
  });

  return li;
}

// Render all tasks from the array
function renderTasks() {
  list.innerHTML = '';
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    list.appendChild(taskElement);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputText = input.value.trim();

  if (inputText) {
    const newTask = { text: inputText, completed: false };
    tasks.push(newTask);
    saveTasks();

    const taskElement = createTaskElement(newTask);
    list.appendChild(taskElement);

    input.value = '';
  } else {
    emptyMsg.style.display = 'block';
    setTimeout(() => {
      emptyMsg.style.display = 'none';
    }, 1000);
  }
});

// Load tasks from localStorage when page loads
window.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});
