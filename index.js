var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var firstBox = -1;
// STARTING TO GAME BY A KEYBOARD EVENT
var heading = document.querySelector("h1").textContent;
$(document).keypress(function() {
  if (heading === "Press A Key to Start" || heading == "Game Over, Press Any Key to Restart") {
    firstBox = Math.floor(Math.random() * 4);
    $("." + colors[firstBox]).fadeOut().fadeIn();
    var startAudio = new Audio("sounds/" + colors[firstBox] + ".mp3");
    startAudio.play();
    heading = "Level 1";
    $("h1").text(heading);
    gamePattern.push(colors[firstBox]);
  }
});
// CREATING A NEW SEQUENCE AFTER THE LEVEL SUCCESFULLY DONE
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  $("." + randomColor).fadeOut().fadeIn();
  var boxAudio = new Audio("sounds/" + randomColor + ".mp3");
  boxAudio.play();
}
//MOUSE EVENT WITH CHECKING ANSWERS
var clickPattern = [];
$(".btn").click(function(event) {
  boxAnimation(event.target);
  clickPattern.push(event.target.id);
  if (clickPattern.length == gamePattern.length) {
    if (checkAnswer(gamePattern.length) === true) {
      setTimeout(nextSequence(), 1000);
    }
    clickPattern = [];
  }
});
// MOUSE EVENT ANIMATION
function boxAnimation(clr) {
  $(clr).addClass("pressed");
  setTimeout(function() {
    $(clr).removeClass("pressed");
  }, 100);
}
// CHECKING ANSWERS
function checkAnswer(currentLevel) {
  for (var i = 0; i < currentLevel; i++) {
    if (clickPattern[i] !== gamePattern[i]) {
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 500);
      var overAudio = new Audio("sounds/wrong.mp3");
      overAudio.play();
      $("h1").text("Game Over, Press Any Key to Restart")
      heading = "Game Over, Press Any Key to Restart";
      clickPattern = [];
      gamePattern = [];
      return false;
    }
  }
  $("h1").text("Level "+(currentLevel+1));
  return true;
}
