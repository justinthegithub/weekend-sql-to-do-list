console.log('JS is sourced!');

document.addEventListener('DOMContentLoaded', function(){
    console.log('Hello from client.js. DOM loaded');
   
    const todoInput = document.querySelector('#todoInput');
    const submitBtn = document.querySelector('#theSubmitButton');
    const todoList =document.querySelector('#todoList');
    console.log('querySelector check',todoInput,theSubmitButton, todoList);

   
    theSubmitButton.addEventListener('click', function(){
        console.log('Button Clicked', todoInput.value)
    })

    function loadToDos() {
        axios({
            method: 'get',
            url: '/todos'
        })
        .then(function(response){
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    }
    loadToDos();


});