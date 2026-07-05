let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${note}</span>
            <button class="delete" onclick="deleteNote(${index})">Delete</button>
        `;

        notesList.appendChild(li);
    });
}

function addNote() {
    const input = document.getElementById("noteInput");

    if (input.value.trim() === "") {
        alert("Please enter a note.");
        return;
    }

    notes.push(input.value);

    input.value = "";

    saveNotes();
    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

displayNotes();
