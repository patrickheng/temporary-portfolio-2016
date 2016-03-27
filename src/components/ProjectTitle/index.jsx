import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectTitle extends Component {

  state = {
    projects: States.projects,
    currentProject: States.projects[0]
  }

  constructor() {
    super();

  }

  componentDidMount() {

    this.bind();

    this.addListerners();

  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {

    this.removeListerners();

  }

  bind() {

  }

  addListerners() {
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange() {
    // TweenMax.to()
  }

  render({}, {projects}) {
    let titles = [];

    for (let i = 0; i < projects.length; i++) {
      titles.push(<h2 class="project-title__el">{projects[i].name}</h2>)
    }

    return (
      <div class="project-title">
        {titles}
      </div>
    );
  }

}

export default ProjectTitle;