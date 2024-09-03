// import './style.css'
// import 'index.html'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'







// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


const ab = document.getElementById("addTask")as HTMLButtonElement;


ab?.addEventListener("click", () => {
  const input = document.getElementById("inputField") as HTMLInputElement;
  const task: string = input.value;

  if (task === "" ){
    input.style.borderColor = "red"
  } else{
    newTask(task);
    // donetask
    input.value = "";
    input.style.borderColor = "#fe979c";
  };
});




function newTask(task: string){
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  const list = document.createElement("div");
  const taskText = document.createTextNode(task); 
  list.setAttribute("class", "tasks")
  


  

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

      // list.classList.toggle("i");
      list.append(icon);
      taskList.append(list);
      
    } if (!done) {
      list.classList.toggle("notDone");
      list.classList.remove("done");
      list.classList.remove("i");
      icon.style.display = "none";
      
      taskList.prepend(list);
      
      // taskList.prepend(div);
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
  // if (done){
  //   list.appendChild(icon);
  // }else{};
  taskList.prepend(list);
  icon.style.display = "none";
  
};





