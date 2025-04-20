import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Task from "./pages/Task.js";
import Home from "./pages/Home.js"
import Login from './pages/Login.js';



function App() {
  const [loggedUser, setLoggedUser] = useState("");

  const rotation = [
    { name: "Gabriela", tasks: [3 , 2, 1, 0] },
    { name: "Isabella", tasks: [1, 0, 3, 2] }, 
    { name: "Ezequiel", tasks: [2,3,0,1] },
    { name: "Guilherme", tasks: [0, 1,2,3] }];

  const [tasks, setTasks] = useState([
    { task: "Sala, sofá, corredor, mesa, varanda", status: false },
    { task: "Banheiro social", status: false },
    { task: "Pia, geladeira, fogão, microondas, armários cozinha, panos de prato", status: false },
    { task: "Chão cozinha, tanque + armário tanque, lixo, Banheiro quartinho + quartinho", status: false },
  ]);

  const getCurrentWeek = () => {
    const startDate = new Date("2024-12-06"); 
    const currentDate = new Date();
    const weekNumber = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)) % 4; // Semanas rotativas
    return weekNumber;
  };

  const currentWeek = getCurrentWeek();
  return (
    <Router>
    <Routes>
      <Route
      path="/"
      element={
      <Login/>
      }> 


      </Route>
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
      <Route path="/home"
      element={
      <Home loggedUser={loggedUser} setLoggedUser={setLoggedUser} tasks={tasks} rotation={rotation}/>
      }>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
