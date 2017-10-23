console.log("Simon");

let pattern;
let gameStep = 0;
let currentStep = -1;
let playerSteps= 0;
let lastButtonPushed;
let gameStart;
let canPush = false;
let strict = false;
let buttons = [".greenGameButton", ".redGameButton", ".blueGameButton", ".yellowGameButton"];
let initColors = ["rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(0, 0, 255, 0.5)", "rgba(255, 255, 0, 0.5)"];
let selectedColors = ["rgba(50, 255, 50, 1)", "rgba(255, 50, 50, 1)", "rgba(50, 50, 255, 1)", "rgba(255, 255, 50, 1)"];
let soundsLink = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];

let sounds = [];
let power = false;

$(()=>{
  console.log("jquery");

  reset()

  $(".greenGameButton").mousedown(()=>{
    if(canPush){
      pressButton(0);
    }

  });

  $(".redGameButton").mousedown(()=>{
    if(canPush){
      pressButton(1);
    }

  });

  $(".blueGameButton").mousedown(()=>{
    if(canPush){
      pressButton(2);
    }

  });

  $(".yellowGameButton").mousedown(()=>{
    if(canPush){
      pressButton(3);
    }
  });

  $("#onOff").click(()=>{
    console.log("on off");

    if(power){
      //unit is on and were turning it off
      $("#onOff").css("background-color", "rgba(255, 0, 0, 0.5)");
      power = false;
      reset();
      canPush = false;
      counter();
    }

    else{
      //unit is off and were turning it on
      $("#onOff").css("background-color", "rgba(255, 0, 0, 1)");
      power = true;
      reset();
      playPattern();
    }
  });

  $("#reset").click(()=>{
    console.log("reset");
    reset();
    playPattern();
  });

  $("#strict").click(()=>{
    console.log("strict");

    if(strict){
      //strict is on and were turning it off
      $("#strict").css("background-color", "rgba(255, 0, 0, 0.5)");
      strict = false;
    }

    else{
      //strict is off and were turning it on
      $("#strict").css("background-color", "rgba(255, 0, 0, 1)");
      strict = true;
    }

  });



})

function reset(){
  counter();
  pattern = [];
  for (var i = 0; i < 20; i++) {
    let rand = Math.floor(Math.random() * 4);
    pattern.push(rand)
  }
  console.log(pattern);

  soundsLink.forEach((item)=>{
    sounds.push(new Audio(item));
  })
  resetColors();
  gameStep = 0;
  currentStep = -1;
}

function pressButton(btn){



  playButton(btn)

  if(btn === pattern[currentStep + 1]){//correct
    console.log("right");
    console.log("currentStep: " + currentStep);
    console.log("gameStep: " + gameStep);

    currentStep ++;

    if(currentStep === gameStep){
      setTimeout(function() {

        gameStep++;
        counter();
        currentStep = -1;
        playPattern();
      }, 500);
    }


  }
  else{//incorrect
    console.log("wrong");

    initColors.forEach((item, index)=>{
      $(buttons[index]).css("background-color", selectedColors[index]);
    });

    setTimeout(function() {
      resetColors();
    }, 500);


    if(strict){


      setTimeout(function() {
        reset();
        playPattern();
      }, 1500);
    }
    else{


      //play error sound
      setTimeout(function() {
        currentStep = -1;
        playPattern();
      }, 500);

    }

  }

}

function counter(){
  if(gameStep < 10){
    $("#counter").val("0" + gameStep);
  }
  else{
    $("#counter").val(gameStep);
  }
}
function playPattern(){
  canPush = false;
  let i = 0;


    let next = setInterval(function() {

      if(i === gameStep){
        clearInterval(next);
        canPush = true;
      }

      if(!power){
        clearInterval(next);
      }
      playButton(pattern[i])
      i++;
    }, 1300);






  }

  function playButton(btn){
    canPush = false;
    $(buttons[btn]).css("background-color", selectedColors[btn]);
    sounds[btn].play();

    setTimeout(function() {
      resetColors();
      canPush = true;
    }, 500);


  }

  function resetColors(){
    buttons.forEach((item, index)=>{
      $(item).css("background-color", initColors[index]);
    });
  }
