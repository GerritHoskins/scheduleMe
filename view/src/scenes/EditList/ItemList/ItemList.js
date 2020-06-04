import React, { useEffect, useState } from 'react';
//import * as FirestoreService from '../../../services/firestore';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import axios from 'axios';

function ItemList(props) {

    const { noteCollectionId } = props;

    const [ notes, setNotes ] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the grocery list item stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe =
         //FirestoreService.streamGroceryListItems
         axios.get('/streamCollection', noteCollectionId, {
            next: querySnapshot => {
                const updatedNotes = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                    setNotes(updatedNotes);
            },
            error: () => setError('grocery-list-item-get-fail')
        });
        return unsubscribe;
    }, [noteCollectionId, setNotes]);

    const noteElements = notes
        .map((note, i) => <div key={i}>{note.name}</div>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <div>{noteElements}</div>
        </div>
    );
}

export default ItemList;