chrome.runtime.onInstalled.addListener(function() {
  console.log("running");
});

chrome.webNavigation.onCompleted.addListener(function
  (details) {
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log(details.url);
}, {url: [{urlMatches : 'https://www.facebook.com/'}]});