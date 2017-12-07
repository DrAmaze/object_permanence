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

const EnemyObject1 = __webpack_require__(5);
// // const EnemyObject2 = require("./enemy_object2");
const UserObject = __webpack_require__(3);
const PositionalComponents = __webpack_require__(0);
//
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
//
// // physics
// const friction = 0.9;
// const interval = 50; // ms
//
// // scoring
// const score = 1000/interval;
// let count = 0; // used for scoring
// let points = 0;
//
// // user object stats
// var vel = [0, 0];
// var userObjectRadius = 10;
// var x = 800/2;
// var y = 700/2;
// var maxSpeed = 1000;
// var dx = 10;
// var dy = -10;
//
// // enemy object stats
// var enemyObjectRadius = 5;
// var ex = 0;
// var ey = 0;
// var edx = dx/2;
// var edy = dy/2;
// var speed = 5;
//
// var rightPressed = false;
// var leftPressed = false;
// var upPressed = false;
// var downPressed = false;
// var keyPressed = false;
// var keyUnpressed = false;
//
// document.addEventListener("keydown", keyPressedHandler, false);
// document.addEventListener("keyup", keyUnpressedHandler, false);
//
// //key codes: left (37), up (38), right (39), down (40)
//
// function keyPressedHandler(e) {
//   if(e.keyCode === 39) {
//     rightPressed = true;
//   } else if(e.keyCode === 37) {
//     leftPressed = true;
//   } else if (e.keyCode === 38) {
//     upPressed = true;
//   } else if (e.keyCode === 40 ) {
//     downPressed = true;
//   }
// }
// function keyUnpressedHandler(e) {
//   if(e.keyCode == 39) {
//     rightPressed = false;
//   } else if(e.keyCode == 37) {
//     leftPressed = false;
//   } else if (e.keyCode == 38) {
//     upPressed = false;
//   } else if (e.keyCode == 40 ){
//     downPressed = false;
//   }
// }
//
// function drawEnemyObject(posX, posY) {
//   ctx.beginPath();
//   ctx.arc(ex, ey, enemyObjectRadius, 0, Math.PI*2);
//   ctx.fillStyle = "red";
//   ctx.fill();
//   ctx.closePath();
// }
//
// function drawUserObject() {
//   ctx.beginPath();
//   ctx.arc(x, y, userObjectRadius, 0, Math.PI*2);
//   ctx.fillStyle = "blue";
//   ctx.fill();
//   ctx.closePath();
// }
//
// function gameOver() {
//   if (Math.abs(Math.abs(ex) - Math.abs(x)) + Math.abs(Math.abs(ey) - Math.abs(y)) < userObjectRadius + enemyObjectRadius) {
//     // alert("Gameplay Over");
//     document.location.reload();
//   }
// }
//
// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawUserObject();
//   drawEnemyObject();
//
//   // user object logic
//
//   if (rightPressed && upPressed) {
//     vel[0] += dx * (Math.sqrt(2) / 2);
//     vel[1] += dy * (Math.sqrt(2) / 2);
//   } else if (rightPressed && downPressed) {
//     vel[0] += dx * (Math.sqrt(2) / 2);
//     vel[1] -= dy * (Math.sqrt(2) / 2);
//   } else if (leftPressed && downPressed) {
//     vel[0] -= dx * (Math.sqrt(2) / 2);
//     vel[1] -= dy * (Math.sqrt(2) / 2);
//   } else if (leftPressed && upPressed) {
//     vel[0] -= dx * (Math.sqrt(2) / 2);
//     vel[1] += dy * (Math.sqrt(2) / 2);
//   } else if (rightPressed) {
//     vel[0] += dx;
//     if (vel[1] < dy/2 && vel[1] > dy/(-2)) {
//       vel[1] = 0;
//     } else if (vel[1] < 0) {
//       vel[1] -= dy/2;
//     } else if (vel[1] > 0) {
//       vel[1] += dy/2;
//     }
//   } else if (leftPressed) {
//     vel[0] -= dx;
//     if (vel[1] < dy/2 && vel[1] > dy/(-2)) {
//       vel[1] = 0;
//     } else if (vel[1] < 0) {
//       vel[1] -= dy/2;
//     } else if (vel[1] > 0) {
//       vel[1] += dy/2;
//     }
//   } else if (upPressed) {
//     vel[1] += dy;
//     if (vel[0] < dx/2 && vel[0] > dx/(-2)) {
//       vel[0] = 0;
//     } else if (vel[0] > 0) {
//       vel[0] -= dx/2;
//     } else if (vel[0] < 0) {
//       vel[0] += dx/2;
//     }
//   } else if (downPressed) {
//     vel[1] -= dy;
//     if (vel[0] < dx/2 && vel[0] > dx/(-2)) {
//       vel[0] = 0;
//     } else if (vel[0] > 0) {
//       vel[0] -= dx/2;
//     } else if (vel[0] < 0) {
//       vel[0] += dx/2;
//     }
//   } else {
//     if (vel[0] > 0 && vel[1] > 0) {
//       vel[0] -= dx/2;
//       vel[1] += dy/2;
//     } else if (vel[0] < 0 && vel[1] < 0) {
//       vel[0] += dx/2;
//       vel[1] -= dy/2;
//     } else if (vel[0] > 0 && vel[1] < 0) {
//       vel[0] -= dx/2;
//       vel[1] -= dy/2;
//     } else if (vel[0] < 0 && vel[1] > 0) {
//       vel[0] += dx/2;
//       vel[1] += dy/2;
//     }
//     if (vel[0] > 0) {
//       vel[0] -= dx/2;
//     } else if (vel[0] < 0) {
//       vel[0] += dx/2;
//     }
//     if (vel[1] < 0) {
//       vel[1] -= dy/2;
//     } else if (vel[1] > 0) {
//       vel[1] += dy/2;
//     }
//   }
//
//   if (y + vel[1] + userObjectRadius > canvas.height) {
//     y = canvas.height - userObjectRadius;
//     vel[1] = 0;
//   } else if (y + vel[1] < userObjectRadius) {
//     y = userObjectRadius;
//     vel[1] = 0;
//   } else {
//     y += vel[1];
//   }
//
//   if (x + vel[0] + userObjectRadius > canvas.width) {
//     x = canvas.width - userObjectRadius;
//     vel[0] = 0;
//   } else if (x + vel[0] < userObjectRadius) {
//     x = userObjectRadius;
//     vel[0] = 0;
//   } else {
//     x += vel[0];
//   }
//
//   // enemy movement logic
//   if (ex > x) {
//     ex -= edx;
//   } else if (ex < x) {
//     ex += edx;
//   }
//   if (ey > y) {
//     ey += edy;
//   } else if (ey < y) {
//     ey -= edy;
//   }
//
//   // game over logic
//   gameOver();
//
//   count += 1;
//   if (count === score) {
//     points += 1;
//     count = 0;
//   }
// }
//
// class Gameplay {
//   constructor() {
//     this.object1s = [];
//     this.object2s = [];
//     this.users = [];
//   }
//
//   add(obj) {
//     if (obj instanceof EnemyObject1) {
//       this.object1s.push(obj);
//     // } else if (obj instanceof EnemyObject2) {
//     //   this.object2s.push(obj);
//   } else if (obj instanceof UserObject) {
//       this.users.push(obj);
//     }
//   }
//
//   addEnemyObject1() {
//     this.add(new EnemyObject1({game: this}));
//   }
//
//   addUser() {
//     ctx.beginPath();
//     ctx.arc(x, y, userObjectRadius, 0, Math.PI*2);
//     ctx.fillStyle = "blue";
//     ctx.fill();
//     ctx.closePath();
//   }
//
//   allObjects() {
//     return [].concat(this.users, this.object1s, this.object2s);
//   }
//
//   draw(ctx) {
//     ctx.clearRect(0, 0, Gameplay.X, Gameplay.Y);
//
//     this.allObjects().forEach((obj) => {
//       obj.draw(ctx);
//     });
//   }
//
//   moveObjects(delta) {
//     this.allObjects().forEach((obj) => {
//       obj.move(delta);
//     });
//   }
// }
//
// Gameplay.X = 800;
// Gameplay.Y = 700;
//
//
// setInterval(draw, interval);
//
// module.exports = Gameplay;

