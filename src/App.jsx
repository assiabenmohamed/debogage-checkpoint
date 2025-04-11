import { useState } from "react";
import TaskForm from "./Taskform";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addTask = (text) => {
      // Fonction d'ajout de tâche sans useCallback (cause de rendus inutiles)
    // setTasks([...tasks, { id: nextId, text, completed: false }]);
      // Optimisé avec useCallback pour éviter les rendus inutiles

    setTasks((prevTask) => [
      ...tasks,
      { id: prevTask.length + 1, text, completed: false },
    ]);
    // Bug: Ne met pas à jour nextId
    // Correction: Mettre à jour nextId
    setNextId(nextId + 1);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto my-8 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Ma Liste de Tâches
      </h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        // Bug: onDeleteTask manquant
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
