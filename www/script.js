import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");
const searchInput = document.getElementById("searchInput");
const labelColor = document.getElementById("labelColor");

const settingsModal = document.getElementById("settingsModal");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettings = document.getElementById("closeSettings");
const aboutBtn = document.getElementById("aboutBtn");

if(localStorage.getItem("darkMode")=="true"){
document.body.classList.add("dark");
}

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

settingsBtn.onclick=function(){
settingsModal.style.display="flex";
}

closeSettings.onclick=function(){
settingsModal.style.display="none";
}

window.onclick=function(e){

if(e.target==settingsModal){

settingsModal.style.display="none";

}

}

aboutBtn.onclick=function(){

alert(
"My Notes\n\nVersion 5\nCreated by Las B"
);

}

function addNote(){

if(noteInput.value.trim()==""){

alert("Write a note first.");

return;

}

notes.unshift({

text:noteInput.value,

color:labelColor.value,

date:new Date().toLocaleString()

});

noteInput.value="";

saveNotes();

displayNotes();

}

function displayNotes(){

notesList.innerHTML="";

let search=searchInput.value.toLowerCase();

notes.forEach((note,index)=>{

if(!note.text.toLowerCase().includes(search))
return;

notesList.innerHTML+=`

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

let newText=prompt(
"Edit note",
notes[index].text
);

if(newText!=null && newText.trim()!=""){

notes[index].text=newText;

notes[index].date=
"Edited • "+
new Date().toLocaleString();

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

displayNotes();

// ===== VERSION 5 PART 2 =====

const pinBtn = document.getElementById("pinBtn");

pinBtn.onclick = function () {

    let currentPin = localStorage.getItem("appPin");

    if (currentPin === null) {

        let newPin = prompt("Create a 4-digit PIN");

        if (newPin === null) return;

        if (!/^\d{4}$/.test(newPin)) {
            alert("PIN must be exactly 4 digits.");
            return;
        }

        localStorage.setItem("appPin", newPin);

        alert("PIN created successfully!");

    } else {

        let action = confirm("Press OK to change your PIN.\nPress Cancel to remove it.");

        if (action) {

            let oldPin = prompt("Enter current PIN");

            if (oldPin !== currentPin) {
                alert("Incorrect PIN.");
                return;
            }

            let newPin = prompt("Enter new 4-digit PIN");

            if (!/^\d{4}$/.test(newPin)) {
                alert("PIN must be exactly 4 digits.");
                return;
            }

            localStorage.setItem("appPin", newPin);

            alert("PIN changed successfully.");

        } else {

            let oldPin = prompt("Enter current PIN to remove it");

            if (oldPin === currentPin) {

                localStorage.removeItem("appPin");

                alert("PIN removed.");

            } else {

                alert("Incorrect PIN.");

            }

        
    }

};

window.addEventListener("load", function () {

    const savedPin = localStorage.getItem("appPin");

    if (!savedPin) return;

    let entered = prompt("Enter your PIN");

    while (entered !== savedPin) {

        entered = prompt("Wrong PIN. Try again.");

    }

});
document.addEventListener("deviceready", function () {
    console.log("Device ready");

    console.log("Cordova:", typeof cordova);
    console.log("AdMob:", typeof admob);

    if (typeof admob === "undefined") {
        alert("AdMob plugin not loaded.");
        return;
    }

    alert("AdMob plugin loaded successfully!");
});
