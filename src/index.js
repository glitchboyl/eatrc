import React, { createElement } from "./react";
import { render } from "./react-dom";

render(
  <div className="test">
    hello<span>world!</span>
  </div>,
  document.querySelector("#app")
);
