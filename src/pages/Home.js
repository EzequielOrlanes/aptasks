import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import '../style/Home.css';
import Img from "../imagem/ap103.png";

function Home({ loggedUser, setLoggedUser, tasks }) {

  const handleLogin = (userName) => {
    setLoggedUser(userName);
  };

  useEffect(() => {
    console.log(`Usuário atualizado: ${loggedUser}`);
  }, [loggedUser]);

  // Filtra as tarefas com status "done"
  const tasksDone = tasks.filter(task => task.status === "done");
  const taskTrash = tasks.filter(task => task.name === "Chão cozinha, tanque + armário tanque, lixo")

  return (
    <div>
      <main>
        <header>
          <div className="logo">  <Link to="/"> <img src={Img} alt="logo da página" style={{ width: "30vw", height: "auto"}} /> </Link></div>
        </header>
        <div className='content'>
          <div className='moradores'>
            <ul>
              <li onClick={() => handleLogin('Ezequiel')}> <Link to="/user" >Ezequiel </Link></li>
              <li onClick={() => handleLogin('Gabriela')}> <Link to="/user" >Gabriela </Link></li>
              <li onClick={() => handleLogin('Guilherme')}> <Link to="/user" >Guilherme </Link></li>
              <li onClick={() => handleLogin('Isabella')}> <Link to="/user" >Isabella</Link></li>
            </ul>
          </div>
          <h2> Tarefas já feitas:  </h2>
          <div className='tarefas-feitas'>
            <ul>
            {tasksDone.length > 0 ? (
                tasksDone.map((task, index) => (
                  <li key={index}>{task.name}</li>
                ))
              ) : (
                <li>Nenhuma tarefa concluída ainda.</li>
              )}
            </ul>
          </div>
          <h2> Responsavél pela coleta de lixo: </h2>
          <div className='responsavel-lixo'>
            <p> {tasksDone.length > 0 ? (
                tasksDone.map((task, index) => (
                  <li key={index}>{task.name}</li>
                ))
              ) : (
                <li>Nenhum integrante está em casa. </li>
              )}
              </p>
          </div>
          <h2> Avisos: </h2>
          <div className='quadro-avisos'>
            <p> Camêras não estão funcionando.</p>
          </div>
        </div>
        <footer>
          <p> Produced by @oezequiel </p>
        </footer>
      </main>
    </div>
  );
}

export default Home;
