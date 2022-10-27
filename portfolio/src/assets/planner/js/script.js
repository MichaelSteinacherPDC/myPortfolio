//parse json so it can be used as array
let tasks = JSON.parse(taskJSON);

document.querySelector(".test")

// create empty priority array which will be filled dynamically according to data.json
let priorityArray = []

// made this a function because we need this multiple times
function createHTML(){
    for(let i in tasks){
        // run through every json element and create html for every entry
        document.getElementById("card-rows").innerHTML += 
        `<div id="card-overall" class="col-lg-4 col-md-6 col-12 mt-4">
            <div class="card border-dark shadow-lg">
                <div class="card-header card-image-top">
                    <div class="card-header-flex">
                        <span class="card-header-left">Task</span>
                        <span class="card-header-right">
                            <a href="#" class="card-icon">&#128278;</a>
                            <a href="#" class="card-icon">&#8942;</a>
                        </span>
                    </div>
                    <img class="card-image" src="images/${tasks[i].image}" alt="Card Image">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">${tasks[i].name}</h5>
                    <p class="card-text text-center">${tasks[i].description}</p>
                    <hr>
                    <p>&#x26A0; Priority Level: 
                        <button type="button" id="priority">${tasks[i].priority}</button>
                    </p>
                    <p>&#128197; Deadline: ${tasks[i].date}</p>
                    <p>&#128337; Duration: ${tasks[i].duration}</p>
                    <hr>
                    <div class="text-right">
                        <button type="button" class="btn btn-danger delete-button">🗑 Delete</button>
                        <button type="button" class="btn btn-success done-button">&#10003; Done</button>
                    <div>
                </div>
            </div>
        </div>`;
        
        
        priorityArray = document.querySelectorAll("#priority");
        setPriorityClass(i);        
    }  
}



// Initial creation of data to html
createHTML();

document.getElementById("sortButton").addEventListener("click", sortByPriorityValue);

// function to sort tasks by priority value
function sortByPriorityValue(){
    tasks.sort((a,b) => a.priority - b.priority);

    //delete all so html will be inserted again in sorted order 
    document.getElementById("card-rows").innerHTML =""; 
    createHTML();

    // calling incrementPriority when button is clicked    
    for(let i = 0; i < priorityArray.length; i++){
    priorityArray[i].addEventListener("click", function() {
        incrementPriority(i);
    })
}
}

// calling incrementPriority again
for(let i = 0; i < priorityArray.length; i++){
    priorityArray[i].addEventListener("click", function() {
        incrementPriority(i);
    })
}


// to change buttons classes between green, yellow and red
function setPriorityClass(i){
    priorityArray[i].classList.add("btn");
    if(tasks[i].priority <= 1){
        priorityArray[i].classList.add("btn-success");
    }else if(tasks[i].priority <= 3)
    {
        priorityArray[i].classList.add("btn-warning");
    }else if(tasks[i].priority <= 5){
        priorityArray[i].classList.add("btn-danger");
    }
}

// increment function to change value of priority field
function incrementPriority(i){
    if(tasks[i].priority < 5){
        tasks[i].priority += 1;

        priorityArray[i].innerHTML = tasks[i].priority;
       
        priorityArray[i].removeAttribute("class");
        setPriorityClass(i);
    }
}


// ------------------------------------------------------

// EXTRA WORK - i wanted to do this for myself to understand this topic better
// what i wanted to do was to "delete" (hide) the card when "delete" or "done" Button is clicked

let deletedArray = document.querySelectorAll(".delete-button");
let doneArray = document.querySelectorAll(".done-button");
let cardArray = document.querySelectorAll("#card-overall");

let myNumber=  1;

for(let i = 0; i < deletedArray.length; i++){
    deletedArray[i].addEventListener("click", function(){
        deleteOrDoneCard(i);
    })
    doneArray[i].addEventListener("click", function() {
        deleteOrDoneCard(i);
    })
    deletedArray[i].addEventListener("click", function(){
        console.log(i);
    })
}


function deleteOrDoneCard(i){
    cardArray[i].classList.add("d-none");
}


