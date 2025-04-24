import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import Img from "../imagem/ap103.png";
import '../style/Login.css';


import { loginUser, registerUser } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(email, password);
            console.log('Usuário logado:', response.user);
            navigate('/home');
        } catch (error) {
            setError(error.message || 'Erro ao fazer login');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await registerUser(email, password);
            console.log('Usuário registrado:', response.user);
            navigate('/home');
        } catch (error) {
            setError(error.message || 'Erro ao criar conta');
        }
    };

    return (
        <div style={styles.container}>
          <div className="logo"> <Link to="/"> <img src={Img} alt="logo da página" /> </Link></div>
            <h2>Login / Criar Conta </h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.buttonGroup}>
                    <button 
                        type="button" 
                        style={styles.primaryButton}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button 
                        type="button"
                        style={styles.secondaryButton}
                        onClick={handleRegister}
                    >
                        Criar Conta
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
    },
    primaryButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    secondaryButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default Login;