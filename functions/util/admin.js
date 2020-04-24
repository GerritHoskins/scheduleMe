/* //admin.js
const admin = require('firebase-admin');
const serviceAccount = require("../../dbtronics.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dbtronics-79c66.firebaseio.com"
});

const db = admin.firestore();
module.exports = { admin, db }; */
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };