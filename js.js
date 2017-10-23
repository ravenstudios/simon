console.log("Simon");

let pattern = [];
let gameStep = 10;
let currentSetp;
let lastButtonPushed;
let gameStart;

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

$(()=>{
  console.log("jquery");

  setup();

  $(".greenGameButton").mousedown(()=>{
    $(buttons[0]).css("background-color", selectedColors[0]);
    playButton(0);
  });

  $(".redGameButton").mousedown(()=>{
    $(buttons[1]).css("background-color", selectedColors[1]);
    playButton(1);
  });

  $(".blueGameButton").mousedown(()=>{
    $(buttons[2]).css("background-color", selectedColors[2]);
    playButton(2);
  });

  $(".yellowGameButton").mousedown(()=>{
    $(buttons[3]).css("background-color", selectedColors[3]);
    playButton(3);
  });

  $(".gameButton").mouseup(()=>{
    //resetColors();
  });

  playPattern();
})

function setup(){
  for (var i = 0; i < 100; i++) {
    let rand = Math.floor(Math.random() * 4);
    pattern.push(rand)
  }
  console.log(pattern);

  soundsLink.forEach((item)=>{
    sounds.push(new Audio(item));
  })
  resetColors();
}

function pressButton(btn){
  //if correct button is pressed replay pattern up to current step

  //else end game
}

function playPattern(){

  let i = 0;


    let next = setInterval(function() {
      console.log(i);
      if(i === gameStep){
        clearInterval(next);
      }
      playButton(pattern[i])
      i++;
    }, 1300);






  }

  function playButton(btn){
    $(buttons[btn]).css("background-color", selectedColors[btn]);
    sounds[btn].play();

    setTimeout(function() {
      resetColors();
    }, 500);


  }

  function resetColors(){
    buttons.forEach((item, index)=>{
      $(item).css("background-color", initColors[index]);
    });
  }
