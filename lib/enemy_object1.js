const PositionalComponents = require("./positional_components");
const OtherObject = require("./other_object");
const UserObject = require('./user_object');

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
