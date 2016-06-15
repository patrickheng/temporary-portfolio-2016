import './styles.scss';

import { h, Component } from 'preact';
import Hammer from 'hammerjs';

import States from 'core/States';
import Emitter from 'core/Emitter';

import ProjectVisual from 'components/ProjectVisual';
import ProjectInfos from 'components/ProjectInfos';
import ProjectTags from 'components/ProjectTags';
import ProjectIndex from 'components/ProjectIndex';
import ProjectTitle from 'components/ProjectTitle';
import ProjectLinks from 'components/ProjectLinks';

import {
  PROJECT_CHANGE,
  ABOUT_AFTER_OPEN,
  ABOUT_AFTER_CLOSE
} from 'config/messages';

class Application extends Component {

  constructor() {
    super();

  }

  componentWillMount() {
    this.canWheel = true;
    this.wheelPromise = null;
  }

  componentDidMount() {

    this.bind();

    this.addListerners();

    this.wrapperEl = document.querySelector('.wrapper');
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.afterAboutOpen = this.afterAboutOpen.bind(this);
    this.afterAboutClose = this.afterAboutClose.bind(this);
    this.addListerners = this.addListerners.bind(this);
    this.removeListerners = this.removeListerners.bind(this);
  }

  addListerners() {
    document.addEventListener('keyup', this.onKeyUp, false);

    if(States.browserName === "firefox") {
      document.addEventListener('DOMMouseScroll', this.onWheel, false);
    } else {
      document.addEventListener('wheel', this.onWheel, false);
    }

    this.managerHomepage = new Hammer.Manager(this.base, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
      ]
    });

    if(States.deviceType !== 'desktop') {
      this.managerHomepage.on('swipeleft', this.nextProject);
      this.managerHomepage.on('swiperight', this.previousProject);
    }

    Emitter.on(ABOUT_AFTER_OPEN, this.afterAboutOpen);
    Emitter.on(ABOUT_AFTER_CLOSE, this.afterAboutClose);
  }

  removeListerners() {

    document.removeEventListener('keyup', this.onKeyUp, false);


    if(States.browserName === "firefox") {
      document.removeEventListener('DOMMouseScroll', this.onWheel, false);
    } else {
      document.removeEventListener('wheel', this.onWheel, false);
    }

    if(States.deviceType !== 'desktop') {
      this.managerHomepage.off('swipeleft', this.nextProject);
      this.managerHomepage.off('swiperight', this.previousProject);
    }

    Emitter.off(ABOUT_AFTER_OPEN, this.addListerners);
    Emitter.off(ABOUT_AFTER_CLOSE, this.removeListerners);
  }

  onKeyUp(ev) {
    if(ev.keyCode === 39 || ev.keyCode === 40 ) {
      this.nextProject();
    } else if (ev.keyCode === 37 || ev.keyCode === 38) {
      this.previousProject();
    }
  }

  onWheel(ev) {
    ev.preventDefault();

    const deltaY = (ev.wheelDelta) ? ev.deltaY : ev.detail * 200;

    if(deltaY < -50 && this.canWheel) {
      this.canWheel = false;

      clearTimeout(this.wheelPromise);

      this.wheelPromise = setTimeout(()=>{
        this.canWheel = true;
      }, 800);

      this.previousProject();
    }
    else if(deltaY > 50 && this.canWheel) {
      this.canWheel = false;

      clearTimeout(this.wheelPromise);

      this.wheelPromise = setTimeout(()=>{
        this.canWheel = true;
      }, 800);

      this.nextProject();
    }
  }

  previousProject() {
    States.currentProjectIndex = (States.currentProjectIndex > 0) ? States.currentProjectIndex - 1 : States.projectsNb - 1;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: -1
    });
  }

  nextProject() {
    States.currentProjectIndex = (States.currentProjectIndex < States.projectsNb - 1) ? States.currentProjectIndex + 1 : 0;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: 1
    });
  }

  afterAboutOpen() {
    this.removeListerners();

    this.wrapperEl = document.querySelector('.application');
    this.wrapperEl.classList.add('application--about-open');
  }

  afterAboutClose() {
    this.addListerners();
    this.wrapperEl.classList.remove('application--about-open');
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
