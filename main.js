let ifButton = document.getElementById('addIt');
let tableInfo = document.getElementById('content');
let boxInfo = document.getElementById('inputBox');

let todoitems = []; // initialising array for storing taskset 
let isCut = []; // array to track if cut or not

const cutInStorage = function(to_cut) {
    for(let i = 0; i < isCut.length; i++) {
        if(to_cut == todoitems[i]) {
            isCut[i] = 1;
            put_into_local(todoitems, 1);
            break;
        }
    }
}

const r_from_storage = function(to_remove) {
    for(let i = 0; i < todoitems.length; i++) {
        if(to_remove == todoitems[i]) {
            todoitems.splice(i,1);
            isCut.splice(i,1);
            console.log(todoitems);
            break;
        }
    }
    put_into_local(todoitems);
    if(todoitems.length == 0) {
         localStorage.removeItem("tasks")
         localStorage.removeItem("cut")
    }
}

const get_from_local = function() {                     //fn to populate from local storage
    let retrivelocal = localStorage.getItem("tasks"); 
    let retriveCut = localStorage.getItem("cut") // retriving from local storage data of key named "tasks"

    if(retrivelocal === "undefined" || retrivelocal === null || retriveCut === "undefined" || retriveCut === null) {
        todoitems = [];
    } 
    else {
        todoitems = JSON.parse(retrivelocal);
        isCut = JSON.parse(retriveCut);
        console.log(todoitems);
    }
}

const put_into_local = function(todoitems,z) {     // putting into local storage with key named "tasks"
    localStorage.setItem("tasks", JSON.stringify(todoitems));
    localStorage.setItem("cut", JSON.stringify(isCut));
}

window.addEventListener('DOMContentLoaded', () => {   // after dom loads this is called
    console.log('DOM fully parsed');               
    get_from_local();       //calling this function to populate todoitems from localstorage
    
    for(let j = 0; j < todoitems.length; j++) {
        let gg = document.createElement('p');
        if(isCut[j] == 0) {
        gg.classList.add('paraStyle');  // HAVE TO CHANGE THIS FOR CUTTING
        }               
        else {
        gg.classList.add('paraStyle-1')
        }
        gg.innerText = todoitems[j];
        tableInfo.appendChild(gg);
        gg.addEventListener('click', function(){
            gg.classList.add('paraStyle-1');
            cutInStorage(gg.innerText);
        })
    
        gg.addEventListener('dblclick', function(){
            tableInfo.removeChild(gg);
            r_from_storage(gg.innerText);      //  fn removes the element from storage
        })
    }

});

ifButton.addEventListener('click', function(){
    todoitems.push(boxInfo.value);  //pushing the value inside the box into the array
    isCut.push(0);
    put_into_local(todoitems,0);   // calling a fn which populates the local storage
    var paragraph = document.createElement('p');
    paragraph.id = 'id_p';     // useless
    paragraph.classList.add('paraStyle');  // adding class
    paragraph.innerText = boxInfo.value;
    tableInfo.appendChild(paragraph);
    boxInfo.value = "";

    paragraph.addEventListener('click', function(){
        paragraph.classList.add('paraStyle-1');
        cutInStorage(paragraph.innerText);                                          // add cutting function here
        console.log('ji');
    })

    paragraph.addEventListener('dblclick', function(){
        console.log(paragraph.innerText) 
        r_from_storage(paragraph.innerText);                 /// fn removes the element from storage
        tableInfo.removeChild(paragraph);                    /// remove from the display  
    })
})
///////
boxInfo.addEventListener("keydown", function(e){
    if(e.code == "Enter") {
    todoitems.push(boxInfo.value); //pushing the value inside the box into the array
    isCut.push(0);
    put_into_local(todoitems,0);   // calling a fn which populates the local storage
    console.log("Done")
    let aragraph = document.createElement('p');
    aragraph.id = 'id_p';
    aragraph.classList.add('paraStyle')
    aragraph.innerText = boxInfo.value;
    tableInfo.appendChild(aragraph);
    boxInfo.value = "";

    aragraph.addEventListener('click', function(){
        aragraph.classList.add('paraStyle-1');
        console.log(aragraph);
        cutInStorage(aragraph.innerText);
    })

    aragraph.addEventListener('dblclick', function(){
        tableInfo.removeChild(aragraph);
        r_from_storage(aragraph.innerText);
    })   
    }
    
})



