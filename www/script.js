let notes = JSON.parse(localStorage.getItem("notes")) || [];

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

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

function addNote() {
    const input = document.getElementById("noteInput");
    const color = document.getElementById("labelColor").value;

    if (input.value.trim() === "") {
        alert("Please enter a note.");
        return;
    }

    notes.unshift({
        text: input.value,
        color: color,
        date: new Date().toLocaleString()
    });

    input.value = "";

    saveNotes();
    displayNotes();
}

function displayNotes() {
    const list = document.getElementById("notesList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    notes.forEach((note, index) => {

        if (!note.text.toLowerCase().includes(search)) return;

        list.innerHTML += `
        <li style="background:${note.color}">
            <div class="note-text">
                <b>${note.text}</b><br>
                <small>${note.date}</small>
            </div>

            <div class="actions">
                <button class="edit" onclick="editNote(${index})">✏️</button>
                <button class="delete" onclick="deleteNote(${index})">🗑️</button>
            </div>
        </li>
        `;
    });
}

function editNote(index) {
    const newText = prompt("Edit note:", notes[index].text);

    if (newText && newText.trim() !== "") {
        notes[index].text = newText;
        notes[index].date = "Edited • " + new Date().toLocaleString();

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
