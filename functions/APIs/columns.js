const { db } = require('../util/admin');

exports.getAllTodoStatusColumns = (request, response) => {
    db
        .collection('columns')
        .orderBy('columnId', 'desc')
        .get()        
        .then((data) => {
            let columns = [];
            data.forEach((doc) => {
                columns.push({
                    columnId: doc.data().columnId,
                    columnName: doc.data().columnName
                });
            });
            return response.json(columns);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
}