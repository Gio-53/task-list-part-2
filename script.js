const addTaskBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#list-tasks");
//"✔"
const ids = getIds();
let id;



if(ids.length<1){
    id = 0;
}else{
    let id1 = ids[ids.length-1]
    id1 = id1.split('li');
    id1 = parseInt(id1[1]);
    id = id1;
    
}

document.addEventListener('DOMContentLoaded',()=>renderLocalStorage())

addTaskBtn.addEventListener('click', addTask);

function createTask(id, text, status){  
    const li = document.createElement('li');
    li.classList = ("single-task");
    if(typeof id === "number"){
        li.id = 'li'+id;
        updateIds(ids, 'li'+id)
    }else{
        li.id = id;
        updateIds(ids, id)
    }
    if(status)li.classList.add('done')
    
        
    const input = document.createElement("input"); 
    input.type = "text"; 
    input.placeholder = "Digite sua tarefa..."; 
    input.classList = "task-field"
    
    if(text.length>0)input.value=text;
    input.addEventListener('input',()=>updateLocalStorage())
    
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "✔"; 
    finishBtn.classList.add("done-btn");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X"; 
    removeBtn.classList.add("remove-btn");

    finishBtn.addEventListener("click", () => {
        li.classList.toggle("done"); 
        input.disabled = !input.disabled;
        updateLocalStorage()
    });

    removeBtn.addEventListener("click", (x)=>{
        let idTask = x.target.parentElement.id;
        removeLi(idTask)        
    })

    li.appendChild(input);
    li.appendChild(finishBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    updateLocalStorage();       
}

function addTask(){
    id++;
    createTask(id, '', false);
}

function removeLi(id){
    const li = document.getElementById(id);
    li.remove();
    updateLocalStorage()
    updateIds(ids,id);
}

function updateLocalStorage (){
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            id: li.id,
            text: li.querySelector("input").value,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task)=>{
        const taskId = task.id;
        const taskText = task.text;
        const taskStatus = task.done;
        createTask(taskId, taskText, taskStatus)
        
    }
    )
}

function getIds(){  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const ids = []
    tasks.forEach((task)=>{
        ids.push(task.id)
    })
    return ids
}

function updateIds(arr, id){
    arr.push(id)
    localStorage.setItem('ids', JSON.stringify(arr));   
}