// backend/firebaseAdmin.js
const admin = require('firebase-admin');

const serviceAccount = require('./hometaskapp-firebase-adminsdk-fbsvc-8216b2542f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
