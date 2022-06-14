import { format, isThisWeek, parseISO } from 'date-fns';
import Todo from './todo';
import Project from './project';
import {
  projects,
  addTodo,
  editTodo,
  removeTodo,
  addProject,
  editProject,
  removeProject,
  checkLocalStorage,
} from './todoApp';

// Menu & Navigation

const initMenu = () => {
  const menu = document.getElementById('menu');
  const menuButton = document.getElementById('menu-button');
  const inboxButton = document.getElementById('inbox');
  const todayButton = document.getElementById('today');
  const thisWeekButton = document.getElementById('this-week');

  menuButton.addEventListener('click', () => toggleNav());
  inboxButton.addEventListener('click', () => renderProjectTodos(projects[0]));
  todayButton.addEventListener('click', () => renderTodayTodos());
  thisWeekButton.addEventListener('click', () => renderWeekTodos());

  const toggleNav = () => {
    if (menu.className === 'menu') {
      menu.className += ' responsive';
    } else {
      menu.className = 'menu';
    }
  };
};

// Project Button & Forms

const addProjectButton = document.getElementById('add-project');
addProjectButton.addEventListener('click', () => initNewProjectForm());

const showAddProjectButton = () => {
  addProjectButton.style.display = 'block';
};

const hideAddProjectButton = () => {
  addProjectButton.style.display = 'none';
};

const initNewProjectForm = () => {
  const projectForm = document.getElementById('add-project-form');
  const projectInput = document.getElementById('add-project-input');
  const submitProjectButton = document.getElementById('submit-project');
  const cancelProjectButton = document.getElementById('cancel-project');

  submitProjectButton.addEventListener('click', (e) => submitProject(e));
  cancelProjectButton.addEventListener('click', () => hideProjectForm());

  const showProjectForm = () => {
    projectForm.style.display = 'block';
    hideAddProjectButton();
  };

  const hideProjectForm = () => {
    projectInput.value = '';
    projectForm.style.display = 'none';
    showAddProjectButton();
  };

  const submitProject = (e) => {
    if (projectInput.value === '') {
      return;
    }

    const projectIndex = projects
      .findIndex((project) => project.name === projectInput.value);
    if (projectIndex > -1) {
      alert('A project with this name already exists. Please enter a different name.');
      e.preventDefault();
      return;
    }

    addProject(getProjectFromInput());
    renderProjectButton(getProjectFromInput());
    renderProjectTodos(getProjectFromInput());
    hideProjectForm();
  };

  const getProjectFromInput = () => {
    const projectName = projectInput.value;
    return new Project(projectName, []);
  };

  showProjectForm();
};

const initEditProjectForm = (oldProject, projectDiv, projectButton) => {
  const editProjectForm = document.createElement('div');
  const formWrap = document.createElement('form');
  const projectInput = document.createElement('input');
  const editProjectButtons = document.createElement('div');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  editProjectForm.classList.add('edit-project-form');
  projectInput.classList.add('edit-project-input');
  editProjectButtons.classList.add('edit-project-buttons');
  submitButton.classList.add('submit-project');
  cancelButton.classList.add('cancel-project');

  projectInput.setAttribute('required', '');
  submitButton.setAttribute('type', 'submit');

  submitButton.innerHTML = 'Submit';
  cancelButton.innerHTML = 'Cancel';

  projectInput.value = oldProject.name;

  projectDiv.appendChild(editProjectForm);
  editProjectForm.appendChild(formWrap);
  formWrap.appendChild(projectInput);
  formWrap.appendChild(editProjectButtons);
  editProjectButtons.appendChild(submitButton);
  editProjectButtons.appendChild(cancelButton);

  submitButton.addEventListener('click', (e) => submitEditedProject(e, oldProject, projectInput.value));
  cancelButton.addEventListener('click', (e) => hideEditProjectForm(e));

  const submitEditedProject = (e, originalProject, newProjectName) => {
    editProject(originalProject, newProjectName);
    renderAllProjectButtons();
    renderProjectTodos(originalProject);
    hideEditProjectForm(e);
  };

  const hideEditProjectForm = (e) => {
    e.preventDefault();
    editProjectForm.style.display = 'none';
    projectButton.style.display = 'block';
    showAddProjectButton();
    renderProjectTodos(oldProject);
  };

  const hideProjectButton = () => {
    projectButton.style.display = 'none';
  };

  hideProjectButton();
  hideAddProjectButton();
};

