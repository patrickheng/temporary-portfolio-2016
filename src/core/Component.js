import walk from 'dom-walk';

export default class Component {
  constructor({
    $el,
    subComponents = [],
    template = false
  }) {

    this.$el = $el;
    this.componentName = "";
    this.template = template;
    this.parent = null;
    this.subComponents = subComponents;
    this.refs = {};
    this._componentInstances = [];

    this.data = this.setData();

    if (subComponents) {
      this.init(subComponents);
    }

    if(this.data && this.template) {
      this.render();
    }
  }

  init(subComponents) {
    this.subComponents = subComponents;
    this.parse();
  }

  setData() {

    // If overided, return handlebars data object
    return false;
  }

  dispose() {
    this.disposeChildren();
    this.destroy();
  }

  disposeChildren() {
    this._componentInstances.forEach((component) => {
      component.dispose();
    });
    this._componentInstances = [];
    this.refs = {};
  }

  replaceContent(htmlString) {
    this.disposeChildren();
    this.$el.innerHTML = htmlString;
    this.parse();
  }

  destroy() {
    if (this.parent && this.$el.parentNode && this.$el.parentNode === this.parent.$el) {
      this.parent.$el.removeChild(this.$el);
    }
    this.parent = null;
    this.$el = null;
  }

  findInstance(componentName) {
    let instance = this._componentInstances.filter(value => value.componentName === componentName);
    if (instance && instance.length) return instance[0];

    for (let i = 0, l = this._componentInstances.length; i < l; i++) {
      instance = this._componentInstances[i].findInstance(componentName);
      if (instance !== undefined) return instance;
    }

    return undefined;
  }

  findAllInstances(componentName) {
    let instances = this._componentInstances.filter(value => value.componentName === componentName);

    for (let i = 0, l = this._componentInstances.length; i < l; i++) {
      instances = instances.concat(this._componentInstances[i].findAllInstances(componentName));
    }

    return instances;
  }

  parse() {
    walk(this.$el, (node) => {
      const componentName = node && node.getAttribute ? node.getAttribute('data-component') : '';
      let Ctor;
      let component;

      if (node.nodeType === 1 && componentName) {
        if (node.tagName === 'FORM') {
          /*eslint-disable */
          console.warn(`FORM tag does not support data-component. You should encapsulate the <form> with a <div> in component ${componentName}`);
          /*eslint-enable */
        }

        if (this.subComponents instanceof Function) {
          Ctor = this.subComponents(componentName);
        }
        else if (this.subComponents instanceof Object) {
          Ctor = this.subComponents[componentName];
        }

        if (Ctor) {
          node.removeAttribute('data-component');
          component = new Ctor({$el: node});
          component.init(this.subComponents);
          component.componentName = componentName;
          component.parent = this;
          this._componentInstances.push(component);

          if (node.getAttribute('data-ref')) {
            this.refs[node.getAttribute('data-ref')] = component;
          }
        }
        else {

          /*eslint-disable */
          console.warn(`Can\'t find component '${componentName}'`);
          /*eslint-enable */
        }
      }
    });

    this.ready();
  }

  render() {
    if(this.template) {
      this.$el.innerHTML = this.template(this.data);
    } else {
      /*eslint-disable */
      console.warn(`Can\'t find template '${componentName}'`);
      /*eslint-enable */
    }

  }

  ready() {
    // To override
  }
}