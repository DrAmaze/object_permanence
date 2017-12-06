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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const PositionalComponents = {

  direction(vector) {
    const normal = PositionalComponents.normal(vector);
    return PositionalComponents.scale(vector, 1 / normal);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  normal(vec) {
    return PositionalComponents.dist([0, 0], vec);
  },

  randomVector(length) {
    const deg = 2 * Math.PI * Math.random();
    return PositionalComponents.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  magnitude(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

};

module.exports = PositionalComponents;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const PositionalComponents = __webpack_require__(0);

class OtherObject {
  constructor(conditions) {
    this.pos = conditions.pos;
    this.vel = conditions.vel;
    this.radius = conditions.radius;
    this.color = conditions.color;
    this.game = conditions.game;
    this.isWrappable = true;
  }

  collideWith(otherObject) {
    this.vel = [0, 0];
  }

  bumped(otherObject) {
    const centerDist = PositionalComponents.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  destroy() {
    this.game.destroy(this);
  }
}

module.exports = OtherObject;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_object1__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy_object1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__enemy_object1__);


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


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const PositionalComponents = __webpack_require__(0);
const OtherObject = __webpack_require__(1);

const STYLE1 = {
  COLOR: "yellow",
  RADIUS: 5,
  SPEED: 4
};

class EnemyObject1 extends OtherObject {
  constructor(conditions = {}) {
    conditions.color = STYLE1.COLOR;
    conditions.radius = STYLE1.RADIUS;
    conditions.pos = conditions.pos || conditions.game.randomPosition();
    conditions.vel = conditions.vel || PositionalComponents.randomVec(STYLE1.SPEED);
    super(conditions);
  }

  // collideWith(otherObject) {
  //   if (otherObject instanceof Ship) {
  //     otherObject.relocate();
  //     return true;
  //   } else if (otherObject instanceof Bullet) {
  //     this.destroy();
  //     otherObject.destroy();
  //     return true;
  //   }

  //   return false;
  // }
}

module.exports = EnemyObject1;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map