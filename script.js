const addTaskBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#list-tasks");
const ids = []
let id = 0;

addTaskBtn.addEventListener('click', createTask);

function createTask(){
    id++
    ids.push(id)
    const li = document.createElement('li');
    li.classList = ("single-task")
    li.id=(`li${id}`)
    const input = document.createElement("input"); 
    input.type = "text"; 
    input.placeholder = "Digite sua tarefa..."; 
    input.classList = "task-field undone"

    const finishBtn = document.createElement("button");
    finishBtn.textContent = "✔"; 
    finishBtn.classList.add("done-btn");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X"; 
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener('click', (x)=>{
        idTask = x.target.parentElement.id
        removeLi(idTask);
    })

    finishBtn.addEventListener("click", () => {
        li.classList.toggle("undone"); 
        li.classList.toggle("done"); 

        input.disabled = !input.disabled;
    });

    li.appendChild(input);
    li.appendChild(finishBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    
    function removeLi(id) {
        const li = document.getElementById(id);
        li.remove(); 
        
      }

}


