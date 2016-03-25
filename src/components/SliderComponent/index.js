import Component from 'Component';
import template from './template.handlebars';


class SliderComponent extends Component {

  setData() {
    return {
    };
  }

  constructor({$el}) {
    super({$el, template});
  }

}

export default SliderComponent;