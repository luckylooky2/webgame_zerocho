const React = require("react");
const { Component, createRef } = React;
const { useState, useRef } = React;

class RSP extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div className={state}>{message}</div>
      </>
    );
  }
}

module.exports = RSP;
// module.exports = HooksResponseCheck;
