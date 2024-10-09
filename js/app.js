// HTML elementlarini olish
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// LocalStorage'dan To-do'larni olish
function getTodos() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

// To-do'ni LocalStorage'ga saqlash
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// To-Do ro'yxatini yangilash
function renderTodos() {
  todoList.innerHTML = '';
  const todos = getTodos();
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${todo}
      <button onclick="deleteTodo(${index})">O'chirish</button>
    `;
    todoList.appendChild(li);
  });
}

// To-do qo'shish
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const todos = getTodos();
    todos.push(todoText);
    saveTodos(todos);
    renderTodos();
    todoInput.value = '';
  }
});

// To-Do o'chirish
function deleteTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

// Sahifa yuklanganda ro'yxatni ko'rsatish
document.addEventListener('DOMContentLoaded', renderTodos);
