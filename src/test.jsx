// import React from "react";
import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   ass: "we can"
    // };
    this.state = 'ass w can'
  }
  componentWillMount() {
    console.log(this)
  }
  render() {
    const { text } = this.props;
    return <div className="custom">{text}<button onClick={()=>{this.setState((ps,props)=>{
      return 'asd'
    }); console.log(this)}}>van it</button></div>;
  }
  // componentDidMount() {
  //   console.log("component did mount.");
  // }
}
