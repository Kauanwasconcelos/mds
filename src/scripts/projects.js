document.addEventListener('DOMContentLoaded', function () {
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const cancelButton = document.getElementById('cancel-btn');
    let editingCard = null;

    
    const currentYear = new Date().getFullYear();
    startDateInput.min = `${currentYear}-01-01`;
    endDateInput.min = `${currentYear}-01-01`;
    endDateInput.max = `${currentYear + 50}-12-31`;


    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userSelect = document.getElementById('assigned-users');
        userSelect.innerHTML = ''; 

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            userSelect.appendChild(option);
        });
    }

    
    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projectList.innerHTML = ''; 

        projects.forEach((project, index) => {
            createProjectCard(project, index);
        });
    }

 
    function saveProject(project) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        if (editingCard !== null) {
            projects[editingCard] = project;
            editingCard = null;
        } else {
            projects.push(project);
        }
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
        projectForm.reset(); 
    }

   
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.classList.add('project-card');

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        const startDate = document.createElement('p');
        startDate.textContent = `Início: ${project.startDate}`;

        const endDate = document.createElement('p');
        endDate.textContent = `Término: ${project.endDate}`;

        const assignedUsers = document.createElement('p');
        assignedUsers.textContent = `Responsáveis: ${project.assignedUsers}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editProject(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteProject(index));

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(startDate);
        card.appendChild(endDate);
        card.appendChild(assignedUsers);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        projectList.appendChild(card);
    }

    
    projectForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const assignedUsers = Array.from(document.getElementById('assigned-users').selectedOptions).map(option => option.value);

        const project = {
            title,
            description,
            startDate,
            endDate,
            assignedUsers: assignedUsers.join(', '),
        };

        saveProject(project);
    });

    
    function editProject(index) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const project = projects[index];

        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('start-date').value = project.startDate;
        document.getElementById('end-date').value = project.endDate;

        const assignedUsers = document.getElementById('assigned-users');
        Array.from(assignedUsers.options).forEach(option => {
            option.selected = project.assignedUsers.includes(option.value);
        });

        editingCard = index;
    }

    // Delete project
    function deleteProject(index) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    }

    
    cancelButton.addEventListener('click', function () {
        editingCard = null;
        projectForm.reset();
    });

    loadUsers();
    loadProjects();
});
