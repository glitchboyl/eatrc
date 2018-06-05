import React from "react";
// import React from "./react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ass: "we can",
      class: "test"
    };
  }
  componentWillMount() {
    // console.log(this);
  }
  render() {
    const { text } = this.props;
    const test = (() => {
      let arr = [];
      for (let i = 0; i < 5; i++) {
        arr.push(<span key={i}>{i}</span>);
      }
      return arr;
    })();
    return (
      <div className={this.state.class}>
        {this.state.ass}
        <button
          onClick={() => {
            if (this.state.ass === "we can") {
              this.setState({ ass: "deep dark", class: "custom" });
            } else if(this.state.ass === "deep dark"){
              this.setState({ ass: "we can", class: "text" });
            }
          }}
        >
          van it
        </button>
        <button onClick={this.state.ass === "deep dark" ? this.boy : this.door}>
          change boss of this gym
        </button>
        <br />
        {test}

        {this.state.ass === "deep dark" ? <span>call</span> : void 0}
      </div>
    );
  }
  boy() {
    console.log("you get mad");
  }
  door() {
    console.log("oh my shoulder");
  }
  // componentDidMount() {
  //   console.log("component did mount.");
  // }
}