class Gameplay {
  constructor() {
    this.object1s = [];
    this.object2s = [];
    this.users = [];

    this.addUser();
    this.addEnemyObject1s();
  }

  add(obj) {
    if (obj instanceof EnemyObject1) {
      this.object1s.push(obj);
    // } else if (obj instanceof EnemyObject2) {
    //   this.object2s.push(obj);
    } else if (obj instanceof UserObject) {
      this.users.push(obj);
    }
  }

  addEnemyObject1s() {
    for ( let i = 0; i < Gameplay.ENEMIES; i++) {
      this.add(new EnemyObject1({gameplay: this}));
    }
  }

  addUser() {
    const user = new UserObject({
      pos: [(Gameplay.X)/2, (Gameplay.Y)/2],
      gameplay: this
    });
    this.add(user);
    return user;
  }

  allObjects() {
    return [].concat(this.users, this.object1s);
  }

  moveObjects(delta) {
    this.allObjects().forEach((obj) => {
      obj.move(delta);
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Gameplay.X, Gameplay.Y);
    ctx.fillRect(0, 0, 'blue', Gameplay.X, Gameplay.Y);

    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  randomPosition() {
    return [
      Gameplay.X * Math.random(),
      Gameplay.Y * Math.random()
    ];
  }

  step(delta) {
    this.moveObjects(delta);
  }
}

Gameplay.BG_COLOR = 'white';
Gameplay.X = 800;
Gameplay.Y = 500;
Gameplay.ENEMIES = 100;

module.exports = Gameplay;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const PositionalComponents = __webpack_require__(0);

class OtherObject {
  constructor(conditions) {
    this.pos = conditions.pos;
    this.vel = conditions.vel;
    this.radius = conditions.radius;
    this.color = conditions.color;
    this.gameplay = conditions.gameplay;

  }

  collideWith(otherObject) {
    this.vel = [0, 0];
  }

  draw(ctx) {
    ctx.fillstyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  bumping(otherObject) {
    const centerDist = PositionalComponents.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  // randomStartPos() {
  //   const n = Math.random() * 3;
  //   if (n === 0) {
  //     return [0, Math.random() * ]
  //   } else if (n === 1) {
  //     return [Math.random() * Canvas.WIDTH]
  //   } else if ( n === 2) {
  //
  //   }
  //  }

  move(dt) {
    const velScale = dt / TIME_FRAME;
    let dx = this.vel[0] * velScale;
    let dy = this.vel[1] * velScale;

    this.pos = [this.pos[0] + dx, this.pos[1] + dy];
  }

  destroy() {
    this.gameplay.destroy(this);
  }
}

const TIME_FRAME = 50;

module.exports = OtherObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const PositionalComponents = __webpack_require__(0);
const OtherObject = __webpack_require__(2);
const Gameplay = __webpack_require__(1);

class UserObject extends OtherObject {
  constructor(conditions = {}) {
    conditions.color = 'blue';
    conditions.radius = UserObject.RADIUS;
    conditions.vel = [0, 0] || conditions.vel;
    super(conditions);
  }

  move(dt) {
    // user object physics

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var keyPressed = false;
    var keyUnpressed = false;

    document.addEventListener("keydown", keyPressedHandler, false);
    document.addEventListener("keyup", keyUnpressedHandler, false);

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
      if(e.keyCode === 39) {
        rightPressed = false;
      } else if(e.keyCode === 37) {
        leftPressed = false;
      } else if (e.keyCode === 38) {
        upPressed = false;
      } else if (e.keyCode === 40 ){
        downPressed = false;
      }
    }

    if (rightPressed && upPressed) {
      this.vel[0] += DX * (Math.sqrt(2) / 2);
      this.vel[1] += DX * (Math.sqrt(2) / 2);
    } else if (rightPressed && downPressed) {
      this.vel[0] += DX * (Math.sqrt(2) / 2);
      this.vel[1] -= DX * (Math.sqrt(2) / 2);
    } else if (leftPressed && downPressed) {
      this.vel[0] -= DX * (Math.sqrt(2) / 2);
      this.vel[1] -= DX * (Math.sqrt(2) / 2);
    } else if (leftPressed && upPressed) {
      this.vel[0] -= DX * (Math.sqrt(2) / 2);
      this.vel[1] += DX * (Math.sqrt(2) / 2);
    } else if (rightPressed) {
      this.vel[0] += DX;
      if (this.vel[1] < DX/2 && this.vel[1] > DX/(-2)) {
        this.vel[1] = 0;
      } else if (this.vel[1] < 0) {
        this.vel[1] -= DX/2;
      } else if (this.vel[1] > 0) {
        this.vel[1] += DX/2;
      }
    } else if (leftPressed) {
      this.vel[0] -= DX;
      if (this.vel[1] < DX/2 && this.vel[1] > DX/(-2)) {
        this.vel[1] = 0;
      } else if (this.vel[1] < 0) {
        this.vel[1] -= DX/2;
      } else if (this.vel[1] > 0) {
        this.vel[1] += DX/2;
      }
    } else if (upPressed) {

      this.vel[1] += DX;
      if (this.vel[0] < DX/2 && this.vel[0] > DX/(-2)) {
        this.vel[0] = 0;
      } else if (this.vel[0] > 0) {
        this.vel[0] -= DX/2;
      } else if (this.vel[0] < 0) {
        this.vel[0] += DX/2;
      }
    } else if (downPressed) {
      this.vel[1] -= DX;
      if (this.vel[0] < DX/2 && this.vel[0] > DX/(-2)) {
        this.vel[0] = 0;
      } else if (this.vel[0] > 0) {
        this.vel[0] -= DX/2;
      } else if (this.vel[0] < 0) {
        this.vel[0] += DX/2;
      }
    } else {
      if (this.vel[0] > 0 && this.vel[1] > 0) {
        this.vel[0] -= DX/2;
        this.vel[1] += DX/2;
      } else if (this.vel[0] < 0 && this.vel[1] < 0) {
        this.vel[0] += DX/2;
        this.vel[1] -= DX/2;
      } else if (this.vel[0] > 0 && this.vel[1] < 0) {
        this.vel[0] -= DX/2;
        this.vel[1] -= DX/2;
      } else if (this.vel[0] < 0 && this.vel[1] > 0) {
        this.vel[0] += DX/2;
        this.vel[1] += DX/2;
      }
      if (this.vel[0] > 0) {
        this.vel[0] -= DX/2;
      } else if (this.vel[0] < 0) {
        this.vel[0] += DX/2;
      }
      if (this.vel[1] < 0) {
        this.vel[1] -= DX/2;
      } else if (this.vel[1] > 0) {
        this.vel[1] += DX/2;
      }
    }

    if (this.pos[1]+ this.vel[1] + this.radius > Gameplay.Y) {
      this.pos[1] = Gameplay.Y - this.radius;
      this.vel[1] = 0;
    } else if (this.pos[1] + this.vel[1] < this.radius) {
      this.pos[1]= this.radius;
      this.vel[1] = 0;
    } else {
      this.pos[1] += this.vel[1];
    }

    if (this.pos[0] + this.vel[0] + this.radius > Gameplay.X) {
      this.pos[0] = Gameplay.X - this.radius;
      this.vel[0] = 0;
    } else if (this.pos[0] + this.vel[0] < this.radius) {
      this.pos[0] = this.radius;
      this.vel[0] = 0;
    } else {
      this.pos[0] += this.vel[0];
    }
  }

  power(acc) {
    this.vel[0] += acc[0];
    this.vel[1] += acc[1];

    // var rightPressed = false;
    // var leftPressed = false;
    // var upPressed = false;
    // var downPressed = false;
    // var keyPressed = false;
    // var keyUnpressed = false;
    //
    // document.addEventListener("keydown", keyPressedHandler, false);
    // document.addEventListener("keyup", keyUnpressedHandler, false);
    //
    // function keyPressedHandler(e) {
    //   if(e.keyCode === 39) {
    //     rightPressed = true;
    //   } else if(e.keyCode === 37) {
    //     leftPressed = true;
    //   } else if (e.keyCode === 38) {
    //     upPressed = true;
    //   } else if (e.keyCode === 40 ) {
    //     downPressed = true;
    //   }
    // }
    //
    // function keyUnpressedHandler(e) {
    //   if(e.keyCode == 39) {
    //     rightPressed = false;
    //   } else if(e.keyCode == 37) {
    //     leftPressed = false;
    //   } else if (e.keyCode == 38) {
    //     upPressed = false;
    //   } else if (e.keyCode == 40 ){
    //     downPressed = false;
    //   }
    // }
    //
    // if (rightPressed && upPressed) {
    //   this.userObject.vel[0] += DX * (Math.sqrt(2) / 2);
    //   this.userObject.vel[1] += DX * (Math.sqrt(2) / 2);
    // } else if (rightPressed && downPressed) {
    //   this.userObject.vel[0] += DX * (Math.sqrt(2) / 2);
    //   this.userObject.vel[1] -= DX * (Math.sqrt(2) / 2);
    // } else if (leftPressed && downPressed) {
    //   this.userObject.vel[0] -= DX * (Math.sqrt(2) / 2);
    //   this.userObject.vel[1] -= DX * (Math.sqrt(2) / 2);
    // } else if (leftPressed && upPressed) {
    //   this.userObject.vel[0] -= DX * (Math.sqrt(2) / 2);
    //   this.userObject.vel[1] += DX * (Math.sqrt(2) / 2);
    // } else if (rightPressed) {
    //   this.userObject.vel[0] += DX;
    //   if (this.userObject.vel[1] < DX/2 && this.userObject.vel[1] > DX/(-2)) {
    //     this.userObject.vel[1] = 0;
    //   } else if (this.userObject.vel[1] < 0) {
    //     this.userObject.vel[1] -= DX/2;
    //   } else if (this.userObject.vel[1] > 0) {
    //     this.userObject.vel[1] += DX/2;
    //   }
    // } else if (leftPressed) {
    //   this.userObject.vel[0] -= DX;
    //   if (this.userObject.vel[1] < DX/2 && this.userObject.vel[1] > DX/(-2)) {
    //     this.userObject.vel[1] = 0;
    //   } else if (this.userObject.vel[1] < 0) {
    //     this.userObject.vel[1] -= DX/2;
    //   } else if (this.userObject.vel[1] > 0) {
    //     this.userObject.vel[1] += DX/2;
    //   }
    // } else if (upPressed) {
    //   this.userObject.vel[1] += DX;
    //   if (this.userObject.vel[0] < DX/2 && this.userObject.vel[0] > DX/(-2)) {
    //     this.userObject.vel[0] = 0;
    //   } else if (this.userObject.vel[0] > 0) {
    //     this.userObject.vel[0] -= DX/2;
    //   } else if (this.userObject.vel[0] < 0) {
    //     this.userObject.vel[0] += DX/2;
    //   }
    // } else if (downPressed) {
    //   this.userObject.vel[1] -= DX;
    //   if (this.userObject.vel[0] < DX/2 && this.userObject.vel[0] > DX/(-2)) {
    //     this.userObject.vel[0] = 0;
    //   } else if (this.userObject.vel[0] > 0) {
    //     this.userObject.vel[0] -= DX/2;
    //   } else if (this.userObject.vel[0] < 0) {
    //     this.userObject.vel[0] += DX/2;
    //   }
    // } else {
    //   if (this.userObject.vel[0] > 0 && this.userObject.vel[1] > 0) {
    //     this.userObject.vel[0] -= DX/2;
    //     this.userObject.vel[1] += DX/2;
    //   } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] < 0) {
    //     this.userObject.vel[0] += DX/2;
    //     this.userObject.vel[1] -= DX/2;
    //   } else if (this.userObject.vel[0] > 0 && this.userObject.vel[1] < 0) {
    //     this.userObject.vel[0] -= DX/2;
    //     this.userObject.vel[1] -= DX/2;
    //   } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] > 0) {
    //     this.userObject.vel[0] += DX/2;
    //     this.userObject.vel[1] += DX/2;
    //   }
    //   if (this.userObject.vel[0] > 0) {
    //     this.userObject.vel[0] -= DX/2;
    //   } else if (this.userObject.vel[0] < 0) {
    //     this.userObject.vel[0] += DX/2;
    //   }
    //   if (this.userObject.vel[1] < 0) {
    //     this.userObject.vel[1] -= DX/2;
    //   } else if (this.userObject.vel[1] > 0) {
    //     this.userObject.vel[1] += DX/2;
    //   }
    // }
  }
}

UserObject.RADIUS = 10;
UserObject.COLOR = 'blue';
UserObject.SPEED = 5;
const DX = 4;

module.exports = UserObject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Gameplay = __webpack_require__(1);
const Canvas = __webpack_require__(6);
const userObject = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Gameplay.X;
  canvasEl.height = Gameplay.Y;

  const ctx = canvasEl.getContext("2d");
  const gameplay = new Gameplay();
  new Canvas(gameplay, ctx).play();

  // var rightPressed = false;
  // var leftPressed = false;
  // var upPressed = false;
  // var downPressed = false;
  // var keyPressed = false;
  // var keyUnpressed = false;
  //
  // document.addEventListener("keydown", keyPressedHandler, false);
  // document.addEventListener("keyup", keyUnpressedHandler, false);
  //
  // function keyPressedHandler(e) {
  //   if(e.keyCode === 39) {
  //     rightPressed = true;
  //   } else if(e.keyCode === 37) {
  //     leftPressed = true;
  //   } else if (e.keyCode === 38) {
  //     upPressed = true;
  //   } else if (e.keyCode === 40 ) {
  //     downPressed = true;
  //   }
  // }
  //
  // function keyUnpressedHandler(e) {
  //   if(e.keyCode == 39) {
  //     rightPressed = false;
  //   } else if(e.keyCode == 37) {
  //     leftPressed = false;
  //   } else if (e.keyCode == 38) {
  //     upPressed = false;
  //   } else if (e.keyCode == 40 ){
  //     downPressed = false;
  //   }
  // }
  //
  // if (rightPressed && upPressed) {
  //   this.userObject.vel[0] += Canvas.DX * (Math.sqrt(2) / 2);
  //   this.userObject.vel[1] += Canvas.DX * (Math.sqrt(2) / 2);
  // } else if (rightPressed && downPressed) {
  //   this.userObject.vel[0] += Canvas.DX * (Math.sqrt(2) / 2);
  //   this.userObject.vel[1] -= Canvas.DX * (Math.sqrt(2) / 2);
  // } else if (leftPressed && downPressed) {
  //   this.userObject.vel[0] -= Canvas.DX * (Math.sqrt(2) / 2);
  //   this.userObject.vel[1] -= Canvas.DX * (Math.sqrt(2) / 2);
  // } else if (leftPressed && upPressed) {
  //   this.userObject.vel[0] -= Canvas.DX * (Math.sqrt(2) / 2);
  //   this.userObject.vel[1] += Canvas.DX * (Math.sqrt(2) / 2);
  // } else if (rightPressed) {
  //   this.userObject.vel[0] += Canvas.DX;
  //   if (this.userObject.vel[1] < Canvas.DX/2 && this.userObject.vel[1] > Canvas.DX/(-2)) {
  //     this.userObject.vel[1] = 0;
  //   } else if (this.userObject.vel[1] < 0) {
  //     this.userObject.vel[1] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[1] > 0) {
  //     this.userObject.vel[1] += Canvas.DX/2;
  //   }
  // } else if (leftPressed) {
  //   this.userObject.vel[0] -= Canvas.DX;
  //   if (this.userObject.vel[1] < Canvas.DX/2 && this.userObject.vel[1] > Canvas.DX/(-2)) {
  //     this.userObject.vel[1] = 0;
  //   } else if (this.userObject.vel[1] < 0) {
  //     this.userObject.vel[1] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[1] > 0) {
  //     this.userObject.vel[1] += Canvas.DX/2;
  //   }
  // } else if (upPressed) {
  //   this.userObject.vel[1] += Canvas.DX;
  //   if (this.userObject.vel[0] < Canvas.DX/2 && this.userObject.vel[0] > Canvas.DX/(-2)) {
  //     this.userObject.vel[0] = 0;
  //   } else if (this.userObject.vel[0] > 0) {
  //     this.userObject.vel[0] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[0] < 0) {
  //     this.userObject.vel[0] += Canvas.DX/2;
  //   }
  // } else if (downPressed) {
  //   this.userObject.vel[1] -= Canvas.DX;
  //   if (this.userObject.vel[0] < Canvas.DX/2 && this.userObject.vel[0] > Canvas.DX/(-2)) {
  //     this.userObject.vel[0] = 0;
  //   } else if (this.userObject.vel[0] > 0) {
  //     this.userObject.vel[0] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[0] < 0) {
  //     this.userObject.vel[0] += Canvas.DX/2;
  //   }
  // } else {
  //   if (this.userObject.vel[0] > 0 && this.userObject.vel[1] > 0) {
  //     this.userObject.vel[0] -= Canvas.DX/2;
  //     this.userObject.vel[1] += Canvas.DX/2;
  //   } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] < 0) {
  //     this.userObject.vel[0] += Canvas.DX/2;
  //     this.userObject.vel[1] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[0] > 0 && this.userObject.vel[1] < 0) {
  //     this.userObject.vel[0] -= Canvas.DX/2;
  //     this.userObject.vel[1] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] > 0) {
  //     this.userObject.vel[0] += Canvas.DX/2;
  //     this.userObject.vel[1] += Canvas.DX/2;
  //   }
  //   if (this.userObject.vel[0] > 0) {
  //     this.userObject.vel[0] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[0] < 0) {
  //     this.userObject.vel[0] += Canvas.DX/2;
  //   }
  //   if (this.userObject.vel[1] < 0) {
  //     this.userObject.vel[1] -= Canvas.DX/2;
  //   } else if (this.userObject.vel[1] > 0) {
  //     this.userObject.vel[1] += Canvas.DX/2;
  //   }
  // }
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const PositionalComponents = __webpack_require__(0);
const OtherObject = __webpack_require__(2);
const UserObject = __webpack_require__(3);

const STYLE1 = {
  COLOR: "yellow",
  RADIUS: 5,
  SPEED: 4
};

class EnemyObject1 extends OtherObject {
  constructor(conditions = {}) {
    conditions.color = STYLE1.COLOR;
    conditions.radius = STYLE1.RADIUS;
    conditions.pos = conditions.pos || conditions.gameplay.randomPosition();
    conditions.vel = conditions.vel || [0, 0];
    super(conditions);
  }

  // collideWith(otherObject) {
  //   if (otherObject instanceof UserObject) {
  //     otherObject.relocate();
  //     return true;
  //   } else if (otherObject instanceof EnemyObject1) {
  //     this.destroy();
  //     otherObject.destroy();
  //     return true;
  //   }
  //   return false;
  // }
}

module.exports = EnemyObject1;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

//key codes: left (37), up (38), right (39), down (40)


class Canvas {
  constructor(gameplay, context) {
    this.context = context;
    this.gameplay = gameplay;
    this.userObject = this.gameplay.addUser();
  }

  bindKeyHandlers() {
    const user = this.userObject;

    Object.keys(Canvas.ARROWS).forEach((k) => {
      const move = Canvas.ARROWS[k];
      key(k, () => { user.power(move); });
      

      // if (y + vel[1] + userObjectRadius > Gameplay.Y) {
      //   y = Gameplay.Y - userObjectRadius;
      //   vel[1] = 0;
      // } else if (y + vel[1] < userObjectRadius) {
      //   y = userObjectRadius;
      //   vel[1] = 0;
      // } else {
      //   y += vel[1];
      // }
      //
      // if (x + vel[0] + userObjectRadius > Gameplay.X) {
      //   x = Gameplay.X - userObjectRadius;
      //   vel[0] = 0;
      // } else if (x + vel[0] < userObjectRadius) {
      //   x = userObjectRadius;
      //   vel[0] = 0;
      // } else {
      //   x += vel[0];
      // }
    });



  // controls() {
  //
  }

  play() {
    this.bindKeyHandlers();
    this.elapsed = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(t) {
    const dt = t - this.elapsed;
    this.gameplay.step(dt);
    this.gameplay.draw(this.context);
    this.elapsed = t;
    requestAnimationFrame(this.animate.bind(this));
  }
}

const DX = 2;
Canvas.ARROWS = {
  up: [0, -DX],
  down: [0 ,DX],
  left: [-DX, 0],
  right: [DX, 0]
};


module.exports = Canvas;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map