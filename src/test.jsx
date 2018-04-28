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
            this.setState({ ass: "deep dark", class: "custom" });
          }}
        >
          van it
        </button>
        <br />
        {test}

        {this.state.ass === 'deep dark' ?  <span>call</span> : null}
      </div>
    );
  }
  // componentDidMount() {
  //   console.log("component did mount.");
  // }
}
