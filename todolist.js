let todos = [];

//selections
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");

//events
todoForm.addEventListener("submit" , addNewTodo);

//functions
function addNewTodo(e){
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

function creatTodoList(todos){
  let result ="";
  todos.forEach(item => {
    result+=`<li class="todo">
            <p class="todo__title">${item.title}</p>
            <span class="todo__createdAt">${new Date(item.createdAt).toLocaleDateString("fa-IR")}</span>
            <button><i class="todo__check far fa-check-square"></i></button>
            <button><i class="todo__remove far fa-trash-alt"></i></button>
          </li>`;
  });
  
  todoList.innerHTML = result;
  todoInput.value = "";
}
