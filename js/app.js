// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localStorage
let data = localStorage.getItem("TODO");

// Check if Data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list 
    loadList(LIST); // load the lists to the user interface (UI)
} else {
    LIST = [];
    id = 0;
}


// Load items to the user's interface (UI)
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the localStorage (CLEAR BUTTON)
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Display current date (today)
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add To-Do function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    // Check if task is completed 
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = ` 
                <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Add task (item) to the to-do list when user hits Enter key  
document.addEventListener("keyup", function (even) {
    if (even.keyCode == 13) {
        const toDo = input.value;

        // If input is not empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,

            });
            // Add item to localStorage (must be added where LIST array gets updated) 
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";

    }
});

// Function for when user completes a task
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Function to remove/delete a task from list
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; // return selected element inside the list 
    const elementJob = element.attributes.job.value; // complete or delete 

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // Add item to localStorage (must be added to where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});