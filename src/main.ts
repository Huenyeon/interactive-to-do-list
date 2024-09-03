const ab = document.getElementById("addTask")as HTMLButtonElement;

ab?.addEventListener("click", () => {
  const input = document.getElementById("inputField") as HTMLInputElement;
  const task: string = input.value;

  if (task === "" ){
    input.style.borderColor = "red"
  } else{
    newTask(task);
    input.value = "";
    input.style.borderColor = "#fe979c";
  };
});



function newTask(task: string){
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  const list = document.createElement("div");
  const taskText = document.createTextNode(task); 
  list.setAttribute("class", "tasks")
  taskList.setAttribute("class", "taskList")
  

  let done =false
  const icon = document.createElement("i");
      icon.id = "i"
      icon.className ="fa-solid fa-check";

  list.addEventListener("click", ()=> {
    done = !done
    if (done) {
      list.classList.toggle("done");
      list.classList.remove("notDone");
      icon.style.display ="inline"


      list.append(icon);
      taskList.append(list);
      

    } if (!done) {
      list.classList.toggle("notDone");
      list.classList.remove("done");
      list.classList.remove("i");
      icon.style.display = "none";
      
      taskList.prepend(list);
    }
  });


  const db = document.createElement("button")
  db.textContent = "x"
  db.setAttribute("class", "deleteBtn")

  db.addEventListener("click", () => {
    taskList.removeChild(list);
    list.style.display = "none";
    icon.style.display = "none";
    
    console.log("deleted lol")
  });
  
  list.appendChild(taskText);
  list.appendChild(db);
  taskList.prepend(list);
  icon.style.display = "none";
  
};





