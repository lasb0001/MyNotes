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
            <div style="flex:1">
                <strong>${note.text}</strong><br>
                <small>${note.date}</small>
            </div>

            <button onclick="editNote(${index})">✏️</button>
            <button class="delete" onclick="deleteNote(${index})">Delete</button>
        `;

        notesList.appendChild(li);
    });
}

function addNote() {
    const input = document.getElementById("noteInput");

    if (input.value.trim() === "") return;

    notes.push({
        text: input.value,
        date: new Date().toLocaleString()
    });

    input.value = "";

    saveNotes();
    displayNotes();
}

function editNote(index) {
    let newText = prompt("Edit your note:", notes[index].text);

    if (newText !== null && newText.trim() !== "") {
        notes[index].text = newText;
        notes[index].date = "Edited: " + new Date().toLocaleString();

        saveNotes();
        displayNotes();
    }
}

function deleteNote(index) {
    notes.splice(index,1);

    saveNotes();
    displayNotes();
}

displayNotes();
