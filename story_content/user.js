
window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  var startTime = new Date().getTime();
window.startTime = startTime;
}

window.Script2 = function()
{
  var player = GetPlayer();
var endTime = new Date().getTime();
var totalTime = Math.floor((endTime - window.startTime) / 1000); // in seconds

// Convert to MM:SS
var minutes = Math.floor(totalTime / 60);
var seconds = totalTime % 60;

// Pad with zero if needed
var timeString = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

// Set Storyline variable
player.SetVar("TotalTime", timeString);

}

window.Script3 = function()
{
  var player = GetPlayer();
var endTime = new Date().getTime();
var totalTime = Math.floor((endTime - window.startTime) / 1000); // in seconds
// Convert to MM:SS
var minutes = Math.floor(totalTime / 60);
var seconds = totalTime % 60;
// Pad with zero if needed
var timeString = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
// Set Storyline variable
player.SetVar("TotalTime", timeString);
}

window.Script4 = function()
{
  var player = GetPlayer();
  var score = player.GetVar("total");
  var UserName = player.GetVar("UserName");    // Make sure the variable name matches yours
  var totalTime = player.GetVar("TotalTime");


// Send score to LMS (SCORM 1.2 format)
if (typeof SCORM_CallLMSSetValue === "function") {
   SCORM_CallLMSSetValue("cmi.core.score.raw", score);
   SCORM_CallLMSSetValue("cmi.core.score.min", 0);
   SCORM_CallLMSSetValue("cmi.core.score.max", 100);
   SCORM_CallLMSSetValue("cmi.core.lesson_status", "completed");
   SCORM_CallLMSCommit();
}

// Now send data to Google Sheets via Web App URL
  fetch("https://script.google.com/macros/s/AKfycbwLr5Yjs9nQUKTd7WQ3SOBvvD192F32yDXENJ4ulRBp5h1XTorMqGxsC41YALoYcriBhA/exec", {
    method: "POST",
    body: JSON.stringify({
      UserName: UserName,
      total: score,
      TotalTime: totalTime
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => console.log("Google Script response:", data))
  .catch(error => console.error("Error sending data:", error));
};
  
}

};
