const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
  getAllTodoStatusColumns
} = require('./APIs/columns')

app.get('/columns', auth, getAllTodoStatusColumns); 

const {
  getAllTodos,
  getOneTodo,
  postOneTodo,
  deleteTodo,
  editTodo
 /*  getAllTodoStatusColumns */
} = require('./APIs/todos')

// Todos
app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo', auth, postOneTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.put('/todo/:todoId', auth, editTodo);
/* app.get('/columns', auth, getAllTodoStatusColumns); */

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
app.post('/user/image', auth, uploadProfilePhoto);
app.post('/user', auth, updateUserDetails);
app.get('/user', auth, getUserDetail);
app.get('/users/userGroupSlug/userGroupId', auth, getUsersAsGroup);

const {
  createNoteCollection,
  getNoteCollection,
  getNotes,
  streamNoteCollection,
  addUserToNoteCollection,
  addNoteToNoteCollection
} = require('./APIs/notes')


app.post('/createNoteCollection', createNoteCollection);
app.get('/getNoteCollection', getNoteCollection);
app.get('/notes', getNotes);
app.get('/streamCollection', streamNoteCollection);
app.post('/addUserToNoteCollection', addUserToNoteCollection);
app.post('/addNoteToNoteCollection', addNoteToNoteCollection);

/*   const {
    selectNotes,
    selectNoteModel,
    selectGetNotesStatus,
    selectAddNoteStatus,
    selectEditNoteStatus,
    selectDeleteNoteStatus,
  } = require( './APIs/selectors')
 */

exports.api = functions.https.onRequest(app);
