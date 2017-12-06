//key codes: left (37), up (38), right (39), down (40)

class Canvas {
  constructor(gameplay, context) {
    this.context = context;
    this.gameplay = gameplay;
    this.userObject = this.gameplay.addUserObject();
  }

  controls() {
    const user = this.userObject;
    Object.keys(Canvas.ARROWS).forEach((k) => {
      const move = Canvas.ARROWS[k];
      key(k, () => {
        user.move(move);
      });
    });
  }

  draw(t) {
    const dt = t - this.elapsed;
    this.gameplay.time(dt);
    this.gameplay.draw(this.context);
    this.elapsed = t;
    requestAnimationFrame(this.draw.bind(this));
  }

  play() {
    this.controls();
    this.elapsed = 0;
    requestAnimationFrame(this.draw.bind(this));
  }
}

Canvas.ARROWS = {
  38: [0, -1],
  40: [0 ,1],
  37: [-1, 0],
  39: [1, 0]
};

module.exports = Canvas;
