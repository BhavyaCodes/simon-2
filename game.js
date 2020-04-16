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


$('.btn').click(function(event){
  //console.log(this.id);
  for(i=0; i <4 ; i++){
  if (this.id === buttons[i].colour){             //check object using id(colour string)
    buttons[i].soundAndAnimation();
    userClickedPattern.push(buttons[i].colour);
    console.log('userClickedPattern: '+userClickedPattern);
    break;
  }
  }
});
