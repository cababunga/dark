chrome.storage.local.get([document.location.host]).then(result => {
    if (result[document.location.host]) {
        add();
        chrome.runtime.sendMessage(true);
    }
});

