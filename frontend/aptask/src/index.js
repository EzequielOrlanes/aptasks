import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Verifique se o caminho está correto (não '../App')
import './App.css'; // Se houver outros arquivos, ajuste os caminhos


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
