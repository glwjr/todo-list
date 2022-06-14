let projects = [
  {
    name: 'Inbox',
    todos: [],
  },
];

const updateLocalStorage = () => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const checkLocalStorage = () => {
  if (localStorage.getItem('projects')) {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
};

const addProject = (newProject) => {
  projects.push(newProject);
  updateLocalStorage();
};

const editProject = (oldProject, newName) => {
  oldProject.name = newName;
  updateLocalStorage();
};

const removeProject = (selectedProject) => {
  const projectIndex = projects.findIndex((project) => project.name === selectedProject.name);
  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
    updateLocalStorage();
  }
};

const addTodo = (todo, currentProject) => {
  const projectIndex = projects.findIndex((project) => project.name === currentProject.name);
  projects[projectIndex].todos.push(todo);
  updateLocalStorage();
};

const editTodo = (oldTodo, newName, newDueDate, newPriority) => {
  oldTodo.name = newName;
  oldTodo.dueDate = newDueDate;
  oldTodo.priority = newPriority;
  updateLocalStorage();
};

const removeTodo = (selectedTodo) => {
  const projectIndex = projects
    .findIndex((project) => project.todos.find((todo) => todo === selectedTodo));
  const parentProject = projects[projectIndex];
  const todoIndex = parentProject.todos.indexOf(selectedTodo);
  if (todoIndex > -1) {
    parentProject.todos.splice(todoIndex, 1);
    updateLocalStorage();
  }
};

export {
  projects,
  addTodo,
  editTodo,
  removeTodo,
  addProject,
  editProject,
  removeProject,
  checkLocalStorage,
};
