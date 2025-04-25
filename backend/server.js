// import { getAnalytics } from "firebase/analytics";
const authMiddleware = require('./middlewares/authMiddleware');
const express = require("express");
import { getFirestore, addDoc } from "firebase/firestore";

const { initializeApp } = require("firebase/app");

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require("firebase/auth");
const cors = require('cors');

// Configure o CORS antes das rotas

const app = express();
app.set('trust proxy', true); // Adicione isso antes das rotas
app.use(express.json()); // Para parsear JSON no body das requisições
app.use(cors({
  origin: '*', // Ou substitua '*' pelo seu domínio front-end
  methods: ['POST', 'GET', 'OPTIONS'], // Adicione OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const db = getFirestore(app)
// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAhRWRui9X82y-0g2vnvys4brMgdVQt34U",
  authDomain: "hometaskapp.firebaseapp.com",
  projectId: "hometaskapp",
  storageBucket: "hometaskapp.firebasestorage.app",
  messagingSenderId: "746880386819",
  appId: "1:746880386819:web:4bc278463460af8e1fcb36",
  measurementId: "G-C91YN5LL1J"
};

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// const analytics = getAnalytics(app);

// Rota de cadastro
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Senha deve ter pelo menos 6 caracteres" });
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    res.status(201).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

const admin = require('firebase-admin');
app.post('/logout', authMiddleware, async (req, res) => {
  try {
    const uid = req.user.uid;
    await admin.auth().revokeRefreshTokens(uid);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post("/avisos", async (req, res) => {
  try {
    const { aviso } = req.body;
    if (!aviso) {
      return res.status(400).json({ error: "Aviso é obrigatório" });
    }
    const docRef = await addDoc(collection(db, "avisos"), {
       body: aviso,
       createdAt: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id)
} catch (e) {
    console.error("Error adding document: ", e)
}
});





console.log(process.env.NODE_ENV); // "development"

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));