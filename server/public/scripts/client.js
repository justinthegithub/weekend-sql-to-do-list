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
                todoInput.value = '';
                loadToDos();
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
            todoList.innerHTML = '';
            for (let i = 0; i < toDos.length; i++) {
                let todo = toDos[i];
                const toDoItem = document.createElement('li');
                toDoItem.setAttribute('data-testid', 'toDoItem');
                toDoItem.textContent = todo.text;

                if (todo.isComplete) {
                    toDoItem.classList.add('completed');
                }

                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete Test';
                completeButton.setAttribute('data-testid', 'completeButton');
                completeButton.addEventListener('click', function() {
                    completeTodo(todo.id, toDoItem);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('data-testid', 'deleteButton');
                deleteButton.addEventListener('click', function() {
                    deleteTodo(todo.id);
                });

                toDoItem.appendChild(completeButton);
                toDoItem.appendChild(deleteButton);
                todoList.appendChild(toDoItem);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    function completeTodo(id, toDoItem) {
        axios({
            method: 'put',
            url: `/todos/${id}`,
            data: { isComplete: true }
        })
        .then(function(response) {
            console.log('PUT response:', response.data);
            toDoItem.classList.add('completed');
            loadToDos();
        })
        .catch(function(error) {
            console.log('completeTodo error!', error);
        });
    }

    function deleteTodo(id) {
        axios({
            method: 'delete',
            url: `/todos/${id}`
        })
        .then(function(response) {
            console.log('DELETE response:', response);
            loadToDos();
        })
        .catch(function(error) {
            console.error(error);
        });
    }

    loadToDos();
});
