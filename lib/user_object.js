const PositionalComponents = require('./positional_components');
const OtherObject = require('./other_object');

class UserObject {
  constructor(conditions) {
    conditions.radius = UserObject.USEROBJECTRADIUS;
    conditions.vel = [0, 0] || conditions.vel;
    conditions.color = conditions.color || "blue";
  }

  move(vel) {
    this.vel[0] += vel[0];
    this.vel[1] += vel[1];
  }

}

UserObject.USEROBJECTRADIUS = 10;

module.exports = UserObject;
