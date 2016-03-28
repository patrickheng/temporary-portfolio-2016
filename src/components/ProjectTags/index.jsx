import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE,
  SPLASHSCREEN_HIDE
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

    this.tl = new TimelineMax();
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
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {

    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {

    Emitter.off(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  enterAnimation() {
    const tagsContainerActive = this.projectEls[0];
    const tags = tagsContainerActive.getElementsByClassName('project-tags__tag-el');

    this.tl
      .staggerFromTo(tags, 0.9, {opacity: 0, y: 5}, {opacity: 1, y: 0, ease: Expo.easeOut, delay: 0.1}, 0.2);
  }

  onProjectChange({currentProject}) {

    // this.setState({ currentProject });

    const tagsContainerActive = this.projectEls[currentProject.id];
    const tags = tagsContainerActive.getElementsByClassName('project-tags__tag-el');

    for (let i = 0; i < this.projectEls.length; i++) {
      this.projectEls[i].className = "projects-tags__project-el";
    }

    tagsContainerActive.classList.add(`projects-tags__project-el--is-active`);

    this.tl.clear();
    this.tl.kill();

    this.tl
      .staggerFromTo(tags, 0.9, {opacity: 0, y: 5}, {opacity: 1, y: 0, ease: Expo.easeOut, delay: 0.1}, 0.2);
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