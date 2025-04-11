# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Correction des bugs de l'application Todo React avec Tailwind CSS

Ce document détaille les bugs identifiés dans l'application Todo React et les corrections appliquées.

## Bugs identifiés et corrections

### 1. Bugs dans App.js

#### Problèmes identifiés :

- **Prop manquante** : La fonction `deleteTask` n'était pas transmise au composant `TaskList`
- **Optimisations manquantes** : Pas d'utilisation de `useCallback` pour les fonctions manipulant l'état
- **Initialisation inefficace** : nextId n est pas a jour

#### Corrections :

```jsx
// Ajout de useCallback
const addTask = useCallback(
  (text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: nextId, text, completed: false },
    ]);
    setNextId((prevId) => prevId + 1);
  },
  [nextId]
);

setTasks((prevTask) => [
  ...tasks,
  { id: prevTask.length + 1, text, completed: false },
]);

// Passage correct de la prop au composant
<TaskList
  tasks={tasks}
  onDeleteTask={deleteTask} // Correction: Ajout de onDeleteTask
  onToggleTask={toggleTask}
/>;

//  Mettre à jour nextId
setNextId(nextId + 1);
```

### 2. Bugs dans TaskForm.js

#### Problèmes identifiés :

- **État persistant incorrect** : Le champ de saisie ne se vide pas après l'ajout d'une tâche

#### Corrections :

```jsx
// Réinitialisation de l'input après ajout
const handleSubmit = (e) => {
  e.preventDefault();
  if (inputValue.trim()) {
    onAddTask(inputValue);
    setInputValue(""); // Correction: Réinitialiser l'input
  }
};

/
```

### 3. Bugs dans TaskList.js

#### Problèmes identifiés :

- **Définition incorrecte** : `onDeleteTask` défini comme `undefined` au lieu d'utiliser la prop reçue
- **Props incomplètes** : Ne reçoit pas correctement `onDeleteTask` depuis App.js

#### Corrections :

```jsx
// Correction de la signature du composant pour inclure onDeleteTask
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  // Suppression de la redéfinition incorrecte
  // const onDeleteTask = undefined; <- Code supprimé
  // Le reste du composant est inchangé
}
```

### 4. Bugs dans TaskItem.js

#### Problèmes identifiés :

- **Sécurité des appels** : Absence de vérification de l'existence des fonctions callback

#### Corrections :

```jsx
// Vérification de l'existence des callbacks
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
```

## Bonnes pratiques implémentées

1. **Optimisation des performances**

   - Utilisation de `useCallback` pour stabiliser les références des fonctions

2. **Robustesse**

   - Vérification de l'existence des props et callbacks
   - Validation des données utilisateur
   - Gestion appropriée des cas particuliers (listes vides, etc.)

3. **Expérience utilisateur**

   - Feedback visuel clair (Tailwind CSS)

4. **Gestion d'état**
   - Mise à jour d'état fonctionnelle basée sur l'état précédent
   - Initialisation d'état avec fonction d'initialisation
