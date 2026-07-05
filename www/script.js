let notes = JSON.parse(localStorage.getItem("notes")) || [];

const list = document.getElementById("notesList");

function saveNotes(){
    localStorage.setItem("notes",JSON.stringify(notes));
}

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

}

if(localStorage.getItem("darkMode")=="true"){
    document.body.classList.add("dark");
}

function addNote(){

    const input=document.getElementById("noteInput");

    if(input.value.trim()=="") return;

    const color=document.getElementById("labelColor").value;

    notes.unshift({

        text:input.value,

        color:color,

        date:new Date().toLocaleString()

    });

    input.value="";

    saveNotes();

    displayNotes();

}

function displayNotes(){

    list.innerHTML="";

    const search=document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    notes.forEach((note,index)=>{

        if(!note.text.toLowerCase().includes(search))
        return;

        list.innerHTML+=`

<li style="background:${note.color}">

<div class="note-text">

<b>${note.text}</b><br>

<small>${note.date}</small>

</div>

<div class="actions">

<button class="edit"
onclick="editNote(${index})">

✏️

</button>

<button class="delete"
onclick="deleteNote(${index})">

🗑️

</button>

</div>

</li>

`;

    });

}

function editNote(index){

let text=prompt(
"Edit note",
notes[index].text
);

if(text!=null && text.trim()!=""){

notes[index].text=text;

notes[index].date=
"Edited • "+new Date().toLocaleString();

saveNotes();

displayNotes();

}

}

function deleteNote(index){

if(confirm("Delete this note?")){

notes.splice(index,1);

saveNotes();

displayNotes();

}

}