const getCurrentProject = () => {
  const projectName = document.querySelector('.main-title').innerHTML;
  const projectIndex = projects.findIndex((project) => project.name === projectName);
  return projects[projectIndex];
};

// Todo Button & Forms

const addTodoButton = document.getElementById('add-todo-button');
addTodoButton.addEventListener('click', () => initNewTodoForm());

const showAddTodoButton = () => {
  addTodoButton.style.display = 'block';
};

const hideAddTodoButton = () => {
  addTodoButton.style.display = 'none';
};

const initNewTodoForm = () => {
  const todoForm = document.getElementById('add-todo-form');
  const todoNameInput = document.getElementById('todo-name-input');
  const todoPriorityInput = document.getElementById('todo-priority-input');
  const todoDateInput = document.getElementById('todo-date-input');
  const submitTodoButton = document.getElementById('submit-todo');
  const cancelTodoButton = document.getElementById('cancel-todo');

  todoForm.style.display = 'block';

  submitTodoButton.addEventListener('click', (e) => submitTodo(e));
  cancelTodoButton.addEventListener('click', () => hideTodoForm());

  const submitTodo = (e) => {
    const todoIndex = getCurrentProject().todos.findIndex(
      (todo) => todo.name === todoNameInput.value,
    );

    if (todoIndex > -1) {
      alert('This todo already exists within this project.');
      e.preventDefault();
      return;
    }

    if (todoNameInput.value === '' || todoPriorityInput.value === '') {
      return;
    }

    addTodo(getTodoFromInput(), getCurrentProject());
    renderProjectTodos(getCurrentProject());
    hideTodoForm();
  };

  const getTodoFromInput = () => {
    const name = todoNameInput.value;
    const dueDate = todoDateInput.value;
    const priority = todoPriorityInput.value;

    return new Todo(name, dueDate, priority);
  };

  const hideTodoForm = () => {
    todoNameInput.value = '';
    todoDateInput.value = '';
    todoPriorityInput.value = '';
    todoForm.style.display = 'none';
    showAddTodoButton();
  };

  hideAddTodoButton();
};

