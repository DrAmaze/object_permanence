const PositionalComponents = require("./positional_components");

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
