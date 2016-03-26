import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import Emitter from 'core/Emitter';

import Logo from 'components/Logo';
import ProjectContainer from 'components/ProjectContainer';

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
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  addListerners() {

    window.addEventListener('resize', this.onWindowResize, false);

    document.addEventListener('keyup', this.onKeyUp, false);
  }

  removeListerners() {

    window.removeEventListerner('resize', this.onWindowResize, false);
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  broadcastWindowOnResize() {

    Emitter.emit(WINDOW_RESIZE, {width: window.innerWidth, height:window.innerHeight});
  }

  onKeyUp(ev) {
    if(ev.keyCode === 39) {

    } else if (ev.keyCode === 37) {

    }
  }

  render(props, state) {

    return (
      <div class="application">
        <Logo />
        <ProjectContainer/>
      </div>
    );
  }

}

export default Application;