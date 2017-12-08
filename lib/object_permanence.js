const Points = require('./points');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// physics
const friction = 0.9;
const interval = 50; // ms
var time = 0;

// scoring
const score = 1000/interval;
let count = 0; // used for scoring
let points = new Points();


// user object stats
var userObjectRadius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var vel = [0, 0];
var maxSpeed = 1000;
var dx = 1;
var dy = -1;

// enemy object stats
var enemyObjectRadius = 5;
var edx = 3*dx/4;
var edy = 3*dy/4;
let enemies = [];
let enemyCount = 0;

// badder enemy object stats
var badderEnemyObjectRadius = 15;
var bedx = 2*dx;
var bedy = 2*dy;
let badderEnemies = [];
let badderEnemyCount = 0;

// gate object stats
var gdx = .5 * dx;
var gdy = .5 * dy;
let gates = [];
let gateCount = 0;

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

function randomStartLocation() {
  const start = Math.random() * 4;

  if (0 === parseInt(start)) {
    return [0, 0];
  } else if (1 === parseInt(start)) {
    return [0 + enemyObjectRadius, Math.random() * (canvas.height - enemyObjectRadius)];
  } else if (2 === parseInt(start)) {
    return [Math.random() * (canvas.width - enemyObjectRadius), 0 + enemyObjectRadius];
  } else {
    return [(canvas.width - enemyObjectRadius), canvas.height - enemyObjectRadius];
  }
}

function drawNewEnemyObject() {
  const startPos = randomStartLocation();
  ctx.beginPath();
  ctx.arc(startPos[0], startPos[1], enemyObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
  return startPos;
}

function drawEnemyObject(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, enemyObjectRadius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function drawNewBadderEnemy() {
  const startPos = randomStartLocation();
  ctx.beginPath();
  ctx.arc(startPos[0], startPos[1], badderEnemyObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  return startPos;
}

function drawBadderEnemyObject(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, badderEnemyObjectRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawNewGate() {
  const startPos = randomStartLocation();
  const gateDims = [
    startPos[0] + (Math.random()*50) - 25,
    startPos[1] + (Math.random()*50) - 25
  ];
  ctx.beginPath();
  ctx.arc(startPos[0], startPos[1], 3, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(gateDims[0], gateDims[1]);
  ctx.arc(gateDims[0], gateDims[1], 3, Math.PI * 2);
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
  enemies.forEach ((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + enemyObjectRadius) {
      document.location.reload();
    }
  });
  badderEnemies.forEach((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + badderEnemyObjectRadius) {
      document.location.reload();
    }
  });
  gates.forEach((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + badderEnemyObjectRadius) {
      document.location.reload();
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawUserObject();

  enemies.forEach((enemy) => {
    drawEnemyObject(enemy[0], enemy[1]);
  });
  badderEnemies.forEach((badder) => {
    drawBadderEnemyObject(badder[0], badder[1]);
  });

  if (time === 0 || time % 40 === 0) {
    const startPos = drawNewEnemyObject();
    enemies.push(startPos);
    enemyCount += 1;
  } else if (time % 100 === 0) {
    const startPos = drawNewBadderEnemy();
    badderEnemies.push(startPos);
    badderEnemyCount += 1;
  }

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
  enemies.forEach((enemy) => {
    if (enemy[0] > x) {
      enemy[0] -= edx;
    } else if (enemy[0] < x) {
      enemy[0] += edx;
    }
    if (enemy[1] > y) {
      enemy[1] += edy;
    } else if (enemy[1] < y) {
      enemy[1] -= edy;
    }
  });
  badderEnemies.forEach((badder) => {
    if (badder[0] > x) {
      badder[0] -= bedx;
    } else if (badder[0] < x) {
      badder[0] += bedx;
    }
    if (badder[1] > y) {
      badder[1] += bedy;
    } else if (badder[1] < y) {
      badder[1] -= bedy;
    }
  });

  gameOver();

  points.display();

  count += 1;
  time += 1;
  if (count === score) {
    points.step();
    count = 0;
  }
}



setInterval(draw, interval);
