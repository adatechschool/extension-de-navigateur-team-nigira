chrome.tabs.onCreated.addListener((tab) => {
  chrome.scripting.executeScript({ 
    target: { 
      tabId: tab.id 
    }, files: ['popup.js']
})
})
//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//    console.log(`Tab updated: ${tab.url}`);
//    // Action ou message à envoyer au script de contenu
//    chrome.scripting.executeScript({
//      target: { tabId: tabId },
//      files: ['content.js']  // Un fichier content.js pour interagir avec la page
//    });
//  }
//});
