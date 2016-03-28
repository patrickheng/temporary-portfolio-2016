import 'stylesheets/main.scss';

import { h, render, Component } from 'preact';
import 'gsap';
// import 'vendors/MorphSVGPlugin';

import domready from 'domready';
import FastClick from 'fastclick';


import Application from 'components/Application';

class Main extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    FastClick.attach(document.body);
  }

  componentWillUnmount() {

  }

  render(props, state) {
    return <Application />;
  }
}

domready(() => {

  render(<Main />, document.body);
});