import React, { createElement } from "react";
import { render } from "react-dom";
// import React, { createElement } from "./react";
// import { render } from "./react-dom";
import Custom from "./test";

// var a = <div className="test">hello<span>world!</span></div>;

render(
  <Custom text={"i m custom!"} children="qwe">
    <span>asd</span>
  </Custom>,
  document.querySelector("#app")
);