
const newURL = "https://trello.com/b/W2wIXDdD/goals-2021";

chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed on updated or new browsers");
});

const urlFilters = [{urlMatches: 'https://www.facebook.com/*'}, {urlMatches: 'https://www.linkedin.com/*'}, {urlMatches: 'https://www.instagram.com/'}];
chrome.webNavigation.onCompleted.addListener(async function
  (details) {
    let result;
    const data = await fetch("http://worldtimeapi.org/api/ip")
      .then(response => result = response.json())

    let dateTime = new Date(data.datetime)
    let hour = dateTime.getHours()

    if (hour > 7 && hour < 19){
      const remainder = 19 - hour;
      alert("You're not supposed to be on social media at this hour! Closing this tab. You have another " + remainder + " hours to go. You could work on your goals instead!");
      chrome.tabs.update(details.tabId, { url: newURL });
    }

}, {url: urlFilters});
