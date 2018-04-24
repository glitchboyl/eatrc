import invariant from "./invariant";

(() => {
  /**
   * 创建 VDOM对象.
   * @param {string|function} type DOM节点的类型.
   * @param {object} props DOM的属性.
   * @param {array} children DOM的子节点.
   */
  function createElement(type, props, ...children) {
    let $props = children.length ? { children } : {},
      key = null,
      ref = null;
    if (!props) {
      props = {};
    } else {
      ({ key = null, ref = null } = props);
      delete props["key"];
      delete props["ref"];
    }
    props = Object.assign(props, $props);
    return {
      type,
      key,
      props,
      ref
    };
  }
  
  /**
   * 创建组件的继承对象.
   * @param {object} props 自定义组件实例的属性.
   */
  function Component(props) {
    this.props = props;
    // this.context = context;
    this.refs = {};
    // this.updater = updater;
  }
  Component.prototype.isReactComponent = {};

  Component.prototype.setState = function(partialState, callback) {
    !(
      typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null
    )
      ? invariant(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        )
      : void 0;
  };

  const React = { createElement, Component };

  module.exports = React;
})();
