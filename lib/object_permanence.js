const Gameplay = require("./gameplay");
const Canvas = require("./canvas");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Gameplay.X;
  canvasEl.height = Gameplay.Y;

  const ctx = canvasEl.getContext("2d");
  const gameplay = new Gameplay();
  new Canvas(gameplay, ctx).play();
});
