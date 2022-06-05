import { format, isThisWeek, parseISO } from "date-fns"

class Todo {
    constructor(name, dueDate, priority) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    constructor (name, todos) {
        this.name = name;
        this.todos = todos;
    }
}

const todoApp = (() => {

    let projects = [
        {
            name: "Inbox",
            todos: []
        }
    ];

    const addProject = (newProject) => {
        projects.push(newProject)
        updateLocalStorage();
    }

    const removeProject = (selectedProject) => {
        const projectIndex = projects.findIndex(project => project.name == selectedProject.name);
        if (projectIndex > -1) {
            projects.splice(projectIndex, 1);
        } else {
            return
        }
        updateLocalStorage();
    }

    const addTodo = (todo) => {
        const projectIndex = projects.findIndex(project => project == UI.getCurrentProject());
        projects[projectIndex].todos.push(todo);
        updateLocalStorage();
    }

    const removeTodo = (selectedTodo) => {
        const projectIndex = projects.findIndex(project => project.todos.find(todo => todo === selectedTodo));
        const parentProject = projects[projectIndex];
        const todoIndex = parentProject.todos.indexOf(selectedTodo);
        if (todoIndex > -1) {
            parentProject.todos.splice(todoIndex, 1);
        } else {
            return
        }
        updateLocalStorage();
    }

    const updateLocalStorage = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const checkLocalStorage = () => {
        if (localStorage.getItem("projects")) {
            projects = JSON.parse(localStorage.getItem("projects"));
        }
    }

    checkLocalStorage();

    return {projects, addTodo, removeTodo, addProject, removeProject}
})();

