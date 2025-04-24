// backend/firebaseAdmin.js
const admin = require('firebase-admin');

const serviceAccount = require('./seu-arquivo-service-account.json'); // atualize com o caminho certo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
