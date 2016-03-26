import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import Emitter from 'core/Emitter';

import States from 'core/States';

import {
  WINDOW_RESIZE
} from 'config/messages';

class ProjectLetter extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {

    this.onWindowResize = debounce(this.broadcastWindowOnResize, 100);
  }

  addListerners() {

    window.addEventListener('resize', this.onWindowResize, false);
  }

  removeListerners() {

    window.removeEventListerner('resize', this.onWindowResize, false);
  }

  broadcastWindowOnResize() {

    Emitter.emit(WINDOW_RESIZE, {width: window.innerWidth, height:window.innerHeight});
  }

  render(props, state) {

    return (
      <div class="project-letter">
        {props.letter}
      </div>
    );
  }

}

export default ProjectLetter;