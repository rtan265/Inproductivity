const mailUrlFilters = [{urlMatches: 'https://mail.*'}];
const STORAGE = chrome.storage.local;
const COOLDOWNTIME = 900000;
const TESTCOOLDOWN = 2000;

async function getDataFromLocalStorage() {
  return new Promise((resolve, reject) => {
    try {
      STORAGE.get(null, function(value) {
        resolve(value);
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

async function setIsAllowedToFalse() {
  return new Promise((resolve, reject) => {
    try {
      STORAGE.set({"isAllowed": false}, function() {})
    }
    catch (ex) {
      reject(ex);
    }
  })
}

async function resetToDefault() {
  return new Promise((resolve, reject) => {
    try {
      STORAGE.set({"isAllowed": true, "counter": 0, "startTime": Date.now()}, function() {})
    }
    catch (ex) {
      reject(ex);
    }
  })
}

async function incrementCounter(value) {
  return new Promise((resolve, reject) => {
    try {
      STORAGE.set({"counter": value}, function() {})
    }
    catch (ex) {
      reject(ex);
    }
  })
}

async function onInitialization() {
  return new Promise((resolve, reject) => {
    try {
      STORAGE.clear(function() {
      })

      let data = {};
      data["counter"] = 0;
      data["startTime"] = Date.now();
      data["isAllowed"] = false;

      STORAGE.set(data, function() {
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  onInitialization();
});

chrome.webNavigation.onCompleted.addListener(async function(details) {
  const data = await getDataFromLocalStorage();
  const timeDifference = Date.now() - data.startTime;
  console.log(data);

  if (data.isAllowed === false){
    if (timeDifference >= COOLDOWNTIME){
      await resetToDefault();
    } else {
      alert("Checking emails too often - focus on your task!");
      chrome.tabs.remove(details.tabId);
    }
  } 

  if (data.counter > 10){    
    if (timeDifference < COOLDOWNTIME) {
      await setIsAllowedToFalse();
    }
  } else {
    await incrementCounter(data.counter + 1);
  }
}, {url: mailUrlFilters});