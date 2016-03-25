import domready from 'domready';
import States from 'core/States';
import Component from 'core/Component';
import 'gsap'

import HeaderComponent from 'components/HeaderComponent';

import 'stylesheets/main.scss';

class Main extends Component {

  constructor(root) {

    super({
      $el: root,
      subComponents: {
        HeaderComponent
      }
    });

    this.bind();

    this.addEventListeners();

    this.$root = root;

    this.start();
  }

  bind() {}

  addEventListeners() {}

  start() {
    this.addDeviceTypeClass();
    this.addBrowserNameClass();
  }

  addDeviceTypeClass() {
    this.$root.classList.add(`${States.deviceType}-device`);
  }

  addBrowserNameClass() {
    this.$root.classList.add(`${States.browserName}-browser`);
  }
}

domready(() => {

  const root = document.getElementById('application');
  new Main(root);
});