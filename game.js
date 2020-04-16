class ColourBox{
  constructor(colour,sound,cssClass){
    this.colour = colour;
    this.sound = sound;
    this.cssClass = cssClass;
    this.soundAndAnimation = function(){
      this.cssClass.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      this.sound.play();
      //var userChosenColour = this.colour;
    }
  }
}

//sounds
var blueSound = new Audio('sounds/blue.mp3');
var greenSound = new Audio('sounds/green.mp3');
var redSound = new Audio('sounds/red.mp3');
var yellowSound = new Audio('sounds/yellow.mp3');
var wrong = new Audio('sounds/wrong.mp3');

//boxes
var blueBox = new ColourBox("blue", blueSound, $(".blue"));
var greenBox = new ColourBox("green", greenSound, $(".green"));
var redBox = new ColourBox("red", redSound, $(".red"));
var yellowBox = new ColourBox("yellow", yellowSound, $(".yellow"));


//array of ColourBox objects
var buttons = [blueBox,greenBox,redBox,yellowBox];


var gameState = false;
var level = 0;
var userClickedPattern=[];      //pattern by user
var gamePattern = [];           //correct pattern
var over = false;     //for red background and sound effect after game over

var i = 0;     //used in loop

function nextSquence(){
  level ++;
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttons[randomNumber].colour;
  gamePattern.push(randomChosenColour);                   //gamePattern array push
  buttons[randomNumber].soundAndAnimation();
  console.log('gamePattern: '+gamePattern);
  $('h1').text("Level "+level);
}

function gameOver(){          //gameOver
  wrong.play();
  $('body').addClass('game-over');
  setTimeout(function () {
    $('body').removeClass('game-over');
  }, 500);
  level = 0;
  gameState = false;
  over = true;
  userClickedPattern=[];
  gamePattern = [];
  $('h1').text('Game Over, Press Any Key to Restart');
}

$('.btn').click(function(event){
  //console.log(this.id);
  if (gameState === true){
    for(i=0; i <4 ; i++){
    if (this.id === buttons[i].colour){             //check object using id(colour string)
      buttons[i].soundAndAnimation();
      userClickedPattern.push(buttons[i].colour);
      console.log('userClickedPattern: '+userClickedPattern);
      break;
    }
    }
  }
  if (over === true){                 //clicking button when game over
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 500);
    wrong.play();
  }

  for (i=0; i <userClickedPattern.length; i++){
    if (userClickedPattern[i] !== gamePattern[i]){        //wrong move condition = game over

      gameOver();
      console.log("i = "+i+" , userClickedPattern = "+userClickedPattern+" , gamePattern = "+gamePattern,);
    }
  }

  if ((userClickedPattern.length === gamePattern.length) && (gameState === true)){    //level up
    setTimeout( nextSquence , 800);
    userClickedPattern = [];
  }
});

$(document).keydown(function(){         //start game
  if (gameState === false){
    gameState = true;
    over = false;
    nextSquence();
  }
});
