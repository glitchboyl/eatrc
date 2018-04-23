// import React from "react";
import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('ass')
  }
  componentWillMount(){
    console.log('we')
  }
  render() {
    console.log('can')
    const { text } = this.props;
    return <div className="custom">{text}</div>;
  }
  componentDidMount(){
    console.log('!')
  }
}
