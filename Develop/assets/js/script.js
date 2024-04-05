// Retrieve tasks and nextId from localStorage

//Gathers all Tasks
function getTasks() {
    //Array to store the posts
    const allTasks = [];
  
    // Loop through all localStorage keys that might contain post data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      // Check if the key starts with "posts_data_" key
      if (key.startsWith("task_")) { 
          const taskDataJSON = localStorage.getItem(key);
          const taskData = JSON.parse(taskDataJSON);
          allTasks.push(taskData);
      }
      }
      return allTasks;
 }


 

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp =Date.now();
    return timestamp;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

        const taskEL =$('<div>');
        taskEL.addClass('task-card');
    
        const titleEL =$('<h4>');
        const reminderEL =$('<p>');
        const dueEL =$('<p>');
        const deleteButton = $('<button>');
    
        titleEL.text(task.title[0]);
        reminderEL.text(task.reminder[0]);
        dueEL.text(task.date[0]);
        deleteButton.text('Delete');
        deleteButton.addClass('btn btn-danger');
        deleteButton.id='deleteME-btn';
    
        taskEL.append(titleEL);
        taskEL.append(reminderEL);
        taskEL.append(dueEL);
        taskEL.append(deleteButton);
        taskEL.data('taskData', task); // Store task data
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let allTasks =[];
    allTasks=getTasks();
    // Loop through all tasks
    for (let i = 0; i < allTasks.length; i++) {
      const taskCard = createTaskCard(allTasks[i]); // Create task card element
  
      // Append task card to the appropriate container
      if (allTasks[i].category[0] === "DO") {
        $('#todo-cards').append(taskCard);
      } else if (allTasks[i].category[0] === "WIP") {
        $('#in-progress-cards').append(taskCard);
      } else {
        $('#done-cards').append(taskCard);
      }
  
      // Make the task card draggable (using jQuery UI)
      taskCard.draggable({
        containment: '#all-tasks-container',
        revert: 'invalid'
      });
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

    const id=generateTaskId();
  
    event.id.push(id);

    const eventsJSON = JSON.stringify(event);


    
    localStorage.setItem(`task_${id}`, eventsJSON);
    taskEL.data('taskData', event);

}

// Todo: create a function to handle deleting a task
 function handleDeleteTask(event){
    console.log("Pressed");
     const taskElement = event.target.closest('.task-card');  // Find closest task card element
     const taskData = taskElement.data('taskData');         // Retrieve task data
  
     if (taskData) { // Check if taskData exists before accessing properties
       const taskId = taskData.id;                             // Extract task ID
       localStorage.removeItem(`task_${taskId}`);            // Remove from local storage
       taskElement.remove();                                 // Remove from UI
      console.warn("Clicked element doesn't have associated task data"); // Handle missing data
     }

 }




// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {


  
    let allTasks=[];
    allTasks=getTasks();
    console.log(allTasks);
    console.log(typeof allTasks);
    renderTaskList(allTasks);
    


    $("#openDialogBtn").click(function() {
      $('#myDialog').modal('show');

      $(function () {
        $('#datepicker').datepicker({
          changeMonth: true,
          changeYear: true,
        });
      });

      let allTasks=[];
      allTasks=getTasks();
      console.log(allTasks);
      console.log(typeof allTasks);

     

      $("#submit").click(function() {
     

      const titleInputEL = document.getElementById("title");
      const datepickerInputEL = document.getElementById("datepicker");
      const taskTextareaEL = document.getElementById("task");
      const statusEL="DO";

      let event ={title:[], date:[], reminder:[],category:[],id:[]};

      event.title.push($ (titleInputEL).val());
      event.date.push($ (datepickerInputEL).val());
      event.reminder.push($ (taskTextareaEL).val());
      event.category.push(statusEL);
        handleAddTask();
        renderTaskList(allTasks);


    });
 
    });
    $('#all-tasks-container').on('click', '.deleteME-btn', handleDeleteTask);

    $('#deleteME-btn').click(function() {
        console.log("Delete button clicked!");
      });

  });