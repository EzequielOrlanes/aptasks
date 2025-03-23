import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import '../style/Home.css';
import Img from "../imagem/ap103.png";

function Home({ loggedUser, setLoggedUser, tasks, rotation }) {

  const handleLogin = (userName) => {
    setLoggedUser(userName);
  };

  useEffect(() => {
    console.log(`Usuário atualizado: ${loggedUser}`);
  }, [loggedUser]);

  // Filtra as tarefas com status "done"
  const tasksDone = tasks.filter(task => task.status === true);
  const taskTrash = rotation.filter(rotation => rotation.tasks === 5)

  return (
    <div>
      <main>
        <header>
          <div className="logo"> <Link to="/"> <img src={Img} alt="logo da página" /> </Link></div>
        </header>
        <div className='content'>
          <h2> Moradores: </h2>
          <div className='moradores'>
            <ul>
              <li onClick={() => handleLogin('Ezequiel')}> <Link to="/user" >Eze </Link></li>
              <li onClick={() => handleLogin('Gabriela')}> <Link to="/user" >Gabs </Link></li>
              <li onClick={() => handleLogin('Guilherme')}> <Link to="/user" >Guilhermo </Link></li>
              <li onClick={() => handleLogin('Isabella')}> <Link to="/user" >Bella</Link></li>
              <li onClick={() => handleLogin('Isella')}> <Link to="/user" >Isabella</Link></li>

            </ul>
          </div>
          <h2> Tarefas já feitas:  </h2>
          <div className='tarefas-feitas'>
            <ul>
            {tasksDone.length > 0 ? (
                tasksDone.map((task, index) => (
                  <li key={index}>{task.task}</li>
                ))
              ) : (
                <li>Nenhuma tarefa concluída ainda.</li>
              )}
            </ul>
          </div>
          <h2> Coleta de lixo: </h2>
          <div className='responsavel-lixo'>
            <p> {taskTrash.length > 0 ? (
                taskTrash.map((task, index) => (
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
