//Selectors - shift + option + down arrow
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOptions = document.querySelector('.filter-todo')



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOptions.addEventListener('click', filterTodo)



//Functions


//1. When + button is clicked run this to add a new item to the To Do List
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault()

    //Create a Todo DIV <div></div>
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create LI  <li></li>
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    // Put the li in the div
    todoDiv.appendChild(newTodo)
    //ADD TODO to LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    //Create CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML= '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    //Add check mark button to div
    todoDiv.appendChild(completedButton)
    //Create TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML= '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    //Add trash button to div
    todoDiv.appendChild(trashButton)
    // Add the div to the list
    todoList.appendChild(todoDiv)
    //Clear Todo Input box value after its added to the list
    todoInput.value = ""
}



//2. When trash and check btns are clicked run this function
function deleteCheck(e){
    const item = e.target
    //When delete btn clicked
    if(item.classList[0]==='trash-btn'){
        const todo = item.parentElement
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        });
        
    }

    //When check mark btn clicked
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}


// Sort list items into completed,  uncompleted and all
function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}




//Save to local storage

function saveLocalTodos(todo){
    //Check if there are any todo list items
    let todos 
    if(localStorage.getItem('todos') === null){
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    
     //Check if there are any todo list items
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = []
     }else {
         todos = JSON.parse(localStorage.getItem('todos'))
     }
     todos.forEach(function(todo){
        //Create a Todo DIV <div></div>
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //Create LI  <li></li>
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        // Put the li in the div
        todoDiv.appendChild(newTodo)
        //Create CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML= '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        //Add check mark button to div
        todoDiv.appendChild(completedButton)
        //Create TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML= '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        //Add trash button to div
        todoDiv.appendChild(trashButton)
        // Add the div to the list
        todoList.appendChild(todoDiv)
     })

}

function removeLocalTodos(todo){

     //Check if there are any todo list items
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = []
     }else {
         todos = JSON.parse(localStorage.getItem('todos'))
     }
     // Find the position (index) of specific list item and remove it from array using splice(), remove 1
     const todoIndex = todo.children[0].innerText
     todos.splice(todos.indexOf(todoIndex), 1)
     localStorage.setItem("todos", JSON.stringify(todos))
    
}