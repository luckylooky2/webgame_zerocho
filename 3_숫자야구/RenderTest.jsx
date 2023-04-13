const React = require("react");
const { Component } = React;

class RenderTest extends Component {
  state = {
    counter: 0,
  };

  // 직접 어떤 경우에 렌더링을 해야 하는지 적어줘야 함
  // useEffect와 어떤 관련?
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) return true;
    return false;
  }

  handleOnClick = () => {
    // state와 props가 바뀌어야 리렌더링이 되는 것이 아니라
    // setState함수가 호출되어도 리렌더링이 일어남
    this.setState({});
  };
  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.handleOnClick}>클릭!</button>
      </div>
    );
  }
}

module.exports = RenderTest;
