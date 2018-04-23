// import React, { createElement } from "react";
// import { render } from "react-dom";
import React, { createElement } from "./react";
import { render } from "./react-dom";
import Custom from "./test";

render(
  //   <div className="test">
  //     hello<span>world!</span>
  //   </div>,
  <Custom text={"i m custom!"}>
    <span>world!</span>
  </Custom>,
  document.querySelector("#app")
);
