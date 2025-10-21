let todos = [];
let filterValue = "all";
//selections
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const todoSelect = document.querySelector(".filter-todos");
// const removeBtn = document.querySelectorAll(".todo__remove");
// const checkBtn = document.querySelectorAll(".todo__check");

//events
todoForm.addEventListener("submit", addNewTodo);
todoSelect.addEventListener("change", (e)=>{
filterValue = e.target.value;
filterTodo();
});

//functions
function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompeleted: false,
  };

  todos.push(newTodo);
  creatTodoList(todos);
}

function creatTodoList(todos) {
  let result = "";
  todos.forEach(item => {
    result += `<li class="todo ${item.isCompeleted && "completed"}">
            <p class="todo__title">${item.title}</p>
            <span class="todo__createdAt">${new Date(
              item.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <button class="todo__check" data-todo-id=${
              item.id
            }><i class="far ${item.isCompeleted?"fa-check-square":"fa-square"}"></i></button>
            <button class="todo__remove" data-todo-id=${
              item.id
            }><i class="far fa-trash-alt"></i></button>
          </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtn = [...document.querySelectorAll(".todo__remove")];
  removeBtn.forEach(item => {
    item.addEventListener("click", removeTodo);
  });
  
  const checkBtn = [...document.querySelectorAll(".todo__check")];
  checkBtn.forEach(item => {
    item.addEventListener("click", checkTodo);
  });
}

function filterTodo() {
  // let selectionBox = e.target.value;
  switch (filterValue) {
    case "all": {
      creatTodoList(todos);
      break;
    }
    case "completed": {
      const filteredTodo = todos.filter(t => t.isCompeleted);
      creatTodoList(filteredTodo);
      break;
    }
    case "uncompleted": {
      const filteredTodo = todos.filter(t => !t.isCompeleted);
      creatTodoList(filteredTodo);
      break;
    }
    default:
      creatTodoList(todos);
  }
}

function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const filteredTodo = todos.filter(t => t.id != todoId);
  todos = filteredTodo;
  filterTodo();
}
function checkTodo(e){
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t)=> t.id == todoId)
  todo.isCompeleted = !todo.isCompeleted;
  filterTodo();
}