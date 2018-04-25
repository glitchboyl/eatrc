import React from "./react";
import invariant from "./invariant";
import warning from "./warning";

(() => {
  // 最开始未载入 React 会报出错误.
  !React
    ? invariant(
        "ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM."
      )
    : void 0;

  // const HTML_NAMESPACE$1 = "http://www.w3.org/1999/xhtml";
  // const MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  // const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  // const Namespaces = {
  //   html: HTML_NAMESPACE$1,
  //   mathml: MATH_NAMESPACE,
  //   svg: SVG_NAMESPACE
  // };

  // 节点类型
  const ELEMENT_NODE = 1; // 元素节点.
  const TEXT_NODE = 3; // 文本节点.
  const COMMENT_NODE = 8; // 注释节点.
  const DOCUMENT_NODE = 9; // (整个)文档(DOM树的)节点.
  const DOCUMENT_FRAGMENT_NODE = 11; // 文档片段节点.

  // diff 类型.
  const REPLACE = 0; // 替换新节点.
  const REORDER = 1; // 重新排列.
  const PROPS = 2; // 替换节点属性.
  const TEXT = 3; // 替换文本.

  // 检测环境.
  const ExecutionEnvironment = (() => {
    const canUseDOM = !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    );
    return {
      canUseDOM, // 是否有 document 文档对象以及 document.createElement 文档创建元素方法.
      // 是否有 addEventListener 事件监听方法.
      canUseEventListeners:
        canUseDOM && !!(window.addEventListener || window.attachEvent)
    };
  })();

  // 保留(不设置在 DOM节点 上的)属性.
  const RESERVED_PROPS = {
    children: true,
    innerHTML: true,
    style: true
  };

  const properties = {}; // 空的(原型链承载)对象.

  /**
   * 检测 DOM节点 是否是有效节点.
   * @param {object} node DOM节点.
   */
  function isValidContainer(node) {
    return !!(
      node &&
      (node.nodeType === ELEMENT_NODE ||
        node.nodeType === DOCUMENT_NODE ||
        node.nodeType === DOCUMENT_FRAGMENT_NODE ||
        (node.nodeType === COMMENT_NODE &&
          node.nodeValue === " react-mount-point-unstable "))
    );
  }

  /**
   * 检测是否是保留属性.
   * @param {string} name 属性名.
   */
  function isReservedProp(name) {
    return RESERVED_PROPS.hasOwnProperty(name);
  }

  /**
   * 检测是否是应构造组件.
   * @param {object} Component 组件对象.
   */
  function shouldConstruct(Component) {
    return !!(Component.prototype && Component.prototype.isReactComponent);
  }

  /**
   * 获取对象原型链该属性的对应值.
   * @param {string} name 属性名.
   */
  function getPropertyInfo(name) {
    return properties.hasOwnProperty(name) ? properties[name] : null;
  }

  /**
   * 检测属性是否接受布尔值.
   * @param {string} name 属性名.
   */
  function shouldAttributeAcceptBooleanValue(name) {
    if (isReservedProp(name)) {
      return true;
    }
    var propertyInfo = getPropertyInfo(name);
    if (propertyInfo) {
      return (
        propertyInfo.hasBooleanValue ||
        propertyInfo.hasStringBooleanValue ||
        propertyInfo.hasOverloadedBooleanValue
      );
    }
    var prefix = name.toLowerCase().slice(0, 5);
    return prefix === "data-" || prefix === "aria-";
  }

  /**
   * 检测属性是否应设置值.
   * @param {string} name 属性名.
   * @param {*} value 需要设置的值.
   */
  function shouldSetAttribute(name, value) {
    if (isReservedProp(name)) {
      return false;
    }
    if (
      name.length > 2 &&
      (name[0] === "o" || name[0] === "O") &&
      (name[1] === "n" || name[1] === "N")
    ) {
      return false;
    }
    if (value === null) {
      return true;
    }
    switch (typeof value) {
      case "boolean":
        return shouldAttributeAcceptBooleanValue(name);
      case "undefined":
      case "number":
      case "string":
      case "object":
        return true;
      default:
        // function, symbol
        return false;
    }
  }

  /**
   * 检测是否应监听事件.
   * @param {string} onEvent 事件名.
   */
  function shouldAddEventListener(onEvent) {
    if (isReservedProp(onEvent)) {
      return false;
    }
    if (
      onEvent.length > 2 &&
      (onEvent[0] === "o" || onEvent[0] === "O") &&
      (onEvent[1] === "n" || onEvent[1] === "N")
    ) {
      const event = onEvent[2].toLowerCase() + onEvent.slice(3);
      return [
        "abort",
        "animationEnd",
        "animationIteration",
        "animationStart",
        "blur",
        "cancel",
        "canPlay",
        "canPlayThrough",
        "click",
        "close",
        "contextMenu",
        "copy",
        "cut",
        "doubleClick",
        "drag",
        "dragEnd",
        "dragEnter",
        "dragExit",
        "dragLeave",
        "dragOver",
        "dragStart",
        "drop",
        "durationChange",
        "emptied",
        "encrypted",
        "ended",
        "error",
        "focus",
        "input",
        "invalid",
        "keyDown",
        "keyPress",
        "keyUp",
        "load",
        "loadedData",
        "loadedMetadata",
        "loadStart",
        "mouseDown",
        "mouseMove",
        "mouseOut",
        "mouseOver",
        "mouseUp",
        "paste",
        "pause",
        "play",
        "playing",
        "progress",
        "rateChange",
        "reset",
        "scroll",
        "seeked",
        "seeking",
        "stalled",
        "submit",
        "suspend",
        "timeUpdate",
        "toggle",
        "touchCancel",
        "touchEnd",
        "touchMove",
        "touchStart",
        "transitionEnd",
        "volumeChange",
        "waiting",
        "wheel"
      ].includes(event);
    }
    return false;
  }

  /**
   * 监听事件.
   * @param {DOM} el DOM对象.
   * @param {string} onEvent 事件名.
   * @param {function} fn 事件方法.
   */
  function addDOMEventListener(el, onEvent, fn) {
    !(el.nodeType === ELEMENT_NODE)
      ? invariant("Event target is not a DOM element.")
      : void 0;
    (!onEvent || !fn) && typeof fn !== "function"
      ? invariant("Event or EventListener may be a wrong variable.")
      : void 0;
    const event = onEvent[2].toLowerCase() + onEvent.slice(3);
    el.addEventListener(event, fn);
  }

  function beginWork(currentNode) {
    const updater = {
      isMounted() {
        return true;
      },
      enqueueSetState(publicInstance, partialState) {
        let { props, state } = publicInstance;
        partialState =
          typeof partialState === "object"
            ? partialState
            : partialState(state, props);
        publicInstance.state = Object.assign({}, state, partialState);
      }
    };
    currentNode.updater = updater;
  }

  /**
   * 渲染视图.
   * @param {DOM} vnode DOM节点的标签名.
   * @param {string} container DOM的属性.
   */
  function render(vnode, container) {
    !isValidContainer(container)
      ? invariant("Target container is not a DOM element.")
      : void 0;
    const docfrag = document.createDocumentFragment();
    if (typeof vnode === "string") {
      const textNode = document.createTextNode(vnode);
      docfrag.appendChild(textNode);
    } else if (
      Object.prototype.toString.call(vnode) === "[object Object]" &&
      !!vnode.type
    ) {
      const { type, props } = vnode;
      if (typeof type === "string") {
        const rootEl = document.createElement(type);
        rootEl instanceof HTMLUnknownElement
          ? invariant(
              "Objects are not valid as a React child (found: object with keys {type}). If you meant to render a collection of children, use an array instead."
            )
          : void 0;
        if (!!props) {
          const { children } = props;
          for (let propName in props) {
            let propValue = props[propName];
            if (shouldSetAttribute(propName, propValue)) {
              rootEl.setAttribute(propName, propValue);
            } else if (shouldAddEventListener(propName)) {
              addDOMEventListener(rootEl, propName, propValue);
            }
          }
          if (children) {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              render(child, rootEl);
            }
          }
        }
        docfrag.appendChild(rootEl);
      } else if (shouldConstruct(vnode.type)) {
        const rootComponent = new vnode.type(vnode.props);
        if (rootComponent.state && typeof rootComponent.state !== "object") {
          warning("_class.state: must be set to an object or null");
        }
        if (typeof rootComponent.componentWillMount === "function") {
          rootComponent.componentWillMount();
        }
        if (typeof rootComponent.render === "function") {
          render.call(rootComponent, rootComponent.render(), docfrag);
        }
        if (typeof rootComponent.componentDidMount === "function") {
          rootComponent.componentDidMount();
        }
        beginWork(rootComponent);
      }
    }
    container.appendChild(docfrag);
  }

  const ReactDOM = { render };

  module.exports = ReactDOM;
})();
