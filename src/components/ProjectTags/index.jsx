import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectTags extends Component {

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

    this.projectEls = this.base.getElementsByClassName('projects-tags__project-el');
    this.projectEls[0].classList.add(`projects-tags__project-el--is-active`);

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

    for (let i = 0; i < this.projectEls.length; i++) {
      this.projectEls[i].className = "projects-tags__project-el";
      this.projectEls[this.state.currentProject.id].classList.add(`projects-tags__project-el--is-active`);
    }
  }

  render({}, {projects}) {

    let content = projects.map((project, i)=>{

      const tags = project.tags.map((tag, i)=>{
        return (
          <li class="project-tags__tag-el">
              {tag}
          </li>
        );
      });

      return (
        <li class="projects-tags__project-el">
          <ul class="projects-tags__tag-list">
            {tags}
          </ul>
        </li>
      )
    });

    return (
      <div class="project-tags">
        <ul class="projects-tags__project-list">
          {content}
        </ul>
      </div>
    );
  }

}

export default ProjectTags;