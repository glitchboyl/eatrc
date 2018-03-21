import invariant from "./invariant";

(() => {
  const React = {};

  /**
   * @type      DOM节点的标签名.
   * @$props    DOM的属性.
   * @children  DOM的子节点.
   */
  function createElement(type, $props, ...children) {
    let props = { children },
      key = null,
      ref = null;
    if (!!$props) {
      ({ key = null, ref = null } = $props);
      delete $props["key"];
      delete $props["ref"];
      props = Object.assign($props, props);
    }
    return {
      type,
      key,
      props,
      ref
    };
  }
  React.createElement = createElement;

  module.exports = React;
})();
