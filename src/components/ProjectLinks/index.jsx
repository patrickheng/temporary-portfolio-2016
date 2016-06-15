import './styles.scss';

import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  SPLASHSCREEN_HIDE,
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

    this.tl = new TimelineMax();
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
    this.enterAnimation = this.enterAnimation.bind(this);
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {
    Emitter.on(SPLASHSCREEN_HIDE, this.enterAnimation);
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  enterAnimation() {
    const linksContainer = this.projectLinksEls[0];
    const links = linksContainer.getElementsByClassName('project-links__el-link');

    TweenMax.from(links, 1, {x: -10, opacity: 0.9, ease: Expo.easeOut});
  }

  onProjectChange({currentProject}) {

    for (let i = 0; i < this.projectLinksEls.length; i++) {
      this.projectLinksEls[i].className = "project-links__el";
    }

    const linksContainer = this.projectLinksEls[currentProject.id];
    const links = linksContainer.getElementsByClassName('project-links__el-link');

    linksContainer.classList.add(`project-links__el--is-active`);

    this.tl.clear();
    this.tl.kill();

    this.tl
      .staggerFromTo(links, 0.4, {x: -10, opacity: 0}, {x: 0, opacity: 1, ease: Back.easeOut, delay: 0.3}, 0.3);

  }

  render({}, {projects, currentProject}) {
    let links = [];

    for (let i = 0; i < projects.length; i++) {

      // TO DO Find a better way
      let link;

      if(projects[i].links.site && projects[i].links.repository) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link link" href={projects[i].links.site} target="_blank">View website</a>
              <a class="project-links__el-link link" href={projects[i].links.repository} target="_blank">View it on Github</a>
          </div>
        );
      } else if(projects[i].links.site) {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link link" href={projects[i].links.site} target="_blank">View website</a>
          </div>
        );
      } else {
        link = (
          <div class="project-links__el">
              <a class="project-links__el-link link" href={projects[i].links.repository} target="_blank">View it on Github</a>
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
