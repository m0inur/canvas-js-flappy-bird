var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

$(document).click(function () {
  if (jump == false) {
    jump = true;
  }
});

// Init images
var bird_1_img = new Image();
var bird_2_img = new Image();
var bird_3_img = new Image();
var pipe_up_img = new Image();
var pipe_down_img = new Image();
var coin_img = new Image();

// Link images
bird_1_img.src = "../images/bird_1.png";
bird_2_img.src = "../images/bird_2.png";
bird_3_img.src = "../images/bird_3.png";
pipe_up_img.src = "../images/pipe_up.png";
pipe_down_img.src = "../images/pipe_down.png";
coin_img.src = "../images/coin.png";

// Object Variables
var flappy;
var pipeUp = [];
var pipeDown = [];
var coins = [];

// Object Properies
// Player
var flappy_props = {
  x: canvas.width / 2.5,
  y: canvas.height / 2,
  vx: 0,
  vy: 10,
  gravity: 5,
  width: 50,
  height: 40
}

// Pipe
var pipeGap = 150;

var pipeUpProps = {
  x: canvas.width,
  y: 0,
  vx: 4,
  width: 80,
  height: 800
}

var pipeDownProps = {
  x: canvas.width,
  y: 0,
  vx: 4,
  width: 80,
  height: 800
}

// Coins
var coinProps = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
}

// Counters 
var jumpCounter = 0;
var canJumpCounter = 0;
var frameCount = 0;
var createPipeCounter = 0;

// Varibales 
var jump = false;
var isJumping = false;
var isDead = false;
var score = 0;

flappy = new Bird(flappy_props.x, flappy_props.y, flappy_props.vx, flappy_props.vy, flappy_props.gravity, flappy_props.width, flappy_props.height);


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.font = "20px Verdana";
  c.fillText(score, canvas.width - 50, 50)

  createPipeCounter++;
  // Init Objects
  if (createPipeCounter % 240 == 0) {
    // Define pipe new props
    pipeUpProps.y = randomInt(300, canvas.height - 300) - pipeUpProps.height;
    pipeDownProps.y = pipeUpProps.y + pipeUpProps.height + pipeGap;

    // Init Pipe
    pipeUp.push(new Pipes(pipeUpProps.x, pipeUpProps.y, pipeUpProps.vx, pipeUpProps.width, pipeUpProps.height, pipe_up_img));
    pipeDown.push(new Pipes(pipeDownProps.x, pipeDownProps.y, pipeDownProps.vx, pipeDownProps.width, pipeDownProps.height, pipe_down_img));

    // Define coins props
    coinProps.x = pipeDownProps.x + 10;
    coinProps.y = pipeUpProps.y + pipeUpProps.height + (pipeGap / 2.7);

    // Init Coins
    coins.push(new Coin(coinProps.x, coinProps.y, pipeDownProps.vx, coinProps.width, coinProps.height));

    createPipeCounter = 0;
  }

  // Draw and Move Flappy
  flappy.draw();
  flappy.move();

  // Draw and Move Pipes
  for (var i = 0; i < pipeUp.length; i++) {
    pipeUp[i].draw();
    pipeUp[i].move()

    pipeDown[i].draw();
    pipeDown[i].move();

    if (pipeUp[i].x < -100) {
      pipeUp = pipeUp.slice(i + 1);
      pipeDown = pipeDown.slice(i + 1);
    }

    if (flappy.x < pipeUp[i].x + pipeUp[i].width) {
      if (flappy.x > pipeUp[i].x - pipeUp[i].width / 2 - 14 && flappy.y <= pipeUp[i].y + pipeUp[i].height - 5) {
        isDead = true;
      }
      if (flappy.x >= pipeDown[i].x - pipeDown[i].width / 2 - 14 && flappy.y >= pipeUpProps.y + pipeUpProps.height + pipeGap - 37) {
        isDead = true;
      }
    }
  }

  // Draw and Move Coinss
  for (var i = 0; i < coins.length; i++) {
    coins[i].draw();
    coins[i].move();

    if (coins[i].x < -100) {
      coins = coins.slice(i + 1);
    }

    if (flappy.x > coins[i].x - coins[i].width) {
      coins = coins.slice(i + 1);
      score++;
    }
  }

  if (isDead) {
    restart();
  }
}

function restart() {
  pipeUp = [];
  pipeDown = [];
  coins = [];

  score = 0;

  flappy.y = flappy_props.y;
  isDead = false;
  location.reload();
}
animate();