import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import PixiApp from './PixiApp';

import {
  WINDOW_RESIZE
} from 'config/messages';

class ProjectVisual extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();

    this.pixiApp = new PixiApp(this.base);
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  addListerners() {
    Emitter.on(WINDOW_RESIZE, this.onWindowResize);
  }

  removeListerners() {
    Emitter.off(WINDOW_RESIZE, this.onWindowResize);
  }

  onWindowResize({width, height}) {
    this.pixiApp.onWindowResize();
  }

  render(props, state) {
    return (
      <div class="project-visual">

      </div>
    );
  }

}

export default ProjectVisual;