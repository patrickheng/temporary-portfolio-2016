import { h, Component } from 'preact';
import Hammer from 'hammerjs';

import States from 'core/States';
import Emitter from 'core/Emitter';

import ProjectLetters from 'components/ProjectLetters';
import ProjectVisual from 'components/ProjectVisual';
import ProjectInfos from 'components/ProjectInfos';
import ProjectTags from 'components/ProjectTags';
import ProjectIndex from 'components/ProjectIndex';
import ProjectTitle from 'components/ProjectTitle';
import ProjectLinks from 'components/ProjectLinks';

import {
  PROJECT_CHANGE,
  ABOUT_OPEN,
  ABOUT_CLOSE
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
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
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

    this.managerHomepage.on('swipeleft', this.nextProject);
    this.managerHomepage.on('swiperight', this.previousProject);

    Emitter.on(ABOUT_OPEN, this.removeListerners);
    Emitter.on(ABOUT_CLOSE, this.addListerners);
  }

  removeListerners() {

    document.removeEventListener('keyup', this.onKeyUp, false);


    if(States.browserName === "firefox") {
      document.removeEventListener('DOMMouseScroll', this.onWheel, false);
    } else {
      document.removeEventListener('wheel', this.onWheel, false);
    }

    this.managerHomepage.off('swipeleft', this.nextProject);
    this.managerHomepage.off('swiperight', this.previousProject);
  }

  onKeyUp(ev) {
    if(ev.keyCode === 39) {
      this.nextProject();
    } else if (ev.keyCode === 37) {
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