chrome.offscreen.createDocument({
  url: 'popup.html',
  reasons: [chrome.offscreen.Reason.GEOLOCATION || chrome.offscreen.Reason.DOM_SCRAPING],
  justification: 'geolocation access',
});