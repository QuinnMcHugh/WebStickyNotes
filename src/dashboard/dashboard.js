async function loadAllNotes() {
  const storage = await chrome.storage.local.get("notes");
  const notes = storage.notes || {};
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  let hasNotes = false;

  for (const [url, urlNotes] of Object.entries(notes)) {
    for (const [noteId, noteData] of Object.entries(urlNotes)) {
      hasNotes = true;
      const noteCard = createNoteCard(url, noteId, noteData);
      container.appendChild(noteCard);
    }
  }

  if (!hasNotes) {
    container.innerHTML = '<div class="no-notes">No sticky notes found</div>';
  }
}

function createNoteCard(url, noteId, noteData) {
  const card = document.createElement("div");
  card.className = "note-card";

  const urlDiv = document.createElement("div");
  urlDiv.className = "note-url";
  urlDiv.textContent = url;

  const textarea = document.createElement("textarea");
  textarea.className = "note-text";
  textarea.value = noteData.text;

  const contentContainer = document.createElement("div");
  contentContainer.className = "note-content";
  contentContainer.appendChild(urlDiv);
  contentContainer.appendChild(textarea);

  const controls = document.createElement("div");
  controls.className = "note-controls";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () =>
    saveNote(url, noteId, textarea.value, noteData.position)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteNote(url, noteId));

  controls.appendChild(saveBtn);
  controls.appendChild(deleteBtn);

  card.appendChild(contentContainer);
  card.appendChild(controls);

  return card;
}

async function saveNote(url, noteId, text, position) {
  const storage = await chrome.storage.local.get("notes");
  const notes = storage.notes || {};

  if (!notes[url]) notes[url] = {};
  notes[url][noteId] = {
    id: noteId,
    text,
    position,
    url,
  };

  await chrome.storage.local.set({ notes });
}

async function deleteNote(url, noteId) {
  if (!confirm("Are you sure you want to delete this note?")) return;

  const storage = await chrome.storage.local.get("notes");
  const notes = storage.notes || {};

  if (notes[url] && notes[url][noteId]) {
    delete notes[url][noteId];
    if (Object.keys(notes[url]).length === 0) {
      delete notes[url];
    }
    await chrome.storage.local.set({ notes });
    loadAllNotes();
  }
}

// Load notes when the page loads
document.addEventListener("DOMContentLoaded", loadAllNotes);
