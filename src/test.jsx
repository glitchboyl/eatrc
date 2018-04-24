// import React from "react";
import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ass: "we can"
    };
  }
  componentWillMount() {
    console.log(this)
  }
  render() {
    const { text } = this.props;
    return <div className="custom">{this.state.ass}<button onClick={()=>{console.log('as')}}>van it</button></div>;
  }
  componentDidMount() {
    console.log("component did mount.");
  }
}
