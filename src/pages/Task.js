import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Img from "../imagem/ap103.png";
import '../style/Task.css';

function Task({ loggedUser, rotation, tasks, currentWeek }) {
    // Estado local para controlar o status da tarefa
    const [taskStatus, setTaskStatus] = useState(false);
    // Encontrar o usuário na rotação
    const user = rotation.find((r) => r.name === loggedUser);
    // Encontrar a tarefa correspondente ao usuário e à semana
    const taskIndex = user ? user.tasks[currentWeek - 1] - 1 : -1; // Índice da tarefa
    const task = taskIndex !== -1 ? tasks[taskIndex] : null;
    // Atualizar o status da tarefa ao carregar
    useEffect(() => {
        if (task) {
            setTaskStatus(task.status); // Define o status da tarefa de acordo com o valor inicial
        }
    }, [task]); // O efeito depende de 'task', para atualizar quando a tarefa mudar
    // Verificar se o usuário foi encontrado
    if (!user) {
        return <p>Usuário não encontrado, por favor tente novamente.</p>;
    }
    // Função para alternar o status da tarefa
    const toggleTaskStatus = () => {
        setTaskStatus((prevStatus) => !prevStatus);
    };

    return (
        <div>
            <div className="logo">
                <Link to="/">
                    <img src={Img} alt="logo da página" style={{ width: "30vw", height: "auto" }} />
                </Link>
            </div>
            <h1>Bem-vinda, {loggedUser}.</h1>
            <h2>Sua tarefa da semana:</h2>
            <div className="tarefa-morador">
                <p>{task?.name}</p> {/* Exibe o nome da tarefa */}
            </div>
            <h2>Status da tarefa:</h2>
            <div className="status-tarefa">
                <li>
                    {taskStatus ? 'Feita' : 'Pendente'}
                </li>
            </div>
            <div className="status-button">
                <button onClick={toggleTaskStatus}>
                    Alternar Status
                </button>
            </div>
            <h2>Multas recebidas:</h2>
            <div className="multas">
                <p>Vasilhas sujas</p> {/* Exemplo de multa */}
            </div>
            <div className="multa-button">
                <button>Aplicar uma multa</button>
            </div>
        </div>
    );
}

export default Task;