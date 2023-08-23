'use strict';

const todos = [];
const list = document.querySelector('.js-todo-list');





//adding a new todo to the list
const addTodo = function (text, todos) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    const found = todos.some(el => el.text === text);
    const check = todos.filter(el => el.checked === true);

    if (found && check) {
        alert("Already Exists");
        return;
    } else {
        todos.push(todo);
        renderTodo(todo);
    }
    console.log(todos);
}
function todoCompleted(todoid){
    todos.forEach(todo => {
        if(todo.id === todoid){
            todo.checked = !todo.checked;
        }
    })
}

function deleteTodo(todoid) {
    const todoindex = todos.findIndex(idx => todos.id === todoid);
    if(todoindex > -1){
        todos.splice(todoindex,1);
        console.log(todos);
    }
}
//displaying todo
const renderTodo = function (todo) {
    const node = document.createElement("li");
    node.setAttribute("data-key", todo.id);
    node.innerHTML = `
    <input type="checkbox" class="${todo.checked ? 'checked' : ''}" onchange="todoCompleted(${todo.id})"/>
    <label class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="edit-todo js-edit-todo">Edit</button>
    <button class="delte-todo js-delete-todo" onclick="deleteTodo(${todo.id})">Delete</button>`;
    list.append(node)
}



const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text, todos);
        input.value = '';
    }
})

//Sorting
document.querySelector('#sort').addEventListener('change', function (e) {
    switch (e.target.value) {
        case 'atoz':
            var naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(a.text, b.text));
            console.log(todos);
            break;

        case 'ztoa':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(b.text, a.text));
            console.log(todos)
            break;

        case 'newest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(b.id, a.id));
            console.log(todos)
            break;

        case 'oldest':
            naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            todos.sort((a, b) => naturalCollator.compare(a.id, b.id));
            console.log(todos)
    }

})

//actions
document.querySelector('#actions').addEventListener('change', function (e) {
    switch (e.target.value) {
        case 'deleteallselected':
            console.log("delete selected");
            break;

        case 'selectall':
            e.preventDefault();
            todos.map(element => element.checked = true)
            console.log(todos);
            break;

        case 'unselectall':
            e.preventDefault();
            todos.map(element => element.checked = false)
            console.log(todos);
            break;
        default:
            console.log("Select Option");
    }
})