# WebStickyNotes

### Purpose

I wanted to build an extension that allowed me to add notes on top of webpages, since losing context while working across many tabs inside of technical SaaS apps is something that I frequently worry about. Occasionally I'll keep running notes in a .txt file locally if something is truly complex or mission-critical, but nothing can beat inline with the relevant webpage. Apparently there are already [lots of these](https://chromewebstore.google.com/search/sticky%20note) which exist, but I've always wanted to build and publish some Chrome extensions so this was a perfect excuse.

### Secondary purpose

To play with LLM's and vibe code more projects from scratch.

### LLM Prompting:

This was the original prompt:

```
You are going to help me build a browser extension that will allow users to add sticky notes to web pages. When they load a web page which has had a sticky note placed on it in the past then those sticky notes should appear automatically on that pag.e All of the storage for this should be done locally using the browser's local storage or any other methods which are available Additionally there should be a page accessible by interacting with the extension Which one visited shows all of the stickies that are currently active or have been created Users should be able to edit sticky notes and they should also be able to delete them from either view both the on page one and also the high level view it shows all stickies at once. Keep this extension as simple as possible Stick to known browser Apis. Follow Chrome extension development best standards.
```

With some very minor manual tweaks and a few follow-up prompts, the app as you see it now was complete.