const initEditTodoForm = (selectedTodo, todoWrap, todoDiv) => {
  const editTodoDiv = document.createElement('div');
  const editTodoForm = document.createElement('div');
  const formWrap = document.createElement('form');
  const todoNameInput = document.createElement('input');
  const todoDataInput = document.createElement('div');
  const todoPriorityInput = document.createElement('select');
  const todoDateInput = document.createElement('input');
  const todoButtons = document.createElement('div');
  const submitTodoButton = document.createElement('button');
  const cancelTodoButton = document.createElement('button');

  editTodoDiv.classList.add('edit-todo');
  editTodoForm.classList.add('edit-todo-form');
  todoNameInput.classList.add('todo-name-input');
  todoDataInput.classList.add('todo-data-input');
  todoDateInput.classList.add('todo-date-input');
  todoPriorityInput.classList.add('todo-priority-input');
  todoButtons.classList.add('todo-buttons');
  submitTodoButton.classList.add('submit-todo');
  cancelTodoButton.classList.add('cancel-todo');

  todoDateInput.setAttribute('type', 'date');
  todoDateInput.setAttribute('required', '');
  todoPriorityInput.setAttribute('name', 'status');
  todoPriorityInput.setAttribute('required', '');

  todoDiv.style.display = 'none';
  editTodoForm.style.display = 'block';

  todoPriorityInput.innerHTML = `
  <option selected disabled value="">Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>`;

  submitTodoButton.innerText = 'Submit';
  cancelTodoButton.innerText = 'Cancel';

  todoWrap.appendChild(editTodoDiv);
  editTodoDiv.appendChild(editTodoForm);
  editTodoForm.appendChild(formWrap);
  formWrap.appendChild(todoNameInput);
  formWrap.appendChild(todoDataInput);
  todoDataInput.appendChild(todoDateInput);
  todoDataInput.appendChild(todoPriorityInput);
  formWrap.appendChild(todoButtons);
  todoButtons.appendChild(submitTodoButton);
  todoButtons.appendChild(cancelTodoButton);

  todoNameInput.value = selectedTodo.name;
  todoDateInput.value = selectedTodo.dueDate;
  todoPriorityInput.value = selectedTodo.priority;

  submitTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    editTodo(
      selectedTodo,
      todoNameInput.value,
      todoDateInput.value,
      todoPriorityInput.value,
    );

    hideEditTodoForm();

    if (document.querySelector('#main-title').innerHTML === 'Today') {
      renderTodayTodos();
    } else if (document.querySelector('#main-title').innerHTML === 'This Week') {
      renderWeekTodos();
    } else {
      renderProjectTodos(getCurrentProject());
    }
  });

  cancelTodoButton.addEventListener('click', () => hideEditTodoForm());

  const hideEditTodoForm = () => {
    todoNameInput.value = '';
    todoDateInput.value = '';
    todoPriorityInput.value = '';
    editTodoDiv.style.display = 'none';
    todoDiv.style.display = 'grid';
    showAddTodoButton();
  };

  hideAddTodoButton();
};

const markTodoAsDone = (todo) => {
  removeTodo(todo);

  if (document.querySelector('#main-title').innerHTML === 'Today') {
    renderTodayTodos();
  } else if (document.querySelector('#main-title').innerHTML === 'This Week') {
    renderWeekTodos();
  } else {
    renderProjectTodos(getCurrentProject());
  }
};

const renderTodo = (todo) => {
  const todosContainer = document.getElementById('todos-container');
  const todoWrap = document.createElement('div');
  const todoDiv = document.createElement('div');
  const circle = document.createElement('i');
  const todoContent = document.createElement('div');
  const todoName = document.createElement('div');
  const editButton = document.createElement('i');
  const todoData = document.createElement('div');
  const todoDate = document.createElement('div');
  const todoPriority = document.createElement('div');

  todoDiv.classList.add('todo');
  todoContent.classList.add('todo-content');
  todoName.classList.add('todo-name');
  todoData.classList.add('todo-data');
  todoDate.classList.add('todo-date');
  todoPriority.classList.add('todo-priority');
  circle.classList.add('far');
  circle.classList.add('fa-circle');
  circle.classList.add('todo-circle');
  editButton.classList.add('fas');
  editButton.classList.add('fa-edit');
  editButton.classList.add('edit-button');

  todoName.innerHTML = `${todo.name}`;

  if (todo.dueDate === '') {
    todoDate.innerHTML = 'No Due Date';
  } else {
    todoDate.innerHTML = `Due ${format(parseISO(todo.dueDate), 'PPPP')}`;
  }
  todoPriority.innerHTML = `${todo.priority} Priority`;

  todosContainer.appendChild(todoWrap);
  todoWrap.appendChild(todoDiv);
  todoDiv.appendChild(circle);
  todoDiv.appendChild(todoContent);
  todoContent.appendChild(todoName);
  todoContent.appendChild(editButton);
  todoDiv.appendChild(todoData);
  todoData.appendChild(todoDate);
  todoData.appendChild(todoPriority);

  circle.addEventListener('click', () => markTodoAsDone(todo));
  todoDiv.addEventListener('mouseover', () => showEditButton());
  todoDiv.addEventListener('mouseout', () => hideEditButton());
  editButton.addEventListener('click', () => initEditTodoForm(todo, todoWrap, todoDiv));

  const showEditButton = () => {
    editButton.style.display = 'block';
  };

  const hideEditButton = () => {
    editButton.style.display = 'none';
  };
};

