console.log('JS is sourced!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Hello from client.js. DOM loaded');

    const todoInput = document.querySelector('#todoInput');
    const theSubmitButton = document.querySelector('#theSubmitButton');
    const todoList = document.querySelector('#todoList');
    console.log('querySelector check', todoInput, theSubmitButton, todoList);

    theSubmitButton.addEventListener('click', function() {
        console.log('Button Clicked', todoInput.value);
        if (todoInput.value) {
            axios({
                method: 'post',
                url: '/todos',
                data: { text: todoInput.value }
            })
            .then(function(response) {
                console.log('POST response:', response.data);
                todoInput.value = ''; // Clear the input field
                loadToDos(); // Reload the to-do list
            })
            .catch(function(error) {
                console.error(error);
            });
        }
    });

    function loadToDos() {
        axios({
            method: 'get',
            url: '/todos'
        })
        .then(function(response) {
            console.log('GET response:', response.data);
            const toDos = response.data;
            todoList.innerHTML = ''; // Clear the list
            for (let i = 0; i < toDos.length; i++) {
                let todo = toDos[i];
                const toDoItem = document.createElement('li');
                toDoItem.setAttribute('data-testid', 'toDoItem')
                toDoItem.textContent = todo.text;
                todoList.appendChild(toDoItem);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    loadToDos();
});
