import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Img from "../imagem/ap103.png";
import '../style/Task.css';

function Task({ loggedUser, rotation, tasks, setTasks, currentWeek }) {
    // Estado local para controlar o status da tarefa
    const [taskStatus, setTaskStatus] = useState(false);
    // Encontrar o usuário na rotação
    const user = rotation.find((r) => r.name === loggedUser);
    // Encontrar a tarefa correspondente ao usuário e à semana
    const taskIndex = user.tasks && user.tasks[currentWeek - 1] !== undefined  ? user.tasks[currentWeek-1]: -1;
    const task = taskIndex >= 0 && taskIndex < tasks.length ? tasks[taskIndex] : null;

    useEffect(() => {
        if (task) {
            setTaskStatus(task.status);
        }
    }, [task]); // O efeito depende de 'task', para atualizar quando a tarefa mudar
    // Verificar se o usuário foi encontrado
    if (!user) {
        return <h1 className="animate__animated animate__bounce"> Usuário não encontrado, por favor tente novamente. </h1>;
    }
    // Função para alternar o status da tarefa
    const toggleTaskStatus = () => {
        setTaskStatus((prevStatus) => !prevStatus);

        setTasks((prevTasks) =>
            prevTasks.map((t, index) =>
                index === taskIndex ? { ...t, status: !taskStatus } : t
            )
        );
    };

    return (
        <div>
            <div className="logo_task">
                <Link to="/">
                    <img src={Img} alt="logo da página" />
                </Link>
            </div>
            <div className="content_task">
                <h1>Olá, {loggedUser}.</h1>
                <h2>Sua tarefa da semana:</h2>
                <div className="tarefa-morador">
                    <p>{task.task}</p>
                </div>
                <h2>Status da tarefa:</h2>
                <div className="status-tarefa" data-status={taskStatus ? "done" : "pending"}
                >
                    <li>
                        {taskStatus ? 'Feita' : 'Pendente'}
                    </li>
                    <div className="status-button">
                        <button onClick={toggleTaskStatus}>
                            Alternar Status
                        </button>
                    </div>
                </div>
                <div className="multas_div">
                    <h2>Multas recebidas:</h2>
                    <div className="multas">
                        <p>Vasilhas sujas</p> {/* Exemplo de multa */}
                    </div>
                    <div className="multa-button">
                        <button>Aplicar uma multa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;