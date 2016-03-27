import { h, Component } from 'preact';

import States from 'core/States';
import Emitter from 'core/Emitter';

import ProjectLetters from 'components/ProjectLetters';
import ProjectVisual from 'components/ProjectVisual';
import ProjectInfos from 'components/ProjectInfos';
import ProjectTags from 'components/ProjectTags';
import ProjectIndex from 'components/ProjectIndex';
import ProjectTitle from 'components/ProjectTitle';
import ProjectLinks from 'components/ProjectLinks';

import {
  PROJECT_CHANGE
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

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  addListerners() {

    document.addEventListener('keyup', this.onKeyUp, false);
  }

  removeListerners() {

    document.removeEventListener('keyup', this.onKeyUp, false);
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
      <div class="project-container">
        <div class="project-container__content">
          <ProjectIndex />
          <ProjectTitle />
          <ProjectVisual />
          <ProjectInfos />
          <ProjectTags />
          <ProjectLinks />
        </div>
      </div>
    );
  }

}

export default Application;