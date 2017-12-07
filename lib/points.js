class Points {
  constructor() {
    this.time = 0;
    this.points = 0;
  }

  step() {
    this.points += 1;
  }

  display() {
    let score = document.getElementById('points-display');
    score.innerHTML = this.points;
  }

}

module.exports = Points;
