console.log("Simon");

let pattern;
let gameStep = 0;
let currentStep = -1;
let playerSteps= 0;
let lastButtonPushed;
let gameStart;
let canPush = false;
let strict = false;
let patternInterval;
let turnOnInterval;
let turnOffInterval;
let timeoutInterval;

let buttons = [".greenGameButton", ".redGameButton", ".blueGameButton", ".yellowGameButton"];
let initColors = ["rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(0, 0, 255, 0.5)", "rgba(255, 255, 0, 0.5)"];
let selectedColors = ["rgba(50, 255, 50, 1)", "rgba(255, 50, 50, 1)", "rgba(50, 50, 255, 1)", "rgba(255, 255, 50, 1)"];
let soundsLink = [
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"

];


let sounds = [];
let power = false;

$(()=>{
  console.log("jquery");

  reset()
  $("#counter").val("");
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


    if(power){
      canPush = false;
      //unit is on and were turning it off
      $("#onOff").css("background-color", "rgba(255, 0, 0, 0.5)");
      power = false;
      reset();

      $("#counter").val("");
      clearInterval(patternInterval);
      clearInterval(turnOffInterval);
      turnOffPattern();


    }

    else{
      //unit is off and were turning it on
      $("#onOff").css("background-color", "rgba(255, 0, 0, 1)");
      power = true;
      reset();
      // playPattern();
      counter();
      turnOnPattern();
    }
  });

  $("#reset").click(()=>{
    if(power){

      reset();
      clearInterval(patternInterval);
      clearInterval(turnOffInterval);
      clearInterval(turnOnInterval);
      turnOnPattern();
    }


  });

  $("#strict").click(()=>{
    if(power){
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
    }
  });




  $(window).keypress((key)=>{


    switch(key.which){
      case 113://Q
        pressButton(0);
        break;

      case 112://P
        pressButton(1);
        break;

      case 97://A
        pressButton(2);
        break;

      case 108://L
        pressButton(3);
        break;

      default:

        break;
    }
});

})

function reset(){

  clearInterval(timeoutInterval);
  pattern = [];

  for (var i = 0; i < 20; i++) {
    let rand = Math.floor(Math.random() * 4);
    pattern.push(rand)
  }

  soundsLink.forEach((item)=>{
    sounds.push(new Audio(item));
  })

  resetColors();
  gameStep = 0;
  currentStep = -1;
  counter();
}

function pressButton(btn){
  if(power){
    clearInterval(timeoutInterval);
    if(canPush){

      playButton(btn)
      if(btn === pattern[currentStep + 1]){//correct

        currentStep ++;

        if(currentStep === gameStep){

          setTimeout(function() {

            gameStep++;
            counter();
            if(gameStep === 20){
              turnOnPattern();
              return;
            }
            currentStep = -1;
            playPattern();
          }, 500);
        }
      }
      else{//incorrect

        wrong();
      }
    }
  }
}


function wrong(){
  $("#counter").val("X");
  clearInterval(timeoutInterval);
  initColors.forEach((item, index)=>{
    $(buttons[index]).css("background-color", selectedColors[index]);
  });

  setTimeout(function() {
    resetColors();
    counter();
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


function counter(){
  if(gameStep < 10){
    $("#counter").val("0" + gameStep);
  }
  else{
    $("#counter").val(gameStep);
  }
}
function playPattern(){
  if(power){
    canPush = false;
    let i = 0;

    let next = setInterval(function() {

        if(i === gameStep){
          clearInterval(next);
          canPush = true;
          timeoutInterval = setInterval(()=>{
            wrong();
          }, 3000);
        }

        if(!power){
          clearInterval(next);
        }
        playButton(pattern[i])
        i++;
      }, 1300);
  }
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


  function turnOnPattern(){
    let pattern = [0, 1, 3, 2, 0, 1, 3, 2, 0, 1, 3, 2];

    let i = 0;

    let next = setInterval(function() {

        if(i === pattern.length - 1){
          clearInterval(next);

          playPattern();
        }


        $(buttons[pattern[i]]).css("background-color", selectedColors[pattern[i]]);
        sounds[pattern[i]].play();

        setTimeout(function() {
          resetColors();

        }, 100);

        i++;
      }, 200);
    }

    function turnOffPattern(){
      let pattern = [2, 3, 1, 0];
      canPush = false;
      let i = 0;

      let next = setInterval(function() {

          if(i === pattern.length - 1){
            clearInterval(next);

          }


          $(buttons[pattern[i]]).css("background-color", selectedColors[pattern[i]]);
          sounds[pattern[i]].play();

          setTimeout(function() {
            resetColors();

          }, 100);

          i++;
        }, 200);
      }
