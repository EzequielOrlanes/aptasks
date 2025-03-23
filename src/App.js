import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./pages/Task.js";
import Home from "./pages/Home.js"



function App() {
  const [loggedUser, setLoggedUser] = useState(" ");


  const rotation = [
    { name: "Gabriela", tasks: [3 , 1, 2, 4, 5] },
    { name: "Isabella", tasks: [1, 2, 5, 4, 3] }, 
    { name: "Ezequiel", tasks: [5, 4, 1, 2, 3] },
    { name: "Guilherme", tasks: [4, 3, 5, 1, 2] }];


  const [tasks, setTasks] = useState([  // Estado para armazenar as tarefas
    { task: "Sala, sofá, corredor, mesa, varanda", status: false },
    { task: "Banheiro social", status: false },
    { task: "Banheiro quartinho + quartinho", status: false },
    { task: "Pia, geladeira, fogão, microondas (por fora e dentro), armário baixo, airfryer (por fora)", status: false },
    { task: "Chão cozinha, tanque + armário tanque, lixo", status: false },
  ]);

  const getCurrentWeek = () => {
    const startDate = new Date("2024-12-10"); 
    const currentDate = new Date();
    const weekNumber = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)) % 5; // Semanas rotativas
    return weekNumber + 1;
  };
  const currentWeek = getCurrentWeek();
  return (
    <Router>
    <Routes>
      <Route
        path="/user"
        element={
          loggedUser ? (
            <Task
              loggedUser={loggedUser}
              rotation={rotation}
              tasks={tasks}
              setTasks={setTasks}
              currentWeek={currentWeek}
            />
          ) : (
            <Navigate to="/"/>
           )
        }
      />
      <Route path="/"
      element={
      <Home loggedUser={loggedUser} setLoggedUser={setLoggedUser} tasks={tasks} rotation={rotation}/>
      }>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
