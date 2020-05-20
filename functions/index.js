const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
 
const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

// Todos
app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo',auth, postOneTodo);
app.delete('/todo/:todoId',auth, deleteTodo);
app.put('/todo/:todoId',auth, editTodo);

const { 
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails,
    getUsersAsGroup
} = require('./APIs/users')

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth ,uploadProfilePhoto);
app.post('/user', auth ,updateUserDetails);
app.get('/user', auth, getUserDetail);
app.get('/users/userGroupSlug/userGroupId', auth, getUsersAsGroup);

const {
    getNotes,
    editNote,
    deleteNote,
    addNote,
  } = require( './APIs/notes')
  
  app.post('/notes', getNotes);
  app.post('/edit', editNote);
  app.post('/delete', deleteNote);
  app.post('/addNote', addNote);


/*   const {
    selectNotes,
    selectNoteModel,
    selectGetNotesStatus,
    selectAddNoteStatus,
    selectEditNoteStatus,
    selectDeleteNoteStatus,
  } = require( './APIs/selectors') */
  

exports.api = functions.https.onRequest(app);
