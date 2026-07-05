let notes = JSON.parse(localStorage.getItem("notes")) || [];

let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark");
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

function displayNotes() {
    const notesList = document.getElementById("notesList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        if (!note.text.toLowerCase().includes(search)) return;

        const li = document.createElement("li");

        li.innerHTML = `
        <div style="flex:1">
            <strong>${note.text}</strong><br>
            <small>${note.date}</small>
        </div>

        <button onclick="editNote(${index})">✏️</button>

        <button class="delete" onclick="deleteNote(${index})">
        🗑
        </button>
        `;

        notesList.appendChild(li);
    });
}

function addNote() {

    const input = document.getElementById("noteInput");

    if (input.value.trim() === "") return;

    notes.unshift({
        text: input.value,
        date: new Date().toLocaleString()
    });

    input.value = "";

    saveNotes();

    displayNotes();
}

function editNote(index) {

    const text = prompt("Edit note", notes[index].text);

    if (text !== null && text.trim() !== "") {

        notes[index].text = text;

        notes[index].date =
            "Edited • " + new Date().toLocaleString();

        saveNotes();

        displayNotes();
    }

}

function deleteNote(index) {

    if (confirm("Delete this note?")) {

        notes.splice(index, 1);

        saveNotes();

        displayNotes();

    }

}

displayNotes();
