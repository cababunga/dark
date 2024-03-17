importScripts("add.js");

const icons = {
    light: {
        "16": "icons/light-16.png",
        "32": "icons/light-32.png",
        "48": "icons/light-48.png",
        "128": "icons/light-128.png"
    },
    dark: {
        "16": "icons/dark-16.png",
        "32": "icons/dark-32.png",
        "48": "icons/dark-48.png",
        "128": "icons/dark-128.png"
    },
};

chrome.runtime.onMessage.addListener((dark, sender) =>
    chrome.action.setIcon({tabId: sender.tab.id, path: dark ? icons.dark : icons.light}));

chrome.action.onClicked.addListener(tab => {
    if (!tab.url.startsWith('chrome://'))
        chrome.scripting.executeScript({target: {tabId: tab.id}, function: toggle});
});

const toggle = async () => {
    const style = document.getElementById("fake-dark-theme");
    if (style)
        style.remove();
    else
        add();
    await chrome.runtime.sendMessage(!style);
    await chrome.storage.local.set({[document.location.host]: !style});
};

