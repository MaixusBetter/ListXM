# Task Board List XM

A simple Kanban board for task management using HTML, CSS, JavaScript, and Bootstrap. This project allows users to add, delete, and manage tasks across different stages: To Do, In Progress, and Done.

## Features

- Add new tasks with a title, description, and due date.
- Delete existing tasks.
- Drag and drop tasks between To Do, In Progress, and Done lanes.
- Persist tasks using localStorage so they remain even after page reloads.
- Due date input with a date picker for ease of use.

## Technologies Used

- HTML
- CSS (Bootstrap)
- JavaScript (jQuery, jQuery UI, day.js)

## Setup and Usage

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/task-board.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-board
    ```
3. Open `index.html` in your preferred web browser.

## File Descriptions

### index.html

The main HTML file containing the structure of the Task Board, including:
- A header section with the title and description.
- A button to open the modal for adding new tasks.
- A modal form to input the task details (title, description, due date).
- The swim lanes (To Do, In Progress, Done) for managing tasks.

### assets/css/style.css

Custom CSS file for additional styling beyond what is provided by Bootstrap.

### assets/js/script.js

JavaScript file containing the logic for:
- Generating unique task IDs.
- Creating and rendering task cards.
- Handling the addition and deletion of tasks.
- Making the task cards draggable and droppable between lanes.
- Persisting tasks and the next task ID using localStorage.

## Usage

- Click on the "Add Task" button to open the modal form.
- Fill in the task title, description, and due date, then click "Add Task".
- Drag and drop tasks between the To Do, In Progress, and Done lanes.
- Click the delete button on a task to remove it.

## Dependencies

- [Bootstrap 5.1.3](https://getbootstrap.com/)
- [FontAwesome 5.8.1](https://fontawesome.com/)
- [Google Fonts - Open Sans](https://fonts.google.com/)
- [jQuery 3.4.1](https://jquery.com/)
- [jQuery UI 1.13.1](https://jqueryui.com/)
- [day.js 1.11.3](https://day.js.org/)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## License

This project is licensed under the MIT License.

© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
