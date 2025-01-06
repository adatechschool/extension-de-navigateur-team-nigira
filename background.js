chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    files: ["popup.js"],
  });
});
