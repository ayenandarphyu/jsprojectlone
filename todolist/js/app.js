//UI
const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');

function addtask(e){
    // console.log('hay');

    if(taskinput.value === ''){
        window.alert("Plz.. Add a task");
        return;
    }

    // if(taskinput.value === ''){
    //     window.alert("Plz.. Add a task");
    // }else{}


    // console.log(taskinput.value);

    // create li element
    const li =document.createElement('li');

    // add class
    // li.classList.add('collection-item');
    li.className = "collection-item";

    // create text node append to li
    li.appendChild(document.createTextNode(taskinput.value));

    // create link
    const link = document.createElement('a');

    // add class
    link.className = "delete-item secondary-content";

    // add icon
    link.innerHTML = `<i class = "far fa-trash-alt"></i>`;


    // console.log(link);

    // append link to li
    li.appendChild(link);

    // console.log(li);

    // append li to ul
    tasklist.appendChild(li);

    // store in locak storage
    storetaskinlocalstorage(taskinput.value);

    e.preventDefault();
}


// remove task
function removetask(e){
    // console.log('hay');
    // console.log(e.target);

    // console.log(e.target.parentElement);

        // i        a
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('delete item');

        if(confirm('Are you sure?')){

            // i     a             li
        e.target.parentElement.parentElement.remove();

        }
    }

    // remove task from localstroage
    removetaskfromlocalstorage(e.target.parentElement.parentElement);


}

// Claar tasks
function cleartasks(){
    // console.log('hay');

    // method 1
    // tasklist.innerHTML='';

    // method 2
    // console.log(tasklist.childElementCount);


    // let x = 0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
    // }


    // method 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    // CLear all data from local storage
    cleartasksfromlocalstorage();

}

// store task

function storetaskinlocalstorage(task){
    // console.log(task);

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{

                // json.parse ka object(array) change tar string
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(typeof tasks);
    }

    tasks.push(task);

    // console.log(tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));


}

// Get tasks from local storage
function gettasks(){
    // console.log('hay');

    let tasks;

    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        // console.log(task);

       // create li element
        const li = document.createElement('li');

        // add class
        li.className = "collection-item";

        // create text note and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = "delete-item secondary-content";
        // add icon
        link.innerHTML = `<i class = "far fa-trash-alt"></i>`;
        // append link to li
        li.appendChild(link);

        // console.log(li);

        tasklist.appendChild(li);



    });

}

// gettasks();


// remove task from local storage
function removetaskfromlocalstorage(taskitem){
    // console.log('hay');
    // console.log(taskitem.textContent);
    // console.log(taskitem.innerText);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{

        // console.log(task);

        if(taskitem.textContent === task){
            // where we want to start (index) where we want to end how many
            tasks.splice(index,1);
        }

    });

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Clear all data from localStorage
function cleartasksfromlocalstorage(){
    localStorage.clear();
}

// filter tasks
function filtertasks(e){
    // console.log('hay');
    // console.log(e.target);
    const inputfilter = e.target.value.toLowerCase();
    // console.log(inputfilter);

    const tasks = document.querySelectorAll('.collection-item');
    // console.log(tasks);

    tasks.forEach((task)=>{
        // console.log(task);
        const item = task.firstChild.textContent.toLowerCase();
        // console.log(item);

        if(item.indexOf(inputfilter) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }


    });


}




// add task event listener

form.addEventListener('submit',addtask);

// remove task
tasklist.addEventListener('click',removetask);

// clear tasks
clearbtn.addEventListener('click',cleartasks);

// DOM load event
document.addEventListener('DOMContentLoaded',gettasks);

// filter task event
filter.addEventListener('keyup',filtertasks);