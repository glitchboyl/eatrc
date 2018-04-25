import invariant from "./invariant";
import warning from "./warning";

(() => {
  const ReactNoopUpdateQueue = {
    isMounted() {
      return false;
    },
    enqueueSetState(publicInstance, partialState) {
      warning("_class(...): Can only update a mounted or mounting component.");
    }
  };

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
    this.updater = ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};

  Component.prototype.setState = function(partialState) {
    !(
      typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null
    )
      ? invariant(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        )
      : void 0;
    !this.state ? (this.state = null) : void 0;
    console.log(this.updater.isMounted());
    this.updater.enqueueSetState(this, partialState);
  };

  const React = { createElement, Component };

  module.exports = React;
})();
