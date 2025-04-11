// TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  // Bug: Ne gère pas correctement onDeleteTask
  // const onDeleteTask = undefined;

  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Aucune tâche pour le moment.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          // Bug: La prop onDelete est incorrectement passée
          // Correction: Utilisation de la prop correcte

          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
