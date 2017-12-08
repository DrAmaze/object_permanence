/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

const Points = __webpack_require__(7);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// physics
const friction = 0.9;
const interval = 30; // ms
var time = 0;

// scoring
const score = parseInt(1000/interval);
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
var edx = 1.5 * dx;
var edy = 1.5 * dy;
let enemies = [];
let enemyCount = 0;

// badder enemy object stats
var badderEnemyObjectRadius = 15;
var bedx = 3*dx;
var bedy = 3*dy;
let badderEnemies = [];
let badderEnemyCount = 0;

// snitch object stats
const snitchRadius = 2;
let snitches = []; // each el will have 3 values: x, y, vel
let snitchCount = 0;
const blastRadius = 100;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var keyPressed = false;
var keyUnpressed = false;
var paused = true;
var pauseCount = 0;

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
  } else if (e.keyCode === 40) {
    downPressed = true;
  } else if (e.keyCode === 32) {
    togglePaused();
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
  } else if (e.keyCode === 32) {
    togglePaused();
  }
}

function togglePaused() {
  pauseCount += 1;
  paused = !paused;
  if (pauseCount === 1) {
    setInterval(draw, interval);
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
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
  return startPos;
}

function drawEnemyObject(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, enemyObjectRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
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

function drawNewSnitch() {
  const start = randomStartLocation();

  const velX = Math.random() * 15 * dx;
  const velY = Math.random() * 15 * dx;
  ctx.beginPath();
  ctx.arc(start[0], start[1], snitchRadius, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
  return [start[0], start[1], velX, velY];
}

function drawSnitch(pos) {
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], snitchRadius, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
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

function isTouchingWall(pos, xAxis, radius) {
  if (pos - radius < 0) {
    return true;
  }
  if (xAxis) {
    if (pos + radius > canvas.width) {
      return true;
    }
  } else {
    if (pos + radius > canvas.height) {
      return true;
    }
  }
  return false;
}

function grabSnitch() {
  let destroyed = [];
  let number = 0;
  let snitchNum = 0;
  let snitchDestroy = [];
  snitches.forEach((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + snitchRadius) {
      enemies.forEach((enemy) => {
        if (Math.abs(Math.abs(enemy[0]) - Math.abs(x)) + Math.abs(Math.abs(enemy[1]) - Math.abs(y)) < userObjectRadius + enemyObjectRadius + blastRadius) {
          destroyed.push(number);
        }
        number += 1;
      });
      enemies = destroy(enemies, destroyed);
      destroyed = [];
      number = 0;
      badderEnemies.forEach((badder) => {
        if (Math.abs(Math.abs(badder[0]) - Math.abs(x)) + Math.abs(Math.abs(badder[1]) - Math.abs(y)) < userObjectRadius + badderEnemyObjectRadius + blastRadius) {
          destroyed.push(number);
        }
        number += 1;
      });
      badderEnemies = destroy(badderEnemies, destroyed);
      snitchDestroy.push(snitchNum);
    }
    snitchNum += 1;
  });
  if (snitchDestroy.length > 0) {
    explosion([x,y]);
  }
  snitches = destroy(snitches, snitchDestroy);
}

function destroy(arr, nums) {
  nums.forEach((i) => {
    delete arr[i];
  });
  let newArr = [];
  arr.forEach((el) => {
    if (el) {
      newArr.push(el);
    }
  });
  return newArr;
}

function explosion(pos) {
  for(let i = 0; i <= blastRadius; i ++) {
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], i, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

function gameOver() {
  let finalScore = 0;
  enemies.forEach ((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + enemyObjectRadius) {
      finalScore = points.points;
    }
  });
  badderEnemies.forEach((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + badderEnemyObjectRadius) {
      finalScore = points.points;
    }
  });
  if (finalScore > 0) {
    const gg = document.getElementById('encouraging-message');
    gg.innerHTML = `Good Game! Your score was ${finalScore}`;
    setTimeout(draw, 3000);
    document.location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawUserObject();
  if (time > 0) {
    enemies.forEach((enemy) => {
      drawEnemyObject(enemy[0], enemy[1]);
    });
    badderEnemies.forEach((badder) => {
      drawBadderEnemyObject(badder[0], badder[1]);
    });
    snitches.forEach((snitch) => {
      drawSnitch([snitch[0], snitch[1]]);
    });
    if (time === 1 || time % 40 === 0) {
      const startPos = drawNewEnemyObject();
      enemies.push(startPos);
      enemyCount += 1;
    } else if (time % 100 === 0) {
      const startPos = drawNewBadderEnemy();
      badderEnemies.push(startPos);
      badderEnemyCount += 1;
    }
    if (time % 150 === 0) {
      const snitch = drawNewSnitch();
      snitches.push(snitch);
      snitchCount += 1;
    }
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
  snitches.forEach((snitch) => {
    if (isTouchingWall(snitch[0], true, snitchRadius)) {
      snitch[2] *= (-1) * friction;
      snitch[0] += snitch[2] * friction;
    } else if (isTouchingWall(snitch[1], false, snitchRadius)) {
      snitch[3] *= (-1) * friction;
      snitch[1] += snitch[3] * friction;
    } else {
      snitch[0] += snitch[2];
      snitch[1] += snitch[3];    }
  });
  grabSnitch();
  if (time > 0) {
    gameOver();
  }

  points.display();

  count += 1;
  time += 1;
  if (count === score) {
    points.step();
    count = 0;
  }
}

if (paused) {
  draw();
} else {
  setInterval(draw, interval);
}


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

class Points {
  constructor() {
    this.time = 0;
    this.points = 0;
  }

  step() {
    this.points += 1;
  }

  display() {
    let score = document.getElementById('points-display');
    score.innerHTML = this.points;
  }

}

module.exports = Points;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map