README

Prompting history:

This was the original prompt:

```
You are going to help me build a browser extension that will allow users to add sticky notes to web pages. When they load a web page which has had a sticky note placed on it in the past then those sticky notes should appear automatically on that pag.e All of the storage for this should be done locally using the browser's local storage or any other methods which are available Additionally there should be a page accessible by interacting with the extension Which one visited shows all of the stickies that are currently active or have been created Users should be able to edit sticky notes and they should also be able to delete them from either view both the on page one and also the high level view it shows all stickies at once. Keep this extension as simple as possible Stick to known browser Apis. Follow Chrome extension development best standards.
```

And I noticed that the dashboard view didn't work at first, which I asked about:

```
When I click on the dashboard view I get taken to the url: chrome-extension://<extension_id>/src/popup/dashboard/dashboard.html

But all that is seen is a chrome error page:

Your file couldn’t be accessed
It may have been moved, edited, or deleted.
ERR_FILE_NOT_FOUND

What's the cause of this error?
```

To which Claude responded the path was messed up and added a '../' as a prefix. After that, the extension fully worked, and I have to say I am really amazed.
