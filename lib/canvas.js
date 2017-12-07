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
