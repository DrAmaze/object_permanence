const PositionalComponents = require("./positional_components");

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
