// import React from "react";
import React from "@/cjs/react";

export default class extends React.Component {
  constructor() {
    super();
    const arr = this.arr();
    this.state = {
      bubbleArr: arr.slice(),
      selectionArr: arr.slice(),
      insertionArr: arr.slice()
    };
  }
  render() {
    return (
      <div>
        <p>default array: {`[${this.arr()}]`}</p>
        <p>
          bubble array: {`[${this.state.bubbleArr}]`}
          <button
            style={{ marginLeft: "20px" }}
            onClick={self => this.bubbleSort(self)}
          >
            sort
          </button>
          <button
            style={{ marginLeft: "20px" }}
            onClick={this.reset.bind(this, "bubble")}
          >
            reset
          </button>
        </p>
        <p>
          selection array: {`[${this.state.selectionArr}]`}
          <button
            style={{ marginLeft: "20px" }}
            onClick={self => this.selectionSort(self)}
          >
            sort
          </button>
          <button
            style={{ marginLeft: "20px" }}
            onClick={this.reset.bind(this, "selection")}
          >
            reset
          </button>
        </p>
        <p>
          insertion array: {`[${this.state.insertionArr}]`}
          <button
            style={{ marginLeft: "20px" }}
            onClick={self => this.insertionSort(self)}
          >
            sort
          </button>
          <button
            style={{ marginLeft: "20px" }}
            onClick={this.reset.bind(this, "insertion")}
          >
            reset
          </button>
        </p>
      </div>
    );
  }
  arr() {
    return [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
  }
  bubbleSort() {
    const { bubbleArr } = this.state;
    for (let n = 0; n < bubbleArr.length; n++) {
      for (let m = 0; m < bubbleArr.length; m++) {
        if (bubbleArr[m] > bubbleArr[n + 1]) {
          const num = bubbleArr[m];
          bubbleArr[m] = bubbleArr[n + 1];
          bubbleArr[n + 1] = num;
        }
      }
    }
    this.setState({ bubbleArr });
  }
  selectionSort() {
    const { selectionArr } = this.state;
    let min;
    for (let n = 0; n < selectionArr.length - 1; n++) {
      min = n;
      for (let m = n + 1; m < selectionArr.length; m++) {
        if (selectionArr[min] > selectionArr[m]) {
          min = m;
        }
      }
      const num = selectionArr[n];
      selectionArr[n] = selectionArr[min];
      selectionArr[min] = num;
    }
    this.setState({ selectionArr });
  }
  insertionSort() {
    const { insertionArr } = this.state;
    for(let n = 1;n<insertionArr.length;n++){
        const i = insertionArr[n];
        let m = n - 1;
        while(insertionArr[m] > i){
            insertionArr[m + 1] = insertionArr[m]
            m--;
        }
        insertionArr[m + 1] = i;
    }
    this.setState({ insertionArr });
  }
  reset(type) {
    switch (type) {
      case "bubble":
      case "selection":
      case "insertion":
        const state = {};
        state[type + "Arr"] = this.arr();
        this.setState(state);
        break;
    }
  }
}
