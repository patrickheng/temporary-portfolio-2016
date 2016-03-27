import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectLinks extends Component {

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
    this.projectLinksEls = this.base.getElementsByClassName('project-links__el');
    this.projectLinksEls[0].classList.add(`project-links__el--is-active`);
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

    for (let i = 0; i < this.projectLinksEls.length; i++) {
      this.projectLinksEls[i].className = "project-links__el";
      this.projectLinksEls[this.state.currentProject.id].classList.add(`project-links__el--is-active`);
    }
  }

  render({}, {projects, currentProject}) {
    let links = [];

    for (let i = 0; i < projects.length; i++) {

      // TO DO Find a better way
      let link;

      if(projects[i].links.site && projects[i].links.repository) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" href={projects[i].links.site} target="_blank">View website</a>
              <a class="project-links__el-link" href={projects[i].links.repository} target="_blank">View it on Github</a>
          </div>
        );
      } else if(projects[i].links.site) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" href={projects[i].links.site} target="_blank">View website</a>
          </div>
        );
      } else {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" href={projects[i].links.repository} target="_blank">View it on Github</a>
          </div>
        );
      }

      links.push(link);
    }

    return (
      <div class="project-links">
        {links}
      </div>
    );
  }

}

export default ProjectLinks;