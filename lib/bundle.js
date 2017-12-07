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
/***/ (function(module, exports) {

// const Gameplay = require("./gameplay");
// const Canvas = require("./canvas");
// const userObject = require('./user_object');
//
// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementsByTagName("canvas")[0];
//   canvasEl.width = Gameplay.X;
//   canvasEl.height = Gameplay.Y;
//
//   const ctx = canvasEl.getContext("2d");
//   const gameplay = new Gameplay();
//   new Canvas(gameplay, ctx).play();
// }

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// physics
const friction = 0.9;
const interval = 50; // ms
var time = 0;

// scoring
const score = 1000/interval;
let count = 0; // used for scoring
let points = 0;

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
var edx = dx/2;
var edy = dy/2;
var speed = 5;
let enemies = [];
let enemyCount = 0;

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
    return [0 + enemyObjectRadius, canvas.height - enemyObjectRadius];
  } else if (2 === parseInt(start)) {
    return [canvas.width - enemyObjectRadius, 0 + enemyObjectRadius];
  } else {
    return [canvas.width - enemyObjectRadius, canvas.height - enemyObjectRadius];
  }
}

function drawNewEnemyObject() {
  const startPos = randomStartLocation();
  ctx.beginPath();
  ctx.arc(startPos[0], startPos[1], enemyObjectRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawEnemyObject(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, enemyObjectRadius, 0, Math.PI * 2);
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

function gameOver() {
  enemies.forEach ((i) => {
    if (Math.abs(Math.abs(i[0]) - Math.abs(x)) + Math.abs(Math.abs(i[1]) - Math.abs(y)) < userObjectRadius + enemyObjectRadius) {
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

  if (time === 0 || time % 20 === 0) {
    drawNewEnemyObject();
    enemies.push(randomStartLocation());
    enemyCount += 1;
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

  // game over logic
  gameOver();

  count += 1;
  time += 1;
  if (count === score) {
    points += 1;
    count = 0;
  }
}


setInterval(draw, interval);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map