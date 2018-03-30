// import React from "react";
import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text } = this.props;
    return <div className="custom">{text}</div>;
  }
}
