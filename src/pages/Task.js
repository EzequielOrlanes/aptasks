import React from "react";

function Task({ loggedUser, rotation, tasks, currentWeek }) {
    const user = rotation.find((r) => r.name === loggedUser);
    if (!user) {
        return <p>Usuário não encontrado.</p>;
    }

    const taskIndex = user.tasks[currentWeek - 1] - 1; // Índice da tarefa
    const task = tasks[taskIndex];
    return (
        <div>
            <h1>Bem-vindo, {loggedUser}.</h1>
            <h2>Tarefa da semana:</h2>
            <p>{task}</p>
            <h2>Status da tarefa: </h2>
            <li>
                {task.status ? 'Feita' : 'Pendente'}
            </li>
        </div>
    );
}

export default Task;
