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
      typeof vnode === "object" &&
      Object.prototype.toString.call(vnode) === "[object Object]"
    ) {
      const { type, props } = vnode;
      if (typeof v.type === "string") {
      }
      const rootEl = document.createElement(type);

      //   console.log(rootEl);
    }
    container.appendChild(docfrag);
  }

  const ReactDOM = { render };

  module.exports = ReactDOM;
})();
