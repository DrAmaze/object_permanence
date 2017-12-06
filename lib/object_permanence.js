import EnemyObject1 from './enemy_object1';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// physics
const friction = 0.9;
const interval = 50; // ms

// score
const score = 1000/interval;
const count = 0; // used for scoring
const points = 0;

// user object stats
var userObjectRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var velX = 0;
var velY = 0;
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

  if (rightPressed && upPressed) {
    velX += dx * (Math.sqrt(2) / 2);
    velY += dy * (Math.sqrt(2) / 2);
  } else if (rightPressed && downPressed) {
    velX += dx * (Math.sqrt(2) / 2);
    velY -= dy * (Math.sqrt(2) / 2);
  } else if (leftPressed && downPressed) {
    velX -= dx * (Math.sqrt(2) / 2);
    velY -= dy * (Math.sqrt(2) / 2);
  } else if (leftPressed && upPressed) {
    velX -= dx * (Math.sqrt(2) / 2);
    velY += dy * (Math.sqrt(2) / 2);
  } else if (rightPressed) {
    velX += dx;
    if (velY < dy/2 && velY > dy/(-2)) {
      velY = 0;
    } else if (velY < 0) {
      velY -= dy/2;
    } else if (velY > 0) {
      velY += dy/2;
    }
  } else if (leftPressed) {
    velX -= dx;
    if (velY < dy/2 && velY > dy/(-2)) {
      velY = 0;
    } else if (velY < 0) {
      velY -= dy/2;
    } else if (velY > 0) {
      velY += dy/2;
    }
  } else if (upPressed) {
    velY += dy;
    if (velX < dx/2 && velX > dx/(-2)) {
      velX = 0;
    } else if (velX > 0) {
      velX -= dx/2;
    } else if (velX < 0) {
      velX += dx/2;
    }
  } else if (downPressed) {
    velY -= dy;
    if (velX < dx/2 && velX > dx/(-2)) {
      velX = 0;
    } else if (velX > 0) {
      velX -= dx/2;
    } else if (velX < 0) {
      velX += dx/2;
    }
  } else {
    if (velX > 0 && velY > 0) {
      velX -= dx/2;
      velY += dy/2;
    } else if (velX < 0 && velY < 0) {
      velX += dx/2;
      velY -= dy/2;
    } else if (velX > 0 && velY < 0) {
      velX -= dx/2;
      velY -= dy/2;
    } else if (velX < 0 && velY > 0) {
      velX += dx/2;
      velY += dy/2;
    }
    if (velX > 0) {
      velX -= dx/2;
    } else if (velX < 0) {
      velX += dx/2;
    }
    if (velY < 0) {
      velY -= dy/2;
    } else if (velY > 0) {
      velY += dy/2;
    }
  }


  if (y + velY + userObjectRadius > canvas.height) {
    y = canvas.height - userObjectRadius;
    velY = 0;
  } else if (y + velY < userObjectRadius) {
    y = userObjectRadius;
    velY = 0;
  } else {
    y += velY;
  }

  if (x + velX + userObjectRadius > canvas.width) {
    x = canvas.width - userObjectRadius;
    velX = 0;
  } else if (x + velX < userObjectRadius) {
    x = userObjectRadius;
    velX = 0;
  } else {
    x += velX;
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
