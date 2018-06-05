import React, { createElement, Children } from "react";
import { render } from "react-dom";
// import React, { createElement, Children } from "@/cjs/react";
// import { render } from "@/cjs/react-dom";
import Custom from "@/components/test";

render(
  <Custom text={"i m custom!"} children="qwe">
    <span>asd</span>
  </Custom>,
  document.querySelector("#app")
);
