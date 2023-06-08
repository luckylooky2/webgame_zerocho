const React = require("react");
const { Component } = React;

// 문제 : 부모 컴포넌트의 elem, index가 자식 컴포넌트에 전달이 안 됨
// props를 사용하는 이유!

class Try extends Component {
  constructor(props) {
    super(props); // constructor와 super은 짝
    // ***React 또 하나의 원칙!***
    // props는 자식이 바꾸면 안 됨 => 부모에게 영향을 미치면 안 되기 때문
    // props는 부모가 자식에게 물려준 것
    // *자식이 props를 바꿔버리면, 부모 컴포넌트가 뜻하지 않게 바뀌는 상황이 발생할 수 있음*
    // ***따라서, 자식은 props를 바꾸지 않는다. 바꿔야 한다면, state로 만들어 바꾼다***
    // this.props.value.try = "hello";

    // constructor를 사용하면, 미세 조정이 가능
    // 미세 조정을 하려면, 대부분의 경우 함수를 이용
    const filtered = this.props.filter(() => {});
    this.state = {
      try: filtered,
      result: this.props.value.result,
    };
  }

  render() {
    return (
      <li>
        <b>{this.props.value.try}</b> : {this.props.value.result}
      </li>
    );
  }
}

// Hooks로 적용 및 전환
// 1. 함수형 컴포넌트
// 2. useState

// 자식 컴포넌트가 리렌더링되는 조건
// 1. state가 바뀌었을 때
// 2. props가 바뀌었을 때
// 3. 부모 컴포넌트가 리렌더링 되었을 때

// 함수형 컴포넌트에는 PureComponent를 사용하지 못함 => memo를 지원
// PureComponent : setState를 호출해도, state의 값이 변하지 않았다면 리렌더링하지 않음 / 자동으로 자식 컴포넌트가 리렌더링 되는 것을 막음
// memo(const = () => {})로 묶어주면 됨
// memo : 부모 컴포넌트가 리렌더링 되었을 때 자동으로 자식 컴포넌트가 리렌더링 되는 것을 막음
// 단, memo를 사용하면 컴포넌트 이름이 바뀔 수 있음 => Try.displayName = "Try";

const Try = memo(({ value }) => {
  // props는 자식이 바꾸면 안 됨 => 부모에게 영향을 미치면 안 되기 때문
  // props는 부모가 자식에게 물려준 것
  // *자식이 props를 바꿔버리면, 부모 컴포넌트가 뜻하지 않게 바뀌는 상황이 발생할 수 있음*
  // ***따라서, 자식은 props를 바꾸지 않는다. 바꿔야 한다면, state로 만들어 바꾼다***
  // value.result = "hello";
  const [result, setResult] = React.useState(value.result);

  const onClick = () => {
    setResult("1");
  };
  return (
    <li>
      <b>{value.try}</b> : {value.result}
      <div onClick={onClick}>{value.result}</div>
    </li>
  );
});
Try.displayName = "Try";

module.exports = Try;
