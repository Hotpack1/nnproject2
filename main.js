let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];



addButton.addEventListener("click",addTask);

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task);
        console.log(taskList);
        render();
    
}

function render(){
    let resultHTMl = "";
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete==true){
            resultHTMl += 
            `<div class="task" style="background-color:lightgray">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div class="button-area">
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
            </div>`;
        }
        else{
            resultHTMl += 
            `<div class="task">
                <div>${taskList[i].taskContent}</div>
                <div class="button-area">
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
        </div>`;
        }
        
    }


    document.getElementById("task-board").innerHTML = resultHTMl;
}

function toggleComplete(id) {
    console.log("id: ",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete =!taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    } 
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
