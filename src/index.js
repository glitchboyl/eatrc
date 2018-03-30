// import React, { createElement } from "react";
// import { render } from "react-dom";
import React, { createElement } from "./react";
import { render } from "./react-dom";
import Custom from "./test";

// render(
//   //   <div className="test">
//   //     hello<span>world!</span>
//   //   </div>,
//   <Custom text={"i m custom!"} />,
//   document.querySelector("#app")
// );

const customComponent = <Custom text={"i m custom!"} />;
const componentClass = new customComponent.type(customComponent.props);
console.log(componentClass.render())