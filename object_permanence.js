var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// user object stats
var userObjectRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var velX = 0;
var velY = 0;
var maxSpeed = 1000;
var dx = 3;
var dy = -3;

// enemy object stats
var enemyObjectRadius = 5;
var ex = 0;
var ey = 0;
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

function drawEnemyObject() {
  ctx.beginPath();
  ctx.arc(ex, ey, enemyObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawUserObject();
  drawEnemyObject();

  // user object logic

  if ( rightPressed && upPressed
    && (x + userObjectRadius < canvas.width)
    && (y > userObjectRadius) ){
    x += dx * (Math.sqrt(2) / 2);
    y += dy * (Math.sqrt(2) / 2);
  } else if ( rightPressed && downPressed
    && (x + userObjectRadius < canvas.width)
    && (y + userObjectRadius < canvas.height)) {
    x += dx * (Math.sqrt(2) / 2);
    y -= dy * (Math.sqrt(2) / 2);
  } else if ( leftPressed && downPressed
    && (x  > userObjectRadius)
    && (y + userObjectRadius < canvas.height) ) {
    x -= dx * (Math.sqrt(2) / 2);
    y -= dy * (Math.sqrt(2) / 2);
  } else if (leftPressed && upPressed
    && (x  > userObjectRadius)
    && (y  > userObjectRadius)) {
    x -= dx * (Math.sqrt(2) / 2);
    y += dy * (Math.sqrt(2) / 2);
  } else if (rightPressed && x + userObjectRadius < canvas.width) {
    if (Math.sqrt((Math.pow(velX+.5, 2) + Math.pow(velY, 2))) < maxSpeed) {
      velX += 1;
    }
  } else if (leftPressed && x  > userObjectRadius) {
    if (Math.sqrt((Math.pow(velX-.5, 2) + Math.pow(velY, 2))) < maxSpeed) {
      velX -= 1;
    }
  } else if (upPressed && y  > userObjectRadius) {
    if (Math.sqrt((Math.pow(velX, 2) + Math.pow(velY+.5, 2))) < maxSpeed) {
      velY -= 1;
    }
  } else if (downPressed && y + userObjectRadius < canvas.height) {
    if (Math.sqrt((Math.pow(velX, 2) + Math.pow(velY - .5, 2))) < maxSpeed) {
      velY += 1;
    }
  }

  y += velY;
  x += velX;
  if (x + userObjectRadius < canvas.width || x  > userObjectRadius) {
    velX = 0;
  } else if ((y  > userObjectRadius) || (y + userObjectRadius < canvas.height)) {
    velY = 0;
  }
}



setInterval(draw, 50);
