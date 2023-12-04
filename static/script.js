document.addEventListener('DOMContentLoaded', function () {
    // Selectors
    const newTaskInput = document.getElementById('new-task');
    const addButton = document.querySelector('button');
    const incompleteTasksHolder = document.getElementById('incomplete-tasks');
    const completedTasksHolder = document.getElementById('completed-tasks');
    const clearButton = document.getElementById('clear');

    // Functions
    function createNewTaskElement(taskString) {
        // Create List Item
        const listItem = document.createElement('li');

        // Input (checkbox)
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        // Label
        const label = document.createElement('label');
        label.innerText = taskString;

        // Input (text)
        const editInput = document.createElement('input');
        editInput.type = 'text';

        // Buttons (Edit and Delete)
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.innerText = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerText = 'Delete';

        // Appending elements to listItem
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function addTask() {
        const taskInputValue = newTaskInput.value;
        if (taskInputValue !== '') {
            // Create a new task element with the entered value
            const listItem = createNewTaskElement(taskInputValue);

            // Append the new task to the incomplete tasks list
            incompleteTasksHolder.appendChild(listItem);

            // Bind task events (edit and delete)
            bindTaskEvents(listItem, completeTask);

            // Clear the input field
            newTaskInput.value = '';
        }
    }

    function completeTask() {
        // Move the completed task to the completed tasks list
        const listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);

        // Bind task events (edit and delete)
        bindTaskEvents(listItem, incompleteTask);
    }

    function incompleteTask() {
        // Move the incomplete task to the incomplete tasks list
        const listItem = this.parentNode;
        incompleteTasksHolder.appendChild(listItem);

        // Bind task events (edit and delete)
        bindTaskEvents(listItem, completeTask);
    }

    function deleteTask() {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;

        // Remove the parent list item from the ul
        ul.removeChild(listItem);
    }

    function editTask() {
        const listItem = this.parentNode;
        const editInput = listItem.querySelector('input[type=text]');
        const label = listItem.querySelector('label');
        const containsClass = listItem.classList.contains('editMode');

        // Toggle edit mode
        if (containsClass) {
            // Switch back from edit mode
            label.innerText = editInput.value;
        } else {
            // Switch to edit mode
            editInput.value = label.innerText;
        }

        // Toggle the 'editMode' class
        listItem.classList.toggle('editMode');
    }

    function bindTaskEvents(listItem, checkboxEventHandler) {
        const checkBox = listItem.querySelector('input[type=checkbox]');
        const editButton = listItem.querySelector('button.edit');
        const deleteButton = listItem.querySelector('button.delete');

        // Bind the editTask function to the edit button
        editButton.onclick = editTask;

        // Bind the deleteTask function to the delete button
        deleteButton.onclick = deleteTask;

        // Bind the checkboxEventHandler function to the checkbox
        checkBox.onchange = checkboxEventHandler;
    }

    function clearTasks() {
        // Clear both incomplete and completed tasks
        incompleteTasksHolder.innerHTML = '';
        completedTasksHolder.innerHTML = '';
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearTasks);

    // Initial task events binding
    for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
        bindTaskEvents(incompleteTasksHolder.children[i], completeTask);
    }

    for (let i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], incompleteTask);
    }
});