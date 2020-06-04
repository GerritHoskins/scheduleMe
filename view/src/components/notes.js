// Material UI components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as FirestoreService from './services/firestore';
import withStyles from '@material-ui/core/styles/withStyles';
import CreateList from '../scenes/CreateList/CreateList';
import JoinList from '../scenes/JoinList/JoinList';
import EditList from '../scenes/EditList/EditList';
import ErrorMessage from './ErrorMessage/ErrorMessage';

import useQueryString from './../hooks/useQueryString';
import { authMiddleWare } from '../util/auth';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
});

function Notes(props) {
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [noteCollection, setNoteCollection] = useState();
    const [error, setError] = useState();
    const [token, setToken] = useState(props.history)
    // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
    const [noteCollectionId, setNoteCollectionId] = useQueryString('listId');
    
    const options = {
        url: '/getNoteCollection',
        method: 'post',
        data: noteCollectionId
    };
    // Use an effect to authenticate and load the grocery list from the database
    useEffect(() => {
        setToken(localStorage.getItem('AuthToken'));
		axios.defaults.headers.common = { Authorization: `${token}` };  
        if (noteCollectionId) {
            //FirestoreService.getNoteCollection(noteCollectionId)
            axios(options)
               // .get('/getNoteCollection', noteCollectionId)
                .then((response) => {
                    if (response) {
                        setError(null);
                        setNoteCollection(response.data());
                    } else {
                        setError('noteCollection-list-not-found');
                        setNoteCollectionId();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        //   })
        //    .catch(() => setError('anonymous-auth-failed'));
    }, [noteCollectionId, setNoteCollectionId]);

    function onNoteCollectionCreate(noteCollectionId, userName) {
        setNoteCollectionId(noteCollectionId);
        setUser(userName);
    }

    function onCloseNoteCollection() {
        setNoteCollectionId();
        setNoteCollection();
        setUser();
    }

    function onSelectUser(userName) {
        setUser(userName);
        axios
            .get('/noteCollection', noteCollectionId)
            .then((response) => {
              setNoteCollection(response.updatedNoteCollection.data())
            })
            //.then(updatedNoteCollection => setNoteCollection(updatedNoteCollection.data()))
            .catch(() => setError('grocery-list-get-fail'));
    }

    // render a scene based on the current state
    if (noteCollection && user) {
        return <EditList {...{ noteCollectionId, user, onCloseNoteCollection, userId }}></EditList>;
    } else if (noteCollection) {
        return (
            <div>
                <ErrorMessage errorCode={error}></ErrorMessage>
                <JoinList users={noteCollection.users} {...{ noteCollectionId, onSelectUser, onCloseNoteCollection, userId }}></JoinList>
            </div>
        );
    }
    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <CreateList onCreate={onNoteCollectionCreate} userId={userId}></CreateList>
        </div>
    );
}

export default withStyles(styles)(Notes);
