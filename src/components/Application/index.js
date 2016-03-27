import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import States from 'core/States';
import Emitter from 'core/Emitter';

import Logo from 'components/Logo';
import ProjectContainer from 'components/ProjectContainer';

import {
  WINDOW_RESIZE,
  PROJECT_CHANGE
} from 'config/messages';

class Application extends Component {

  state = {
  }

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
      this.nextProject();
    } else if (ev.keyCode === 37) {
      this.previousProject();
    }
  }

  previousProject() {
    States.currentProjectIndex = (States.currentProjectIndex > 0) ? States.currentProjectIndex - 1 : States.projectsNb - 1;
    Emitter.emit(PROJECT_CHANGE, States.projects[States.currentProjectIndex]);
  }

  nextProject() {
    States.currentProjectIndex = (States.currentProjectIndex < States.projectsNb - 1) ? States.currentProjectIndex + 1 : 0;
    Emitter.emit(PROJECT_CHANGE, States.projects[States.currentProjectIndex]);
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