// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime(); 
    const randomNum = Math.floor(Math.random() * 1000); 

    return `task_${timestamp}_${randomNum}`;
}

function createTaskCard(task) {
    const { id, title, description, deadline, status } = task;

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-task-id', id);

    taskCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Deadline: ${deadline}</p>
        <p>Status: ${status}</p>
        <button class="delete-task-btn">Delete</button>
    `;

    return taskCard;
}

function renderTaskList(tasks) {
    const taskBoardContainer = document.getElementById('task-board-container');
    taskBoardContainer.innerHTML = ''; 

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        taskBoardContainer.appendChild(taskCard);
    });

    
    $('.task-card').draggable({
        revert: 'invalid',
        cursor: 'move',
        zIndex: 1000
    });
}
function addNewTask(title, description, deadline) {
    const newTask = {
        id: generateTaskId(), 
        title: title,
        description: description,
        deadline: deadline,
        status: 'Not Yet Started'
    };

    
    tasks.push(newTask); 

    
    renderTaskList(tasks);
}
function addNewTask(title, description, deadline) {
    const newTask = {
        id: generateTaskId(), 
        title: title,
        description: description,
        deadline: deadline,
        status: 'Not Yet Started'
    };

    
    tasks.push(newTask);
    renderTaskList(tasks);
}

function deleteTask(taskId) {
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        
        tasks.splice(taskIndex, 1);

        
        renderTaskList(tasks);
    } else {
        console.log('Task not found');
    }
}

function handleDrop(event, status) {
    const taskId = event.dataTransfer.getData('text/plain'); 
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);

    if (taskCard) {
        // Update the status of the task
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.status = status; 
            renderTaskList(tasks); 
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Render the task list on page load
    renderTaskList(tasks);

    // Add event listeners for adding new tasks
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', openAddTaskModal);

    // Make lanes droppable
    const lanes = document.querySelectorAll('.status-lane');
    lanes.forEach(lane => {
        lane.addEventListener('drop', function(event) {
            event.preventDefault();
            const status = lane.dataset.status;
            handleDrop(event, status);
        });
        lane.addEventListener('dragover', function(event) {
            event.preventDefault();
        });
    });

    // Make the due date field a date picker
    const dueDateField = document.getElementById('deadline');
    dueDateField.type = 'date';
});