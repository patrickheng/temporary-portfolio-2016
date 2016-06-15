import './styles.scss';

import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import States from 'core/States';

import {
  PROJECT_CHANGE,
  SPLASHSCREEN_HIDE
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

    this.titleEls = this.base.getElementsByClassName('project-title__el');
    this.titleEls[0].classList.add('project-title__el--is-active');

    this.oldProject = this.state.currentProject;

    this.tl = new TimelineMax();
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
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
    TweenMax.fromTo(this.titleEls[0], 1, {y: '150%', opacity: 0}, {y: '0%', opacity: 1, delay: 0.4, ease: Expo.easeOut})
  }

  onProjectChange({currentProject, direction}) {

    const prevEl= this.titleEls[this.oldProject.id];
    const nextEl = this.titleEls[currentProject.id];

    for (let i = 0; i < this.titleEls.length; i++) {
      this.titleEls[i].classList.remove('project-title__el--is-active');
      this.titleEls[i].classList.remove('project-title__el--is-previous');
    }

    this.tl.clear();
    this.tl.kill();

    nextEl.classList.add('project-title__el--is-active');
    prevEl.classList.add('project-title__el--is-previous');

    if(direction === -1) {
      this.tl
        .fromTo(prevEl, 0.7, {y: '0%'}, {y: '150%', ease: Expo.easeOut})
        .fromTo(nextEl, 0.7, {y: '-150%'}, {y: '0%', ease: Expo.easeOut}, 0.3);
    } else {
      this.tl
        .fromTo(prevEl, 1, {y: '0%'}, {y: '-150%', ease: Expo.easeOut})
        .fromTo(nextEl, 1, {y: '150%'}, {y: '0%', ease: Expo.easeOut}, 0.4);
    }

    this.oldProject = currentProject;
  }

  render({}, {projects}) {
    let titles = [];

    for (let i = 0; i < projects.length; i++) {
      titles.push(<span class="project-title__el">{projects[i].name}</span>);
    }

    return (
      <div class="project-title">
        {titles}
      </div>
    );
  }

}

export default ProjectTitle;
