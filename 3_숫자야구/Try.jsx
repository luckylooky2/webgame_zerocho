const React = require("react");
const { Component } = React;

// 문제 : 부모 컴포넌트의 elem, index가 자식 컴포넌트에 전달이 안 됨
// props를 사용하는 이유!
class Try extends Component {
  render() {
    return (
      <li>
        <b>{this.props.index}</b> : {this.props.value}
      </li>
    );
  }
}

module.exports = Try;
