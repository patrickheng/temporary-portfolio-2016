import { h, Component } from 'preact';

import Emitter from 'core/Emitter';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE,
  ABOUT_AFTER_OPEN,
  ABOUT_AFTER_CLOSE
} from 'config/messages';

class About extends Component {
  state = {
    isOpen: false
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();

    setTimeout(()=>{
      this.appWrapper = document.querySelector('.wrapper');
      this.overlay = this.base.querySelector('.about__overlay');
      this.content = this.base.querySelector('.about__content');
      this.generateTimelineMax();
    }, 1000);

  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.openPanel = this.openPanel.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.onKeyUpEscapeKey = this.onKeyUpEscapeKey.bind(this);
  }

  addListerners() {
    Emitter.on(ABOUT_OPEN, this.openPanel);
    Emitter.on(ABOUT_CLOSE, this.closePanel);

    document.addEventListener('keyup', this.onKeyUpEscapeKey, false);
  }

  removeListerners() {
    Emitter.off(ABOUT_OPEN, this.openPanel);
    Emitter.off(ABOUT_CLOSE, this.closePanel);
  }

  generateTimelineMax() {

    this.tl = new TimelineMax({
      paused: true,
      onReverseComplete: () =>{
        this.base.classList.remove('about--is-active');
      }
    });

    this.tl
      .to(this.content, 1, {x: '0%', ease: Expo.easeOut})
      .to(this.appWrapper, 1, {x: -400, scale: 0.8, ease: Expo.easeOut}, 0)
      .to(this.overlay, 0.5, {opacity: 1}, 0.2);

  }

  openPanel() {
    if(!this.state.isOpen) {
      this.setState({isOpen: true});
      this.base.classList.add('about--is-active');
      this.tl.play(0);
      Emitter.emit(ABOUT_AFTER_OPEN);
    }
  }


  closePanel() {
    this.setState({isOpen: false});
    Emitter.emit(ABOUT_AFTER_CLOSE);
    this.tl.reverse();
  }

  onKeyUpEscapeKey(ev) {
    if(ev.keyCode === 27) {
      this.closePanel();
    }
  }

  render(props, state) {

    return (
      <aside class="about">
        <div class="about__overlay" onClick={this.closePanel}></div>

        <div class="about__content">
          <h2 class="about__title">About</h2>

          <span class="about__cross icon icon-close" onClick={this.closePanel}></span>

          <p class="about__paragraph">
            Hi,
            <br/><br/>
            I’m living near Paris and I am a creative front-end developer of 23 years old. What interests me the most is canvas and webgl experiments and UI animations.
            <br/><br/>
            I studied in third year at <a class="link link--light" href="http://www.hetic.net/" target="_blank">HETIC</a> and I'm currently studying at <a class="link link--light" href="http://www.gobelins.fr/" target="_blank">Gobelins Paris</a> in the interactive design formation.
            <br/><br/>
            I have worked for <a class="link link--light" href="https://www.sweetpunk.com/" target="_blank">SweetPunk</a> and I'm currently working at <a class="link link--light" href="http://grouek.com/" target="_blank">Grouek</a>.
            <br/><br/>
            I’m looking for an apprentiship for September in a web agency.
            <br/><br/>
            Feel free to <a class="link" href="mailto:hengpatrick.pro@gmail.com" target="_blank">contact me</a> !
          </p>

          <p class="about__paragraph about__paragraph--credit">
            Special thanks to <a class="link link--light" href="http://robinmastromarino.com/" target="_blank">Robin Mastromarino</a> for the design.
          </p>

          <img class="about__emoji" src="/images/generics/kiss-emoji.svg" alt="kiss emoji" />

        </div>
      </aside>
    );
  }

}

export default About;