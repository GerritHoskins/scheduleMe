import React, { useState } from 'react';
import './JoinList.css';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage';
//import * as FirestoreService from '../../services/firestore';
import Axios from 'axios';

function JoinList(props) {

    const { users, noteCollectionId, onSelectUser, onCloseNoteCollection, userId } = props;

    const [ error, setError ] = useState();

    function addExistingUser(e) {
        e.preventDefault();
        onSelectUser(e.target.innerText);
    }

    function getUserButtonList() {
        const buttonList = users.map(user => <button key={user.name} onClick={addExistingUser}>{user.name}</button>);
        return <div className="button-group">{buttonList}</div>;
    }

    function addNewUser(e) {
        e.preventDefault();
        setError(null);

        const userName = document.addUserToListForm.name.value;
        if (!userName) {
            setError('user-name-required');
            return;
        }

        if (users.find(user => user.name === userName)) {
            onSelectUser(userName);
        } else {
            Axios.post('/addUserToNoteCollection', { userName, noteCollectionId, userId})
                .then(() => onSelectUser(userName))
                .catch(() => setError('add-user-to-list-error'));
        }
    }

    function onCreateListClick(e) {
        e.preventDefault();
        onCloseNoteCollection();
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Grocery List app!</h1>
            </header>
            <div className="join-container">
                <div>
                    <form name="addUserToListForm">
                        <p>Select your name if you previously joined the list...</p>
                        {getUserButtonList()}
                        <p>...or enter your name to join the list...</p>
                        <p>
                            <input type="text" name="name" />
                            <button onClick={addNewUser}>Join</button>
                        </p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p>...or <a href="/" onClick={onCreateListClick}>create a new grocery list</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JoinList;