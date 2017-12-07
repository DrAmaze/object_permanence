const PositionalComponents = require('./positional_components');
const OtherObject = require('./other_object');
const Gameplay = require('./gameplay');

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
