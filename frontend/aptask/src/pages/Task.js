import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Img from "../imagem/ap103.png";
import '../style/Task.css';
import 'animate.css';
import confetti from 'canvas-confetti';
import {AvisosSaveToDB} from '../services/api';


function Task({ loggedUser, rotation, tasks, setTasks, currentWeek }) {
    const [taskStatus, setTaskStatus] = useState(false);
    const user = rotation.find((r) => r.name === loggedUser);
    const taskIndex = user.tasks && user.tasks[currentWeek - 1] !== undefined ? user.tasks[currentWeek - 1] : -1;
    const task = taskIndex >= 0 && taskIndex < tasks.length ? tasks[taskIndex] : null;
    const [aviso, setAviso] = useState('');

    useEffect(() => {
        if (task) {
            setTaskStatus(task.status);
        }
    }, [task]);


    const handleChangeAviso = (e) => {
        setAviso(e.target.value);
    }

    const handleAvisoSubmit = async () => {
                try {
                    await AvisosSaveToDB(aviso);
                    console.log('Aviso salvo no banco de dados com sucesso!');
                } catch (error) {
                    console.error('Erro ao salvar aviso no banco de dados:', error);
                }
    };


    const toggleTaskStatus = () => {
        const newStatus = !taskStatus;
        setTaskStatus(newStatus);

        if (newStatus) { // Só executa quando a tarefa é marcada como concluída (true)
            const currentDate = new Date();
            const formattedDateTime = `Tarefa concluída em: ${currentDate.toLocaleDateString()} às ${currentDate.toLocaleTimeString()}`;
            setTasks((prevTasks) =>
                prevTasks.map((t, index) =>
                    index === taskIndex
                        ? {
                            ...t,
                            status: newStatus,
                            data_and_time: formattedDateTime // Atualiza o campo
                        }
                        : t
                )
            );
            // Dispara confetes
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        } else {
            // Se a tarefa for desmarcada  limpar a data)
            setTasks((prevTasks) =>
                prevTasks.map((t, index) =>
                    index === taskIndex
                        ? { ...t, status: newStatus }
                        : t
                )
            );
        }
    };

    return (
        <div>
            <div className="content_task"> 
            <div className="logo_task">
                <Link to="/home">
                    <img src={Img} alt="logo da página" />
                </Link>
            </div>
            <div className="content_task">
                <h1>Olá, {loggedUser}.</h1>
                <h2>Sua tarefa da semana:</h2>
                {task ? (
                    <div className="tarefa-morador">
                        <p>{task.task}</p>
                    </div>
                ) : (
                    <div className="tarefa-morador">
                        <p>Nenhuma tarefa atribuída esta semana</p>
                    </div>
                )}
                <h2>Status da tarefa:</h2>
                <div className="status-tarefa" data-status={taskStatus ? "done" : "pending"}
                >
                    <li>
                        {taskStatus ? 'Feita' : 'Pendente'}
                    </li>
                    <div className="status-button">
                        <button onClick={() => {
                            toggleTaskStatus();
                            if (!taskStatus) {
                                const date = new Date();
                                console.log(`Tarefa concluída em: ${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`);
                            }
                        }}>
                            Alternar Status
                        </button>
                    </div>
                </div>

                <div className="multas_div">
                    <h2>Multas recebidas:</h2>
                    <div className="multas_morador">
                        <p>   Vasilhas sujas</p>
                    </div>
                    <div className="multa-button">
                        <button>Aplicar uma multa</button>
                    </div>
                </div>
                <div className="aviso_div">
                    <h2>Quadro de Avisos :</h2>
                    <div  className="avisos-input"> 
                    <input
                        type="text"
                        id="meuInput"
                        value={aviso}
                        onChange={handleChangeAviso}
                        placeholder="Adicionar um aviso..."
                    />

                    </div>
                    <div className="avisos-button"> 
                    <button onClick={handleAvisoSubmit}>Adicionar Aviso</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <footer>
          <p>Produced by @oezequiel.</p>
        </footer>
           </div>
    );
}

export default Task;