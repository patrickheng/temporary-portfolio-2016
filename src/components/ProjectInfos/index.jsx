import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectLetters extends Component {

  state = {
    projects: States.projects,
    currentProject: States.projects[0]
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();

    this.projectInfoEls = this.base.getElementsByClassName('project-infos__el');
    this.projectInfoEls[this.state.currentProject.id].classList.add(`project-infos__el--is-active`);
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange({currentProject}) {
    this.setState({ currentProject });

    for (let i = 0; i < this.projectInfoEls.length; i++) {
      this.projectInfoEls[i].className = "project-infos__el";
      this.projectInfoEls[this.state.currentProject.id].classList.add(`project-infos__el--is-active`);
    }
  }

  render({}, {projects}) {
    let infos = [];

    for (let i = 0; i < projects.length; i++) {
      infos.push(
        <div class="project-infos__el">
          <h2 class="project-infos__title">{projects[i].name}</h2>
          <p class="project-infos__description">{projects[i].description}</p>
        </div>
      );
    }

    return (
      <div class="project-infos">
          {infos}
      </div>
    );
  }

}

export default ProjectLetters;