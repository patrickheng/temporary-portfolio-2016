import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectVisual extends Component {

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
    this.visualEls = this.base.getElementsByClassName('project-visual__el');

    this.visualEls[0].classList.add('project-visual__el--is-active');
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

  onProjectChange(currentProject) {
    this.setState({ currentProject });

    for (let i = 0; i < this.visualEls.length; i++) {
      this.visualEls[i].classList.remove('project-visual__el--is-active');
    }

    this.visualEls[currentProject.id].classList.add('project-visual__el--is-active');
  }

  render({}, {projects, currentProject}) {
    let projectVisuals = [];

    for (let i = 0; i < projects.length; i++) {
      const classStr = `project-visual__el project-visual__el--${projects[i].ref}`;
      projectVisuals.push(<li class={classStr}></li>)
    }

    return (
      <div class="project-visual">
        <div class="project-visual__container">
          <div class="project-visual__transition-block"></div>
          <ul class="project-visual___list">
            {projectVisuals}
          </ul>
        </div>
      </div>
    );
  }

}

export default ProjectVisual;