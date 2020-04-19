//index.js

const functions = require('firebase-functions');
const app = require('express')();
//const auth = require('./util/auth');
const {
    loginUser
} = require('./APIs/users')

// Users
app.post('/login', loginUser);

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

app.post('/todo', postOneTodo);
app.get('/todos', getAllTodos);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);


exports.api = functions.https.onRequest(app);
