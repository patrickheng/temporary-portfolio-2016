class DrawingCanvas {
  constructor(el) {
    this.canvas = el;

    this.ctx = this.canvas.getContext("2d");


    this.squareSize = 40;
  }

  setSize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  onMouseMove({mouseX, mouseY}) {
    this.ctx.rect(0,0,5000,5000);
    this.ctx.fillStyle = "black";
    this.ctx.fill();

    this.ctx.rect( mouseX - this.squareSize/2, mouseY - this.squareSize/2, this.squareSize, this.squareSize );
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  }

  getNode() {
    return this.canvas;
  }

  update() {

  }
}

export default DrawingCanvas;