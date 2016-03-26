import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import Emitter from 'core/Emitter';

import ProjectLetters from 'components/ProjectLetters';
import ProjectVisual from 'components/ProjectVisual';

import {
  WINDOW_RESIZE
} from 'config/messages';

class Application extends Component {

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
      <div class="application">
        <ProjectLetters />
        <ProjectVisual />
      </div>
    );
  }

}

export default Application;