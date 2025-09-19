// Content script for managing sticky notes on web pages
class StickyNote {
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.text = data.text || "";
    this.position = data.position || { x: 100, y: 100 };
    this.url = window.location.href;
    this.element = null;
    this.createNoteElement();
  }

  createNoteElement() {
    this.element = document.createElement("div");
    this.element.className = "web-post-it";
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    const controls = document.createElement("div");
    controls.className = "controls";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => this.toggleEdit());

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => this.delete());

    const textarea = document.createElement("textarea");
    textarea.value = this.text;
    textarea.addEventListener("input", () => this.updateText(textarea.value));

    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);
    this.element.appendChild(controls);
    this.element.appendChild(textarea);

    this.setupDragging();
    document.body.appendChild(this.element);
  }

  setupDragging() {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    this.element.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "TEXTAREA")
        return;
      isDragging = true;
      initialX = e.clientX - this.position.x;
      initialY = e.clientY - this.position.y;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      this.updatePosition(currentX, currentY);
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      this.saveToStorage();
    });
  }

  toggleEdit() {
    const textarea = this.element.querySelector("textarea");
    textarea.focus();
  }

  updateText(newText) {
    this.text = newText;
    this.saveToStorage();
  }

  updatePosition(x, y) {
    this.position = { x, y };
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  delete() {
    this.element.remove();
    this.deleteFromStorage();
  }

  async saveToStorage() {
    const data = {
      id: this.id,
      text: this.text,
      position: this.position,
      url: this.url,
    };

    const storage = await chrome.storage.local.get("notes");
    const notes = storage.notes || {};
    if (!notes[this.url]) notes[this.url] = {};
    notes[this.url][this.id] = data;
    await chrome.storage.local.set({ notes });
  }

  async deleteFromStorage() {
    const storage = await chrome.storage.local.get("notes");
    const notes = storage.notes || {};
    if (notes[this.url] && notes[this.url][this.id]) {
      delete notes[this.url][this.id];
      await chrome.storage.local.set({ notes });
    }
  }
}

// Load existing notes for the current page
async function loadExistingNotes() {
  const storage = await chrome.storage.local.get("notes");
  const notes = storage.notes || {};
  const currentUrl = window.location.href;

  if (notes[currentUrl]) {
    Object.values(notes[currentUrl]).forEach((noteData) => {
      new StickyNote(noteData);
    });
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createNote") {
    new StickyNote({
      position: { x: window.scrollX + 100, y: window.scrollY + 100 },
    });
  }
});

// Load existing notes when the page loads
loadExistingNotes();
