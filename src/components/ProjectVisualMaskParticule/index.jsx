import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import PixiApp from './PixiApp';

import DrawingCanvas from './DrawingCanvas';

import throttle from 'lodash.throttle';

import {
  WINDOW_RESIZE
} from 'config/messages';

class ProjectVisual extends Component {

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.mouse = {
      x: 0,
      y: 0
    };

    this.addListerners();

    this.getOffset();

    const drawingCanvasEl = this.base.querySelector('.project-visual_drawing-canvas');
    this.drawingCanvas = new DrawingCanvas(drawingCanvasEl);
    this.pixiApp = new PixiApp(this.base, this.drawingCanvas);
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onWindowResize = this.onWindowResize.bind(this);
    this.mouseMoveThrottle = throttle(this.onMouseMove.bind(this), 200);
  }

  addListerners() {
    Emitter.on(WINDOW_RESIZE, this.mouseMoveThrottle);

  }

  removeListerners() {
    Emitter.off(WINDOW_RESIZE, this.mouseMoveThrottle);
  }

  onWindowResize({width, height}) {
    this.getOffset();
    this.pixiApp.onWindowResize();
  }

  getOffset() {
    this.boundingRect = this.base.getBoundingClientRect();
    this.offsetTop = this.boundingRect.top;
    this.offsetLeft = this.boundingRect.left;
  }

  onMouseMove(ev) {
    this.mouse.x = ev.pageX - this.offsetLeft;
    this.mouse.y = ev.pageY - this.offsetTop;

    this.drawingCanvas.onMouseMove({mouseX: this.mouse.x, mouseY: this.mouse.y});
    this.pixiApp.onMouseMove({mouseX: this.mouse.x, mouseY: this.mouse.y});
  }

  render(props, state) {
    return (
      <div class="project-visual" onMouseMove={::this.onMouseMove}>
        <canvas class="project-visual_drawing-canvas"></canvas>
      </div>
    );
  }

}

export default ProjectVisual;