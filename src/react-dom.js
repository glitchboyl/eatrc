import React from "./react";
import invariant from "./invariant";

(() => {
  !React
    ? invariant(
        "ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM."
      )
    : void 0;

  const HTML_NAMESPACE$1 = "http://www.w3.org/1999/xhtml";
  const MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const Namespaces = {
    html: HTML_NAMESPACE$1,
    mathml: MATH_NAMESPACE,
    svg: SVG_NAMESPACE
  };

  // 节点类型
  const ELEMENT_NODE = 1; // 元素节点.
  const TEXT_NODE = 3; // 文本节点.
  const COMMENT_NODE = 8; // 注释节点.
  const DOCUMENT_NODE = 9; // (整个)文档(DOM树的)节点.
  const DOCUMENT_FRAGMENT_NODE = 11; // 文档片段节点.

  const RESERVED_PROPS = {
    children: true,
    defaultValue: true,
    defaultChecked: true,
    innerHTML: true,
    style: true
  };

  const properties = {};

  /**
   * @node      DOM节点.
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

  function isReservedProp(name) {
    return RESERVED_PROPS.hasOwnProperty(name);
  }

  function shouldConstruct(Component) {
    return !!(Component.prototype && Component.prototype.isReactComponent);
  }

  function getPropertyInfo(name) {
    return properties.hasOwnProperty(name) ? properties[name] : null;
  }

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
   * @vnode      DOM节点的标签名.
   * @container  DOM的属性.
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
        if (!!props) {
          const { children } = props;
          for (let propName in props) {
            let propValue = props[propName];
            if (shouldSetAttribute(propName, propValue)) {
              rootEl.setAttribute(propName, propValue);
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
        rootComponent.componentWillMount();
        render.call(rootComponent, rootComponent.render(), docfrag);
        rootComponent.componentDidMount();
      }
    }
    container.appendChild(docfrag);
  }

  const ReactDOM = { render };

  module.exports = ReactDOM;
})();
