chrome.runtime.onInstalled.addListener(function() {
});

chrome.tabs.onUpdated.addListener(function 
  (tabId, changeInfo, tab) {
    console.log("hello");
    console.log(changeInfo.url);
})