// TaskForm.js
import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue);
      // Bug: Ne réinitialise pas l'input après ajout
      // Correction: Réinitialiser l'input après ajout
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        id="task"
        name="task"
        placeholder="Ajouter une nouvelle tâche"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-200"
      >
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;
