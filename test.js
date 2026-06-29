const SERVER_URL = 'http://localhost:3000/projects';

const modal = document.querySelector('#modal');
const openAddModal = document.querySelector('#openAddModal');
const cancelBtn = document.querySelector('#cancelBtn');
const titleInput = document.getElementById("p-title");
const descInput = document.getElementById("p-desc");
const tagsInput = document.getElementById("p-tags");
const saveBtn = document.getElementById("saveBtn");
const projectsList = document.getElementById('projectsGrid');

let editingId = null;

function openModal() {
    editingId = null;
    document.getElementById("modalTitle").textContent = "New project";
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
    titleInput.value = '';
    descInput.value = '';
    tagsInput.value = '';
    editingId = null;
    document.getElementById("modalTitle").textContent = "New project";
}

async function loadProjects() {
    try {
        const response = await fetch(SERVER_URL);
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.log('Ошибка загрузки проектов:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projectsGrid');

    const cardsHTML = projects.map(function(project) {
        return `
            <div class="project-card">
                <h3>${project.title}</h3>
                <div class="project-description">${project.descripton ?? ''}</div>
                <div class="project-tools">
                    ${(project.tags ?? []).map(function(tag) {
                        return `<span class="tool">${tag}</span>`;
                    }).join('')}
                </div>
                <div class="actions">
                    <button class="icon-btn edit-btn" data-id="${project.id}">
                        <img src="./images/Pen.svg" alt="edit" class="icon-default" />
                        <img src="./images/Pen-white.svg" alt="" class="icon-hover" />
                    </button>
                    <button class="icon-btn icon-btn-danger delete-btn" data-id="${project.id}">
                        <img src="./images/Trash.svg" alt="delete" class="icon-default" />
                        <img src="./images/Trash-danger.svg" alt="" class="icon-hover" />
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const addCardHTML = `
        <div class="project-card add" id="addTile">
            <div class="plus">+</div>
            <div class="add-text">Add new project</div>
        </div>
    `;

    container.innerHTML = cardsHTML + addCardHTML;

    document.querySelector('#addTile').addEventListener('click', openModal);
}

projectsList.addEventListener("click", function(event) {
    const editBtn = event.target.closest(".edit-btn");
    if (editBtn) {
        openEditModal(editBtn.dataset.id);
        return;
    }

    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
        deleteProject(deleteBtn.dataset.id);
        return;
    }
});

async function openEditModal(id) {
    try {
        const response = await fetch(SERVER_URL + "/" + id);
        const project = await response.json();

        editingId = id;
        titleInput.value = project.title;
        descInput.value = project.descripton ?? '';
        tagsInput.value = (project.tags ?? []).join(", ");

        document.getElementById("modalTitle").textContent = "Edit project";
        modal.classList.add("open");
    } catch (error) {
        console.log("Ошибка загрузки проекта:", error);
    }
}

async function deleteProject(id) {
    if (!confirm("удалить?????")) return;
    try {
        await fetch(SERVER_URL + "/" + id, { method: "DELETE" });
        loadProjects();
    } catch (error) {
        console.log("Ошибка удаления:", error);
    }
}

saveBtn.addEventListener("click", async function() {
    const title = titleInput.value.trim();
    const descripton = descInput.value.trim();
    const tags = tagsInput.value.split(",").map(t => t.trim()).filter(Boolean);

    if (title === "") {
        alert("НАЗВАНИЕ ОБЯЗАТЕЛЬНО");
        return;
    }

    const projectData = { title, descripton, tags };

    try {
        if (editingId) {
            await fetch(SERVER_URL + "/" + editingId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
        } else {
            await fetch(SERVER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });
        }

        closeModal();
        loadProjects();
    } catch (error) {
        console.log("Ошибка сохранения проекта:", error);
    }
});

openAddModal.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
});

loadProjects();