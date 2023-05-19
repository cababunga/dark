chrome.storage.local.get([document.location.host]).then(result => {
    const dark = result[document.location.host];
    if (dark) {
        add();
        chrome.runtime.sendMessage(dark);
    }
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
    const style = document.getElementById("fake-dark-theme");
    if (style)
        style.remove();
    else 
        add();
    await chrome.runtime.sendMessage(!style);
    await chrome.storage.local.set({[document.location.host]: !style});
});

const add = () => {
    if (getComputedStyle(document.body).backgroundColor == 'rgba(0, 0, 0, 0)')
        document.body.style.backgroundColor = '#fff';
    const s = document.createElement("style");
    s.id = "fake-dark-theme";
    s.innerText = "html {filter: invert(90%) hue-rotate(180deg)} " +
                  "img, video, iframe, [style*=background-image] " +
                  "{filter: invert(111%) hue-rotate(180deg)}";
    document.head.appendChild(s);
};
