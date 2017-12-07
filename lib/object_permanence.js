const Gameplay = require("./gameplay");
const Canvas = require("./canvas");
const userObject = require('./user_object');

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
