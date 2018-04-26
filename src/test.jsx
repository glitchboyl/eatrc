// import React from "react";
import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ass: "we can",
      class: "test"
    };
  }
  componentWillMount() {
    console.log(this);
  }
  render() {
    const { text } = this.props;
    return (
      <div className={this.state.class}>
        {this.state.ass}
        <button
          onClick={() => {
            this.setState({ ass: "deep dark", class: "custom" });
          }}
        >
          van it
        </button>
      </div>
    );
  }
  // componentDidMount() {
  //   console.log("component did mount.");
  // }
}
