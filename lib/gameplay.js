// const EnemyObject1 = require("./enemy_object1");
// const EnemyObject2 = require("./enemy_object2");
// const UserObject = require("./user_object");
// const PositionalComponents = require("./positional_components");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// physics
const friction = 0.9;
const interval = 50; // ms

// scoring
const score = 1000/interval;
const count = 0; // used for scoring
const points = 0;

// user object stats
var vel = [0, 0];
var userObjectRadius = 10;
var x = 800/2;
var y = 700/2;
var maxSpeed = 1000;
var dx = 1;
var dy = -1;

// enemy object stats
var enemyObjectRadius = 5;
var ex = 0;
var ey = 0;
var edx = dx/2;
var edy = dy/2;
var speed = 5;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var keyPressed = false;
var keyUnpressed = false;

document.addEventListener("keydown", keyPressedHandler, false);
document.addEventListener("keyup", keyUnpressedHandler, false);

//key codes: left (37), up (38), right (39), down (40)

function keyPressedHandler(e) {
  if(e.keyCode === 39) {
    rightPressed = true;
  } else if(e.keyCode === 37) {
    leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40 ) {
    downPressed = true;
  }
}
function keyUnpressedHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 40 ){
    downPressed = false;
  }
}

function drawEnemyObject(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, enemyObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawUserObject() {
  ctx.beginPath();
  ctx.arc(x, y, userObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function gameOver() {

}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawUserObject();
  drawEnemyObject();


  // user object logic

  if (rightPressed && upPressed) {
    vel[0] += dx * (Math.sqrt(2) / 2);
    vel[1] += dy * (Math.sqrt(2) / 2);
  } else if (rightPressed && downPressed) {
    vel[0] += dx * (Math.sqrt(2) / 2);
    vel[1] -= dy * (Math.sqrt(2) / 2);
  } else if (leftPressed && downPressed) {
    vel[0] -= dx * (Math.sqrt(2) / 2);
    vel[1] -= dy * (Math.sqrt(2) / 2);
  } else if (leftPressed && upPressed) {
    vel[0] -= dx * (Math.sqrt(2) / 2);
    vel[1] += dy * (Math.sqrt(2) / 2);
  } else if (rightPressed) {
    vel[0] += dx;
    if (vel[1] < dy/2 && vel[1] > dy/(-2)) {
      vel[1] = 0;
    } else if (vel[1] < 0) {
      vel[1] -= dy/2;
    } else if (vel[1] > 0) {
      vel[1] += dy/2;
    }
  } else if (leftPressed) {
    vel[0] -= dx;
    if (vel[1] < dy/2 && vel[1] > dy/(-2)) {
      vel[1] = 0;
    } else if (vel[1] < 0) {
      vel[1] -= dy/2;
    } else if (vel[1] > 0) {
      vel[1] += dy/2;
    }
  } else if (upPressed) {
    vel[1] += dy;
    if (vel[0] < dx/2 && vel[0] > dx/(-2)) {
      vel[0] = 0;
    } else if (vel[0] > 0) {
      vel[0] -= dx/2;
    } else if (vel[0] < 0) {
      vel[0] += dx/2;
    }
  } else if (downPressed) {
    vel[1] -= dy;
    if (vel[0] < dx/2 && vel[0] > dx/(-2)) {
      vel[0] = 0;
    } else if (vel[0] > 0) {
      vel[0] -= dx/2;
    } else if (vel[0] < 0) {
      vel[0] += dx/2;
    }
  } else {
    if (vel[0] > 0 && vel[1] > 0) {
      vel[0] -= dx/2;
      vel[1] += dy/2;
    } else if (vel[0] < 0 && vel[1] < 0) {
      vel[0] += dx/2;
      vel[1] -= dy/2;
    } else if (vel[0] > 0 && vel[1] < 0) {
      vel[0] -= dx/2;
      vel[1] -= dy/2;
    } else if (vel[0] < 0 && vel[1] > 0) {
      vel[0] += dx/2;
      vel[1] += dy/2;
    }
    if (vel[0] > 0) {
      vel[0] -= dx/2;
    } else if (vel[0] < 0) {
      vel[0] += dx/2;
    }
    if (vel[1] < 0) {
      vel[1] -= dy/2;
    } else if (vel[1] > 0) {
      vel[1] += dy/2;
    }
  }


  if (y + vel[1] + userObjectRadius > canvas.height) {
    y = canvas.height - userObjectRadius;
    vel[1] = 0;
  } else if (y + vel[1] < userObjectRadius) {
    y = userObjectRadius;
    vel[1] = 0;
  } else {
    y += vel[1];
  }

  if (x + vel[0] + userObjectRadius > canvas.width) {
    x = canvas.width - userObjectRadius;
    vel[0] = 0;
  } else if (x + vel[0] < userObjectRadius) {
    x = userObjectRadius;
    vel[0] = 0;
  } else {
    x += vel[0];
  }

  // enemy movement logic
  if (ex > x) {
    ex -= edx;
  } else if (ex < x) {
    ex += edx;
  }
  if (ey > y) {
    ey += edy;
  } else if (ey < y) {
    ey -= edy;
  }

  if (Math.abs(Math.abs(ex) - Math.abs(x)) + Math.abs(Math.abs(ey) - Math.abs(y)) < userObjectRadius + enemyObjectRadius) {
    // alert("Gameplay Over");
    document.location.reload();
  }
  // game over logic

  count += 1;
  if (count === score) {
    points += 1;
    count = 0;
  }
}


setInterval(draw, interval);
