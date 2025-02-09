import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), title: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="max-w-md w-full">
        <h1 className="text-white text-2xl font-bold text-center mb-4">
          Todo App
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 p-2 rounded bg-gray-800 text-white"
          />
          <button onClick={addTask} className="bg-purple-600 p-2 rounded">
            <img src="/plus.png" alt="Add" className="w-5 h-5" />
          </button>
        </div>
        <h2 className=" text-white text-lg mb-2">Tasks to do</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center text-white bg-gray-800 p-3 rounded mb-2"
          >
            <span
              className={task.completed ? "line-through text-green-400" : ""}
            >
              {task.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-green-500"
              >
                <img src="/check.png" alt="Complete" className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                <img src="/remove.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
