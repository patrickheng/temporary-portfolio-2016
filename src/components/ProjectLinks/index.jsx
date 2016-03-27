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
  }

  render({}, {projects, currentProject}) {
    let links = [];

    for (let i = 0; i < projects.length; i++) {

      // TO DO Find a better way
      let link;

      if(projects[i].links.site && projects[i].links.repository) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" src={projects[i].links.site} target="_blank">View website</a>
              <a class="project-links__el-link" src={projects[i].links.repository} target="_blank">View it on Github</a>
          </div>
        );
      } else if(projects[i].links.site) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" src={projects[i].links.site} target="_blank">View website</a>
          </div>
        );
      } else {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link" src={projects[i].links.repository} target="_blank">View it on Github</a>
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