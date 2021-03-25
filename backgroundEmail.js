const mailUrlFilters = [{urlMatches: 'https://mail.*'}];

chrome.runtime.onInstalled.addListener(function() {
});

chrome.webNavigation.onCompleted.addListener(async function(details) {
  chrome.storage.sync.get(['counter'], function(result) {
    console.log('value: ' + result.counter)
    if (result.counter == undefined) {
      chrome.storage.sync.set({"counter": 1}, function() {
      })
    }
  })

  chrome.storage.sync.get(['counter'], function(result) {
    console.log('value @ 2: ' + result.counter)
  })
  
}, {url: mailUrlFilters});
