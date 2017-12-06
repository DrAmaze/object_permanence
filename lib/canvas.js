//key codes: left (37), up (38), right (39), down (40)


class Canvas {
  constructor(gameplay, context) {
    this.context = context;
    this.gameplay = gameplay;
    this.userObject = this.gameplay.addUser();
  }

  draw(t) {
    const dt = t - this.elapsed;
    this.gameplay.time(dt);
    this.gameplay.draw(this.context);
    this.elapsed = t;
    requestAnimationFrame(this.draw.bind(this));
  }

  bindKeyHandlers() {
    const user = this.userObject;

    Object.keys(Canvas.ARROWS).forEach((k) => {
      const move = Canvas.ARROWS[k];
      key(k, () => { user.power(move); });
    });

  }

  // controls() {
  //
  //   var rightPressed = false;
  //   var leftPressed = false;
  //   var upPressed = false;
  //   var downPressed = false;
  //   var keyPressed = false;
  //   var keyUnpressed = false;
  //
  //   document.addEventListener("keydown", keyPressedHandler, false);
  //   document.addEventListener("keyup", keyUnpressedHandler, false);
  //
  //   function keyPressedHandler(e) {
  //     if(e.keyCode === 39) {
  //       rightPressed = true;
  //     } else if(e.keyCode === 37) {
  //       leftPressed = true;
  //     } else if (e.keyCode === 38) {
  //       upPressed = true;
  //     } else if (e.keyCode === 40 ) {
  //       downPressed = true;
  //     }
  //   }
  //
  //   function keyUnpressedHandler(e) {
  //     if(e.keyCode == 39) {
  //       rightPressed = false;
  //     } else if(e.keyCode == 37) {
  //       leftPressed = false;
  //     } else if (e.keyCode == 38) {
  //       upPressed = false;
  //     } else if (e.keyCode == 40 ){
  //       downPressed = false;
  //     }
  //   }
  //
  //   if (rightPressed && upPressed) {
  //     this.userObject.vel[0] += Canvas.DX * (Math.sqrt(2) / 2);
  //     this.userObject.vel[1] += Canvas.DX * (Math.sqrt(2) / 2);
  //   } else if (rightPressed && downPressed) {
  //     this.userObject.vel[0] += Canvas.DX * (Math.sqrt(2) / 2);
  //     this.userObject.vel[1] -= Canvas.DX * (Math.sqrt(2) / 2);
  //   } else if (leftPressed && downPressed) {
  //     this.userObject.vel[0] -= Canvas.DX * (Math.sqrt(2) / 2);
  //     this.userObject.vel[1] -= Canvas.DX * (Math.sqrt(2) / 2);
  //   } else if (leftPressed && upPressed) {
  //     this.userObject.vel[0] -= Canvas.DX * (Math.sqrt(2) / 2);
  //     this.userObject.vel[1] += Canvas.DX * (Math.sqrt(2) / 2);
  //   } else if (rightPressed) {
  //     this.userObject.vel[0] += Canvas.DX;
  //     if (this.userObject.vel[1] < Canvas.DX/2 && this.userObject.vel[1] > Canvas.DX/(-2)) {
  //       this.userObject.vel[1] = 0;
  //     } else if (this.userObject.vel[1] < 0) {
  //       this.userObject.vel[1] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[1] > 0) {
  //       this.userObject.vel[1] += Canvas.DX/2;
  //     }
  //   } else if (leftPressed) {
  //     this.userObject.vel[0] -= Canvas.DX;
  //     if (this.userObject.vel[1] < Canvas.DX/2 && this.userObject.vel[1] > Canvas.DX/(-2)) {
  //       this.userObject.vel[1] = 0;
  //     } else if (this.userObject.vel[1] < 0) {
  //       this.userObject.vel[1] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[1] > 0) {
  //       this.userObject.vel[1] += Canvas.DX/2;
  //     }
  //   } else if (upPressed) {
  //     this.userObject.vel[1] += Canvas.DX;
  //     if (this.userObject.vel[0] < Canvas.DX/2 && this.userObject.vel[0] > Canvas.DX/(-2)) {
  //       this.userObject.vel[0] = 0;
  //     } else if (this.userObject.vel[0] > 0) {
  //       this.userObject.vel[0] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[0] < 0) {
  //       this.userObject.vel[0] += Canvas.DX/2;
  //     }
  //   } else if (downPressed) {
  //     this.userObject.vel[1] -= Canvas.DX;
  //     if (this.userObject.vel[0] < Canvas.DX/2 && this.userObject.vel[0] > Canvas.DX/(-2)) {
  //       this.userObject.vel[0] = 0;
  //     } else if (this.userObject.vel[0] > 0) {
  //       this.userObject.vel[0] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[0] < 0) {
  //       this.userObject.vel[0] += Canvas.DX/2;
  //     }
  //   } else {
  //     if (this.userObject.vel[0] > 0 && this.userObject.vel[1] > 0) {
  //       this.userObject.vel[0] -= Canvas.DX/2;
  //       this.userObject.vel[1] += Canvas.DX/2;
  //     } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] < 0) {
  //       this.userObject.vel[0] += Canvas.DX/2;
  //       this.userObject.vel[1] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[0] > 0 && this.userObject.vel[1] < 0) {
  //       this.userObject.vel[0] -= Canvas.DX/2;
  //       this.userObject.vel[1] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[0] < 0 && this.userObject.vel[1] > 0) {
  //       this.userObject.vel[0] += Canvas.DX/2;
  //       this.userObject.vel[1] += Canvas.DX/2;
  //     }
  //     if (this.userObject.vel[0] > 0) {
  //       this.userObject.vel[0] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[0] < 0) {
  //       this.userObject.vel[0] += Canvas.DX/2;
  //     }
  //     if (this.userObject.vel[1] < 0) {
  //       this.userObject.vel[1] -= Canvas.DX/2;
  //     } else if (this.userObject.vel[1] > 0) {
  //       this.userObject.vel[1] += Canvas.DX/2;
  //     }
  //   }

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

  // }

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

Canvas.ARROWS = {
  up: [0, -1],
  down: [0 ,1],
  left: [-1, 0],
  right: [1, 0]
};

Canvas.DX = 3;

module.exports = Canvas;
