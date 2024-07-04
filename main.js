let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all'
let filterList = [];
let underLine = document.getElementById("under-line");

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown",function(event){
    if(event.keyCode === 13) {
        addTask();
    }
})

function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }

    if(taskInput.value === ""){
        alert("한 글자 이상 입력해주세요.");
        return;
    }
    taskList.push(task);
        console.log(taskList);
        render();
        taskInput.value='';
    
}

function render(){
    let list = []
    if(mode === "all"){
        list = taskList;
    }
    else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    

    let resultHTMl = "";
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTMl += 
            `<div class="task speed" style="background-color:skyblue; opacity:0.5;">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="button-area">
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-droplet"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
            </div>`;
        }
        else{
            resultHTMl += 
            `<div class="task">
                <div>${list[i].taskContent}</div>
                <div class="button-area">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-cannabis"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
    filter();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    } 
    filter();
}

function filter(event){
    if(event){
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.top = event.target.offsetTop + event.target.offsetHeight + "px";
        mode = event.target.id
    }
    
    filterList = []
    
    if(mode === "all"){
        render();
    }
    else if(mode === "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render(); 
        console.log("진행중",filterList);
    } 
   
    else if(mode === "done"){
        for(let i =0;i<taskList.length;i++){
            if(taskList[i].isComplete ===true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
