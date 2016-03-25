import Component from 'Component';
import template from './template.handlebars';


class HeaderComponent extends Component {

  setData() {
    return {
      hello: "Hello World <3"
    };
  }

  constructor({$el}) {
    super({$el, template});
  }

}

export default HeaderComponent;