const renderProjectButton = (project) => {
  const projectIndex = projects.findIndex((item) => item.name === project.name);
  const storedProjects = document.getElementById('stored-projects');
  const projectButtonDiv = document.createElement('div');
  const projectButton = document.createElement('button');
  const deleteButton = document.createElement('i');

  projectButtonDiv.classList.add('project-button-div');
  projectButton.classList.add('project-title');
  deleteButton.classList.add('fas');
  deleteButton.classList.add('fa-times');

  projectButton.innerHTML = `<i class="fas fa-circle"></i>${project.name}`;

  storedProjects.appendChild(projectButtonDiv);
  projectButtonDiv.appendChild(projectButton);
  projectButton.appendChild(deleteButton);

  projectButton.addEventListener('click', () => renderProjectTodos(projects[projectIndex]));
  projectButton.addEventListener('dblclick', () => initEditProjectForm(project, projectButtonDiv, projectButton));
  projectButton.addEventListener('mouseenter', () => showProjectDeleteButton());
  projectButton.addEventListener('mouseleave', () => hideProjectDeleteButton());

  deleteButton.addEventListener('click', (e) => {
    if (project.name === getCurrentProject().name) {
      removeProject(project);
      renderTodoApp();
    } else {
      removeProject(project);
      renderAllProjectButtons();
    }

    e.stopPropagation();
  });

  const showProjectDeleteButton = () => {
    deleteButton.style.display = 'block';
  };

  const hideProjectDeleteButton = () => {
    deleteButton.style.display = 'none';
  };
};

const renderAllProjectButtons = () => {
  const storedProjects = document.getElementById('stored-projects');
  storedProjects.innerHTML = '';

  projects.forEach((project) => {
    if (project.name !== 'Inbox') {
      renderProjectButton(project);
    }
  });
};

const renderProjectTodos = (project) => {
  const projectTitle = document.querySelector('.main-title');
  const todosContainer = document.getElementById('todos-container');
  projectTitle.innerHTML = project.name;
  todosContainer.innerHTML = '';

  if (project.todos !== '') {
    project.todos.forEach((todo) => renderTodo(todo));
  } else {
    return;
  }

  showAddTodoButton();
};

const renderTodayTodos = () => {
  const projectTitle = document.querySelector('.main-title');
  const todosContainer = document.getElementById('todos-container');
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  projectTitle.innerHTML = 'Today';
  todosContainer.innerHTML = '';

  projects.forEach((project) => {
    project.todos.forEach((todo) => {
      if (todo.dueDate === currentDate) {
        renderTodo(todo);
      }
    });
  });

  hideAddTodoButton();
};

const renderWeekTodos = () => {
  const projectTitle = document.querySelector('.main-title');
  const todosContainer = document.getElementById('todos-container');

  projectTitle.innerHTML = 'This Week';
  todosContainer.innerHTML = '';

  projects.forEach((project) => {
    project.todos.forEach((todo) => {
      if (isThisWeek(new Date(todo.dueDate)) === true) {
        renderTodo(todo);
      }
    });
  });

  hideAddTodoButton();
};

const renderInbox = () => {
  const projectTitle = document.getElementById('main-title');
  const todosContainer = document.getElementById('todos-container');
  const inboxTodos = projects[0].todos;

  projectTitle.innerHTML = projects[0].name;
  todosContainer.innerHTML = '';

  inboxTodos.forEach((todo) => renderTodo(todo));
};

const renderTodoApp = () => {
  checkLocalStorage();
  initMenu();
  renderAllProjectButtons();
  renderInbox();
};

renderTodoApp();