const UI = (() => {

    // Menu & Navigation
    
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menu-button");
    const inboxButton = document.getElementById("inbox");
    const todayButton = document.getElementById("today");
    const thisWeekButton = document.getElementById("this-week");

    menuButton.addEventListener("click", () => toggleNav())
    inboxButton.addEventListener("click", () => renderProjectTodos(todoApp.projects[0]))
    todayButton.addEventListener("click", () => renderTodayTodos())
    thisWeekButton.addEventListener("click", () => renderWeekTodos())

    const toggleNav = () => {
        if(menu.className === "menu") {
            menu.className += " responsive";
        } else {
            menu.className = "menu";
        }
    }

    const renderTodayTodos = () => {
        const projectTitle = document.querySelector(".main-title"); 
        const todosContainer = document.getElementById("todos-container");
        let currentDate = format(new Date(), "yyyy-MM-dd");

        projectTitle.innerHTML = "Today";
        todosContainer.innerHTML = "";

        todoApp.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(todo.dueDate == currentDate){
                    renderTodo(todo);
                } else {
                    return
                }
            })
        })

        hideAddTodoButton();
    }

    const renderWeekTodos = () => {
        const projectTitle = document.querySelector(".main-title"); 
        const todosContainer = document.getElementById("todos-container");

        projectTitle.innerHTML = "This Week";
        todosContainer.innerHTML = "";

        todoApp.projects.forEach((project) => {
            project.todos.forEach((todo) => {
                if(isThisWeek(new Date(todo.dueDate)) == true) {
                    renderTodo(todo);
                } else {
                    return
                }
            })
        })

        hideAddTodoButton();
    }

    // Project Form

    const projectForm = document.getElementById("add-project-form");
    const projectInput = document.getElementById("add-project-input");
    const addProjectButton = document.getElementById("add-project");
    const submitProjectButton = document.getElementById("submit-project");
    const cancelProjectButton = document.getElementById("cancel-project");

    addProjectButton.addEventListener("click", () => showProjectForm())
    submitProjectButton.addEventListener("click", (e) => submitProject(e));
    cancelProjectButton.addEventListener("click", () => hideProjectForm())

    const showProjectForm = () => {
        projectForm.style.display = "block";
        addProjectButton.style.display = "none";
    }

    const hideProjectForm = () => {
        projectInput.value = "";
        projectForm.style.display = "none";
        addProjectButton.style.display = "block";
    }

    const submitProject = (e) => {
        if(projectInput.value == "") {
            return
        }

        const projectIndex = todoApp.projects.findIndex(project => project.name == projectInput.value);
        if (projectIndex > -1) {
            alert("A project with this name already exists. Please enter a different name.")
            e.preventDefault();
            return
        }

        todoApp.addProject(getProjectFromInput());
        renderProjectButton(getProjectFromInput())
        renderProjectTodos(getProjectFromInput());
        hideProjectForm();
    }

    const getProjectFromInput = () => {
        const projectName = projectInput.value;
        return new Project(projectName, []);
    }

    const renderProjectButton = (project) => {
        const projectIndex = todoApp.projects.findIndex(item => item.name == project.name);
        const storedProjects = document.getElementById("stored-projects");
        const projectButton = document.createElement("button");
        const deleteButton = document.createElement("i");

        projectButton.classList.add("project-title");
        deleteButton.classList.add("fas");
        deleteButton.classList.add("fa-times");

        projectButton.innerHTML = `<i class="fas fa-circle"></i>${project.name}`;

        storedProjects.appendChild(projectButton);
        projectButton.appendChild(deleteButton);

        projectButton.addEventListener("click", () => renderProjectTodos(todoApp.projects[projectIndex]))
        projectButton.addEventListener("mouseenter", () => showProjectDeleteButton())
        projectButton.addEventListener("mouseleave", () => hideProjectDeleteButton())
        
        deleteButton.addEventListener("click", (e) => {
            if(project.name == getCurrentProject().name) {
                todoApp.removeProject(project);
                renderTodoApp();
            } else {
                todoApp.removeProject(project);
                refreshProjects();
            }

            e.stopPropagation();
        })

        const showProjectDeleteButton = () => {
            deleteButton.style.display = "block";
        }

        const hideProjectDeleteButton = () => {
            deleteButton.style.display = "none";
        }
    }

    const getCurrentProject = () => {
        const projectName = document.querySelector(".main-title").innerHTML;
        const projectIndex = todoApp.projects.findIndex(project => project.name == projectName);
        return todoApp.projects[projectIndex];
    }
    
    // Add Todo Form 

    const todoForm = document.getElementById("add-todo-form");
    const todoNameInput = document.getElementById("todo-name-input");
    const todoPriorityInput = document.getElementById("todo-priority-input");
    const todoDateInput = document.getElementById("todo-date-input");
    const addTodoButton = document.getElementById("add-todo-button");
    const submitTodoButton = document.getElementById("submit-todo");
    const cancelTodoButton = document.getElementById("cancel-todo");

    addTodoButton.addEventListener("click", () => {
        showTodoForm();
        hideAddTodoButton();
    });

    submitTodoButton.addEventListener("click", (e) => submitTodo(e));

    const submitTodo = (e) => {
        const todoIndex = getCurrentProject().todos.findIndex(todo => todo.name == todoNameInput.value);

        if (todoIndex > -1) {
            alert("This todo already exists within this project.")
            e.preventDefault();
            return
        }

        if (todoNameInput.value == "" || todoDateInput.value == "" || todoPriorityInput.value == "") {
            return
        }

        todoApp.addTodo(getTodoFromInput());
        renderProjectTodos(getCurrentProject());
        hideTodoForm();
    }

    cancelTodoButton.addEventListener("click", () => {
        hideTodoForm();
        showAddTodoButton();
    })

    const getTodoFromInput = () => {
        const name = todoNameInput.value;
        const dueDate = todoDateInput.value;
        const priority = todoPriorityInput.value;

        return new Todo(name, dueDate, priority);
    }

    const showTodoForm = () => {
        todoForm.style.display = "block";
        hideAddTodoButton();
    }

    const hideTodoForm = () => {
        todoNameInput.value = "";
        todoDateInput.value = "";
        todoPriorityInput.value = "";
        todoForm.style.display = "none";
    }

    const hideAddTodoButton = () => {
        addTodoButton.style.display = "none";
    }

    const showAddTodoButton = () => {
        addTodoButton.style.display = "block";
    }

    const renderTodo = (todo) => {
        const todosContainer = document.getElementById("todos-container");
        const todoDiv = document.createElement("div");
        const circle = document.createElement("i");
        const todoContent = document.createElement("div");
        const todoData = document.createElement("div");
        const todoDate = document.createElement("div");
        const todoPriority = document.createElement("div");
        
        todoDiv.classList.add("todo");
        circle.classList.add("far");
        circle.classList.add("fa-circle");
        circle.classList.add("todo-circle");
        todoContent.classList.add("todo-content");
        todoData.classList.add("todo-data");
        todoDate.classList.add("todo-date");
        todoPriority.classList.add("todo-priority");

        todoContent.innerHTML = `${todo.name}`;
        todoDate.innerHTML = `Due ${format(parseISO(todo.dueDate), 'PPPP')}`
        todoPriority.innerHTML = `${todo.priority} Priority`

        todosContainer.appendChild(todoDiv);
        todoDiv.appendChild(circle);
        todoDiv.appendChild(todoContent);
        todoDiv.appendChild(todoData);
        todoData.appendChild(todoDate);
        todoData.appendChild(todoPriority);

        circle.addEventListener("click", () => {
            todoApp.removeTodo(todo)

            if (document.querySelector(".main-title").innerHTML == "Today"){
                renderTodayTodos();
            } else if (document.querySelector(".main-title").innerHTML == "This Week") {
                renderWeekTodos();
            } else {
                renderProjectTodos(getCurrentProject());
            }
        })
    }

    // Rendering Functions

    const renderProjectTodos = (project) => {
            const projectTitle = document.querySelector(".main-title"); 
            const todosContainer = document.getElementById("todos-container");
            const todos = project.todos;
            projectTitle.innerHTML = project.name;
            todosContainer.innerHTML = "";
    
            if(todos !== "") {
                todos.forEach((todo) => renderTodo(todo))
            }
            else {
                return
            }

            showAddTodoButton();
    }

    const refreshProjects = () => {
        const storedProjects = document.getElementById("stored-projects");
        storedProjects.innerHTML = "";

        todoApp.projects.forEach((project) => {
            if(project.name !== "Inbox") {
                renderProjectButton(project);
            }
        })
    }

    const renderTodoApp = () => {
        const title = document.getElementById("main-title");
        const todosContainer = document.getElementById("todos-container");
        const storedProjects = document.getElementById("stored-projects");
        const todos = todoApp.projects[0].todos;

        title.innerHTML = todoApp.projects[0].name;
        todosContainer.innerHTML = "";
        storedProjects.innerHTML = "";

        todos.forEach((todo) => renderTodo(todo))

        todoApp.projects.forEach((project) => {
            if(project.name !== "Inbox") {
                renderProjectButton(project);
            }
        })
    }

    renderTodoApp();

    return {getCurrentProject}
})();