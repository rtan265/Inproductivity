document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('buttonGoal');
  var link = document.getElementById('goalLink');

  if (button){
    button.addEventListener('click', function() {
      chrome.runtime.sendMessage({ goalLink: link.value, message: "Goal link saved!"});
      link.value = "";
    });
  }
});