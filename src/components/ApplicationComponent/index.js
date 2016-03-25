import States from 'core/States';
import Component from 'core/Component';

import template from './template.handlebars';

class ApplicationComponent extends Component {

  constructor($el) {

    super({
      $el,
      template
    });

  }

  ready() {
    this.addDeviceTypeClass();
    this.addBrowserNameClass();
  }

  addDeviceTypeClass() {
    this.$el.classList.add(`${States.deviceType}-device`);
  }

  addBrowserNameClass() {
    this.$el.classList.add(`${States.browserName}-browser`);
  }
}

export default ApplicationComponent;