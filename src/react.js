import invariant from "./invariant";
import warning from "./warning";

(() => {
  const ReactNoopUpdateQueue = {
    enqueueSetState(publicInstance, partialState, callback) {
      warning("This is a no-op.");
    },
    enqueueReplaceState(publicInstance, completeState, callback) {
      warning("This is a no-op.");
    }
  };

  const ReactElement = (type, key, ref, owner, props) => {
    const element = {
      type,
      key,
      ref,
      props,
      _owner: owner
    };
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
    return element;
  };

  function hasValidRef({ ref }) {
    return ref !== undefined;
  }

  function hasValidKey({ key }) {
    return key !== undefined;
  }

  const RESERVED_PROPS = {
    key: true,
    ref: true
  };

  /**
   * 创建 VDOM对象.
   * @param {string|function} type DOM节点的类型.
   * @param {object} config DOM的属性.
   * @param {array} children DOM的子节点.
   */
  function createElement(type, config, ...children) {
    let propName;
    const props = {};
    let key = null;
    let ref = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ({ ref } = config);
      }
      if (hasValidKey(config)) {
        ({ key } = config);
      }
      for (propName in config) {
        if (
          hasOwnProperty.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
          props[propName] = config[propName];
        }
      }
    }

    const childrenLength = children.length;
    if (childrenLength === 1) {
      props.children = children[0];
    } else if (childrenLength > 1) {
      props.children = children;
      Object.freeze(props.children);
    }

    // Resolve default props
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return ReactElement(type, key, ref, null, props);
  }

  /**
   * 创建组件的继承对象.
   * @param {object} props 自定义组件实例的属性.
   */
  function Component(props) {
    this.props = props;
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
    this.updater.enqueueSetState(this, partialState);
  };

  const React = { createElement, Component };

  module.exports = React;
})();
