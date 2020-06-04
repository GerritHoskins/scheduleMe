import React, { useState } from 'react';
import './CreateList.css';
//import * as FirestoreService from '../../services/firestore';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage';
import axios from 'axios';

function CreateList(props) {

    const { onCreate, userId } = props;

    const [error, setError] = useState();

    function createNoteCollection(e) {
        e.preventDefault();
        setError(null);

        const userName = document.createListForm.userName.value;
        if (!userName) {
            setError('user-name-required');
            return;
        }

        //FirestoreService.createGroceryList(userName, userId)
        axios
            .post('/createNoteCollection', {              
                createdBy: userName,
                users : {
                    name : userName,
                    userId: ''
                }
            })
            .then((response) => {
                console.log(response);
                onCreate(response.id, userName);
            })
            .catch((error) => {
                 setError('create-list-error');
                 console.log(error);
            });
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Grocery List app!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>What is your name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createNoteCollection}>Create a new grocery list</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateList;