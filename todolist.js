let todos = [];

//selections
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const todoSelect = document.querySelector(".filter-todos");


//events
todoForm.addEventListener("submit", addNewTodo);
todoSelect.addEventListener("change", filterTodo);

//functions
function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompeleted: true,
  };

  todos.push(newTodo);
  creatTodoList(todos);
}

function creatTodoList(todos) {
  let result = "";
  todos.forEach(item => {
    result += `<li class="todo">
            <p class="todo__title">${item.title}</p>
            <span class="todo__createdAt">${new Date(
              item.createdAt
            ).toLocaleDateString("fa-IR")}</span>
            <button class="todo__check" data-todo-id=${
              item.id
            }><i class="far fa-check-square"></i></button>
            <button class="todo__remove" data-todo-id=${
              item.id
            }><i class="far fa-trash-alt"></i></button>
          </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

}

function filterTodo(e) {
  let selectionBox = e.target.value;
  switch (selectionBox) {
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

