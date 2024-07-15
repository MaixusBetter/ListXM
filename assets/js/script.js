// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
  return `
    <div class="card mb-2" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.task}</p>
        <p class="card-text"><small class="text-muted">${task.date}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>
  `;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
  const todoContainer = $("#todo-cards");
  const inProgressContainer = $("#in-progress-cards");
  const doneContainer = $("#done-cards");

  todoContainer.empty();
  inProgressContainer.empty();
  doneContainer.empty();

  taskList.forEach(task => {
    const taskCard = createTaskCard(task);
    switch (task.status) {
      case 'To Do':
        todoContainer.append(taskCard);
        break;
      case 'In Progress':
        inProgressContainer.append(taskCard);
        break;
      case 'Done':
        doneContainer.append(taskCard);
        break;
    }
  });

  $(".card").draggable({
    revert: "invalid",
    helper: "clone"
  });
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const task = document.getElementById('task').value;

  if (title && date && task) {
    const newTask = {
      id: generateTaskId(),
      title,
      date,
      task,
      status: 'To Do'
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    localStorage.setItem('nextId', JSON.stringify(nextId));

    // Clear the form
    document.getElementById('myForm').reset();

    // Close the modal
    $('#myDialog').modal('hide');

    renderTaskList();
  } else {
    alert('Please fill out all fields.');
  }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).closest('.card').data('id');
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.data('id');
  const newStatus = $(event.target).closest('.lane').find('.card-title').text();

  const task = taskList.find(task => task.id === taskId);
  task.status = newStatus;
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#submit").on('click', handleAddTask);
  $(document).on('click', '.delete-task', handleDeleteTask);

  $(".lane").droppable({
    accept: ".card",
    drop: handleDrop
  });

  $("#date").datepicker();
});
