import React, { useState } from 'react';
import { Link } from "react-router-dom"
import './Home.css';


function Home({ tasks, setTasks }) {
  return (
    <div>
      <body>
        <nav> <Link to="/"> Tarefas Ap 103 </Link>
        </nav>

        <ul>
          <li> <Link to="/user">Ezequiel </Link></li>
          <li> <Link to="/user">Gabriela </Link></li>
          <li> <Link to="/user">Gabriel </Link></li>
          <li> <Link to="/user">Isabella </Link></li>
          <li> <Link to="/user">Guilherme </Link></li>
        </ul>
        <h2> Tarefas já feitas:  </h2>
        <ul>
          <li> Casa</li>
          <li> Carro </li>
          <li> Roupa </li>
          <li> Uso </li>
          <li> Isabela </li>
        </ul>
        <footer>
          <p> Produced by @oezequiel </p>
        </footer>
      </body>
    </div>
  );
}

export default Home;
