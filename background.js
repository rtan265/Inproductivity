chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed on updated or new browsers");
});

const urlFilters = [{urlMatches: 'https://www.facebook.com/'}, {urlMatches: 'https://www.linkedin.com/'}];
chrome.webNavigation.onCompleted.addListener(function
  (details) {
    // Get current time, count hours till 7pm
    // if >7pm and < 7am allow, else close

    alert("You're not supposed to be on social media at this hour! Closing this tab.");
    chrome.tabs.remove(details.tabId);
}, {url: urlFilters});