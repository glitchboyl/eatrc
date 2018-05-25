import React, { createElement } from "react";
import { render } from "react-dom";
// import React, { createElement } from "@/cjs/react";
// import { render } from "@/cjs/react-dom";
import Custom from "@/components/test";

// var a = <div className="test">hello<span>world!</span></div>;

render(
  <Custom text={"i m custom!"} children="qwe">
    <span>asd</span>
  </Custom>,
  document.querySelector("#app")
);
