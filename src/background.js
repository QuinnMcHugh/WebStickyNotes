// Background script for handling any background tasks
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage if needed
  chrome.storage.local.get("notes", (result) => {
    if (!result.notes) {
      chrome.storage.local.set({ notes: {} });
    }
  });

  // Create context menu item
  chrome.contextMenus.create({
    id: "createStickyNote",
    title: "Add Sticky Note Here",
    contexts: ["page", "selection"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "createStickyNote") {
    // Send message to content script to create a note
    chrome.tabs.sendMessage(tab.id, {
      action: "createNote",
      position: {
        // We'll use the current mouse position from the content script
        fromContextMenu: true,
      },
      text: info.selectionText || "", // If text was selected, use it as the initial note content
    });
  }
});
