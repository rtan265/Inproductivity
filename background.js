var goalLink;

const urlFilters = [
  {urlMatches: 'https://www.facebook.com/*'}, 
  {urlMatches: 'https://www.linkedin.com/*'}, 
  {urlMatches: 'https://www.instagram.com/'},
];

chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed background.js on updated or new browsers");
  goalLink = prompt("Please enter your goal website:");

});

chrome.webNavigation.onCompleted.addListener(async function(details) {
    let result;
    const data = await fetch("http://worldtimeapi.org/api/ip")
      .then(response => result = response.json())

    const dateTime = new Date(data.datetime)
    const hour = dateTime.getHours()

    if (hour > 7 && hour < 19){
      const remainder = 19 - hour;
      alert("You're not supposed to be on social media at this hour! You have another " + remainder + " hours to go. You could work towards your goals instead!");
      chrome.tabs.update(details.tabId, { url: goalLink });
    }

}, {url: urlFilters});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request.message == "Goal link saved!"){
      goalLink = request.goalLink;
      console.log(goalLink)
    }
  }
)