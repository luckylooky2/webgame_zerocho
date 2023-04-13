const React = require("react");
const { Component } = React;

// 문제 : 부모 컴포넌트의 elem, index가 자식 컴포넌트에 전달이 안 됨
// props를 사용하는 이유!
class Try extends Component {
  render() {
    return (
      <li>
        <b>{this.props.value.try}</b> : {this.props.value.result}
      </li>
    );
  }
}

// Hooks로 적용 및 전환
// 1. 클래스형 컴포넌트
// 2. useState
// const Try = ({ value }) => {
//   return (
//     <li>
//       <b>{value.try}</b> : {value.result}
//     </li>
//   );
// };

module.exports = Try;
