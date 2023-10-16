var admin = require("firebase-admin");

var serviceAccount = require("./firbaseadminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const User = db.collection('Users');

module.exports = { db, User };