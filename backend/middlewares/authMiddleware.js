// backend/middlewares/authMiddleware.js
const admin = require('../firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token não enviado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Aqui você tem o uid, email, etc
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido.', error: error.message });
  }
};

module.exports = authMiddleware;
