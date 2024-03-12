 class Task{
    image;
    title;
    description;
    priorityLevel;
    deadline;
    constructor(image, title, description, deadline,  priorityLevel = 0){
    
        this.image = image;
        this.title = title;
        this.description = description;
        this.priorityLevel = priorityLevel;
        this.deadline = deadline;


      if (!this.tasks) {
            this.tasks = [];
        }

        this.tasks.push(this);
    }  
}



var task1 = new Task ("images/bills.jpg", "Pay bills", "Pay your electricity bill.", "10.03.24");
var task2 = new Task ("images/dinner.jpg", "Make dinner", " Boil pasta and make a sauce.", "10.03.24");
var task3 = new Task ("images/groceries.jpg", "Go grocery shopping", "Get groceries from Spar. Then, get fresh vegetables from the farmers market.", "10.03.24");
var task4 = new Task ("images/vet.jpg", "Get Luna to the vet", "Get the cat to the vet for her vaccination appointment.", "15.03.24");
var task5 = new Task ("images/bday.jpg", "Plan Anton's birthday", "Order a cake and send out the invitations for his birthday.", "27.05.24");
var task6 = new Task ("images/callMom.jpg", "Call mom", "Make a videocall with mom and dad over the weekend.", "16.03.24");
var task7 = new Task ("images/dishes.jpg","Wash the dishes", "Load the dishwasher, unload it and wash the rest of the dishes.", "10.03.24");
var task8 = new Task ("images/study.jpg", "Study for the exam", "Revise chapters 1-4, make flashcards and study previous tests.", "16.03.24");
var task9 = new Task ("images/plants.jpg", "Work in the garden", "Water the plants and plant new seeds for the upcoming spring.", "16.03.24");

let tasks = [task1, task2, task3,task4, task5, task6, task7, task8, task9 ];
createTasksInHtml();

function createTasksInHtml(){   
    document.getElementById("row").innerHTML = "";
  
    tasks.forEach(task => {

        const cardHTML= `
        
            <div class="col col1">         
                <div class="card card1">
                    <div class="card-body">
                        <div class="firstLine">
                            <div class="importance" style="background-color: ${importanceColor(task.priorityLevel).color};"> ${importanceColor(task.priorityLevel).text}</div>
                            <div>
                               <button class="edit" ><i class="bi bi-pen "></i> </button>
                                <i class="bi bi-bookmark"></i> 
                            </div>
                        </div>
            
                        <img class="card-img image1" src="${task.image} ">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text text1" id="editableText" >${task.description}</p>
                        <hr>
                        <div class="priority"> 
                            <p class="sth">
                                <i class="bi bi-exclamation-triangle-fill"></i>
                                Priority Level: <i class="level">${task.priorityLevel} </i>
                            </p>
                            <div class="buttons">
                                <button type="button" class="btn btn-outline-danger btn-sm decrease">Decrease</button>
                                <button type="button" class="btn btn-outline-primary btn-sm increase">Increase</button>
                            </div>
                        </div>
                        <div class="deadline"> 
                            <p> 
                                <i class="bi bi-calendar3"></i> Deadline: ${task.deadline} 
                            </p>
                        </div>
                        <hr>
                        <div class="buttons">
                            <button type="button" class="btn btn-danger delete"> 
                                <i class="bi bi-trash"></i> Delete
                            </button>
                            <button type="button" class="btn btn-success done ">      
                                <i class="bi bi-check-circle"></i> Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById("row").innerHTML += cardHTML;
    });

    increaseButton();
    decreaseButton();
    editTasks();
  
        
        
    let deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach((element,i) => {
        element.addEventListener("click", function (){
        tasks.splice(i,1);
         createTasksInHtml();            
        })
    })

    let doneButtons = document.querySelectorAll(".done");
    doneButtons.forEach((element,i) => {
        element.addEventListener("click", function (){
            tasks.splice(i,1);
            createTasksInHtml();
        })
    
    })
 
}


function increaseButton(){
    let increaseButtons = document.querySelectorAll(".increase");
    
    increaseButtons.forEach((element,i)=>{

        element.addEventListener("click", function (){
            if(tasks[i].priorityLevel <5){
                tasks[i].priorityLevel++
            } 
            
            createTasksInHtml();
        })
    })
}

function decreaseButton(){
    let decreaseButtons = document.querySelectorAll(".decrease");

    decreaseButtons.forEach((element,i)=>{
        element.addEventListener("click",function (){
            if(tasks[i].priorityLevel > 0){
                tasks[i].priorityLevel--
            }
            
            createTasksInHtml();
        })
    })
}

function importanceColor(myPriorityLevel){
    let importanceColor='',importanceText = '';
    if (myPriorityLevel <= 1 ) {
        importanceColor = "green";
        importanceText = "low importance";
    } else if (myPriorityLevel <=3) {
        importanceColor = "orange";
        importanceText = "moderate importance";
    } else {
        importanceColor = "red";
        importanceText = "high importance";
    }
    return { color: importanceColor, text: importanceText};
}




function sortTasksUp(){
    
       tasks.sort((a, b) => b.priorityLevel - a.priorityLevel);
        createTasksInHtml();

}


document.getElementById("sortUp").addEventListener("click", sortTasksUp);

function sortTasksDown(){
    
    tasks.sort((a, b) => a.priorityLevel - b.priorityLevel);
     createTasksInHtml();

}


document.getElementById("sortDown").addEventListener("click", sortTasksDown);

function sortTasksAplhabetically(){
    tasks.sort(function (a, b) {
        if (a.title < b.title) {
        return -1;
        }
        if (a.title > b.title) {
        return 1;
        }
        return 0;
    });
    createTasksInHtml();
}

document.getElementById("alphabetically").addEventListener("click",sortTasksAplhabetically);


function editTasks (){
    
    let editButtons = document.querySelectorAll(".edit");
    
    editButtons.forEach((element, i) => { 
     let isEditing = false;
     element.addEventListener("click", function (){
        const cardBody =element.closest('.card-body');
        const editableText =  cardBody.querySelector(".text1");
        if (!isEditing){
            editableText.contentEditable = true; 
            editableText.focus();
            isEditing = true;
            element.innerHTML = '<i class="bi bi-check"></i>'; 
            } else {
            tasks[i].description = editableText.textContent;
            editableText. contentEditable = false;
            isEditing =false;
            element.innerHTML = '<i class="bi bi-pencil"></i>';
            }
        })
    });
}

editTasks();