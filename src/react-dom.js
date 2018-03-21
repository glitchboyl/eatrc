import React from "./react";
import invariant from "./invariant";

(() => {
  !React
    ? invariant(
        "ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM."
      )
    : void 0;

  const ReactDOM = {};
  /**
   * @vnode      DOM节点的标签名.
   * @container  DOM的属性.
   */
  function render(vnode, container) {
    const docfrag = document.createDocumentFragment();
    if (typeof vnode === "string") {
      const textNode = document.createTextNode(vnode);
      docfrag.appendChild(textNode);
    } else if (
      typeof vnode === "object" &&
      Object.prototype.toString.call(vnode) === "[object Object]"
    ) {
      // Take a break, continue tomorrow.
    }
    container.appendChild(docfrag);
  }
  ReactDOM.render = render;
  module.exports = ReactDOM;
})();
