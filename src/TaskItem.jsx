// TaskItem.js
import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
  // Bug: Ne vérifie pas si onDelete existe avant de l'appeler
  // Correction: Vérification de l'existence de onDelete avant de l'appeler
  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle(task.id);
    }
  };

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="h-5 w-5 text-blue-500 focus:ring-blue-500 rounded"
          />
          <span
            className={`ml-3 ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {task.text}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="ml-2 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition duration-200"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
