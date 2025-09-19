// Background script for handling any background tasks
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage if needed
  chrome.storage.local.get("notes", (result) => {
    if (!result.notes) {
      chrome.storage.local.set({ notes: {} });
    }
  });
});
