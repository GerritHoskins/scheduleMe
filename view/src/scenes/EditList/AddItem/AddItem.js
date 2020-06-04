import React, { useState } from 'react';
import './AddItem.css';
//import * as FirestoreService from '../../../services/firestore';
import ErrorMessage from './../../../components/ErrorMessage/ErrorMessage'
import axios from 'axios';

function AddItem(props) {

    const { noteCollectionId, userId } = props;

    const [error, setError] = useState('');

    function addItem(e) {
        e.preventDefault();
        setError(null);

        const itemDesc = document.addItemForm.itemDesc.value;
        if (!itemDesc) {
            setError('grocery-item-desc-req');
            return;
        }

        //FirestoreService.addGroceryListItem(itemDesc, groceryListId, userId)
        axios
            .post('addNoteToNoteCollection', {
                itemDesc,
                noteCollectionId
            })
            .then(() => document.addItemForm.reset())
            .catch(error => {
                if (error.message === 'duplicate-item-error') {
                    setError(error.message);
                }
                else if (error.response.status === 403) {
                    console.log(error);
                }
           
            });
    }

    return (
        <form name="addItemForm">
            <h3>I want...</h3>
            <input type="text" name="itemDesc" />
            <button type="submit" onClick={addItem}>Add</button>
            <ErrorMessage errorCode={error}></ErrorMessage>
        </form>
    );
}

export default AddItem;