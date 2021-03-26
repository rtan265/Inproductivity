const mailUrlFilters = [{urlMatches: 'https://mail.*'}];
const STORAGE = chrome.storage.local;

chrome.runtime.onInstalled.addListener(function() {
  STORAGE.clear(function() {
    var error = chrome.runtime.lastError;
    if (error){
      console.error(error);
    }
  });

  console.log("Hello");
  var data = {};
  data["counter"] = 0;

  STORAGE.set(data, function(){
  })

});


chrome.webNavigation.onCompleted.addListener(async function(details) {
  // we want to create functions to get and set responses so that it's asynchronous
  let currentCounter;
  STORAGE.get("counter", function(result){
    currentCounter = result + 1;
    STORAGE.set({"counter": currentCounter}, function() {
    })
  })
}, {url: mailUrlFilters});
