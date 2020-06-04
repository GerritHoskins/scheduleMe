const { db } = require('../util/admin');
const firebase = require('firebase');


exports.createNoteCollection = (request, response) => {
    return db
        .collection('noteCollection')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: request.body.userId,
            users: [{
                userId: request.body.userId,
                name: request.body.userName
            }]
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Notes -> Something went wrong' });
        });
}

exports.getNoteCollection = (request, response) => {
    return db
        .collection('noteCollection')
        .doc(request.noteCollectionId)
        .get()
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Notes -> Something went wrong' });
        });
};

exports.getNotes = (request, response) => {
    return db
        .collection('noteCollection')
        .doc(request.noteCollectionId)
        .collection('notes')
        .get();
};

exports.streamNoteCollection = (request, response) => {
    return db
        .collection('noteCollection')
        .doc(request.noteCollectionId)
        .collection('notes')
        .orderBy('created')
        .onSnapshot(observer);
};

exports.addUserToNoteCollection = (request, response) => {
    return db
        .collection('noteCollection')
        .doc(request.noteCollectionId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({
                userId: request.userId,
                name: request.userName
            })
        });
};
//(item, noteCollectionId, userId) => {
exports.addNoteToNoteCollection = (request, response) => {
    return getNotes(request.noteCollectionId)
        .then(querySnapshot => querySnapshot.docs)
        .then(noteCollection => noteCollection
            .find(
                notes => notes.data()
                    .name.toLowerCase() === request.notes.toLowerCase()
            )
        )
        .then(matchingItem => {
            if (!matchingItem) {
                const result = db
                    .collection('noteCollection')
                    .doc(noteCollectionId)
                    .collection('notes')
                    .add({
                        name: response.notes,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: response.userId
                    });
                return response.json(result);
            }
            //throw new Error('duplicate-item-error');
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Something went wrong' });
        });
};