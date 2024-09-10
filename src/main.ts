//type todolist to save in list
type ToDoListTask = {
  task: string,
  date: string,
  time: string,
  done: boolean,
  expire: boolean,
}

const ab = document.getElementById("addTask")as HTMLButtonElement;
const sort = document.getElementById("sortByDate") as HTMLButtonElement;
let li: ToDoListTask[] = []

sort?.addEventListener("click", () =>{

  const sorted = li.sort(
    (a:ToDoListTask,b:ToDoListTask) => new Date(b.date).getTime()- new Date(a.date).getTime());
  console.log("IT'S SORTING")
  console.log("THE DOM PLSS HUUHUUHUHU")
  console.log(sorted)

  const taskList = document.getElementById("taskList") as HTMLUListElement;
  taskList.innerHTML = "";


  sorted.forEach((element)=> render(element));
  saveTasksToLocalStorage();
});

ab?.addEventListener("click", () => {
  const input = document.getElementById("inputField") as HTMLInputElement;
  const task: string = input.value;
  const date = document.getElementById("date") as HTMLInputElement;
  const sortingDate = date.value;
  const time = document.getElementById("time") as HTMLInputElement;
  const ddlTime = time.value;
  

  if (task && "" || sortingDate && "" || ddlTime && ""){
    alert("Empty input fields")

    input.style.borderColor = "red";
    time.style.borderColor = "red"
    date.style.borderColor = "red";
    
  } if (task === ""){
    alert("Please input your task")
  } if (sortingDate === ""){
    alert("Input your deadline date")
  } if (ddlTime === ""){
    alert("Input your deadline time")
  }else{

    const todo: ToDoListTask = {
      task: task,
      date: sortingDate,
      time: ddlTime,
      done: false,
      expire: false,
    }
    newTask(todo);
    render(todo);
    input.value = "";
    date.value =  "";
    time.value = "";
    input.style.borderColor = "#dbb22a";
  };



});

function newTask(toDoTask:ToDoListTask){
  li.push(toDoTask);
  // saveTasksToLocalStorage();
}

function render(toDoTask: ToDoListTask){
  //for my tasklists
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  const list = document.createElement("div");
  const taskText = document.createTextNode(toDoTask.task); 
  const date = new Date(toDoTask.date)
  const sortingDate = date.toDateString();

  const spanTime = document.createElement("span")
  const ddlTime = toDoTask.time;
  

  list.setAttribute("class", "tasks")
  taskList.setAttribute("class", "taskList")
  spanTime.setAttribute("class", "time")

  if (!toDoTask.date || !toDoTask.time) {
    return;
  }
  

  
  console.log(sortingDate)

  //for ui done

  let done = toDoTask.done
  const icon = document.createElement("i");
  icon.id = "i"
  icon.className ="fa-solid fa-check";

  if (done) {
    list.classList.toggle("done");
    list.classList.remove("notDone");
    icon.style.display ="inline";

    list.append(icon);
    taskList.append(list);

  } if (!done) {
    list.classList.toggle("notDone");
    list.classList.remove("done");
    list.classList.remove("i");
    icon.style.display = "none";
    
    taskList.prepend(list);
  } 

  list.addEventListener("click", ()=> {
    done = !done
    if (done) {
      list.classList.toggle("done");
      list.classList.remove("notDone");
      icon.style.display ="inline";
  
      list.append(icon);
      taskList.append(list);
  
    
    } if (!done) {
      list.classList.toggle("notDone");
      list.classList.remove("done");
      list.classList.remove("i");
      icon.style.display = "none";
      
      taskList.prepend(list);
    } 
    
    toDoTask.done = done

    saveTasksToLocalStorage()
  });

  //for delete button 

  const db = document.createElement("button")
  db.textContent = "𝕏"
  db.setAttribute("class", "deleteBtn")

  db.addEventListener("click", () => {
    taskList.removeChild(list);
    list.style.display = "none";
    icon.style.display = "none";
    
    console.log("deleted lol")
    li = li.filter((todo) => todo !== toDoTask);
    saveTasksToLocalStorage()
  });


  //for expiry

  const expiredTask = expired(toDoTask)

  if (expiredTask){
    list.style.backgroundColor = "black";
    const expDiv = document.createElement("div")
    const expiredText = document.createTextNode("STATUS: EXPIRED");
    expDiv.appendChild(expiredText);
    list.append(expDiv);
    list.style.color = "white"


    expDiv.setAttribute("class", "expiredText")
  
  }


  
  //for grouping them together
  spanTime.append(ddlTime);
  list.appendChild(taskText);
  list.appendChild(db);
  list.append(sortingDate);
  list.append(spanTime);
  taskList.prepend(list);
  icon.style.display = "none";

  saveTasksToLocalStorage();

  console.log(expired(toDoTask))


};

function expired(toDoTask: ToDoListTask){
  const taskDate = toDoTask.date
  const taskTime = toDoTask.time
  const taskTimeAndDate = `${taskDate}T${taskTime}`
  console.log(taskTimeAndDate)

  const timeAndDate = new Date(taskTimeAndDate).getTime()
  const currentDateAndTime = new Date().getTime();

  let expire = toDoTask.expire

  
  if (timeAndDate < currentDateAndTime ){
    expire = true
    return expire
  } 
};

//local storage

function saveTasksToLocalStorage() {
  const stringified = JSON.stringify(li);
  localStorage.setItem("myTasks", stringified);
}

function loadTasksFromLocalStorage() {
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  taskList.innerHTML = " ";

  const retrieve = localStorage.getItem("myTasks");
  li = retrieve ? JSON.parse(retrieve) : [];

  console.log(li)
  li.forEach((todo) => render(todo))
}

loadTasksFromLocalStorage();





