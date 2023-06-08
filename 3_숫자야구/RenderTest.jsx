const React = require("react");
const { Component } = React;
const { PureComponet } = React;

// 렌더링 관련 문제는 성능 문제이기 때문에 성능 문제가 없다면 굳이 PureComponent, memo를 사용하지 않아도 됨
// 성능 문제가 발생할 것이라고 생각되는 경우에는 반드시 사용!

class RenderTest extends Component {
  state = {
    counter: 0,
  };

  // 1. 직접 어떤 경우에 렌더링을 해야 하는지 적어줘야 함
  // **특정 state가 바뀌어도 렌더링하지 않게 할 수 있으므로**, PureComponent보다 조금 더 자유롭게 컴포넌트를 커스터마이징할 수 있음
  // PureComponent는 setState를 호출하더라도 값이 변하면 리렌더링되기 때문에
  // useEffect와 어떤 관련?
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) return true;
    return false;
  }

  // context?
  // A -> B -> C : A에서 C로 props를 넘겨주고 싶을 때 => **중간을 건너뛰고 바로 전달해 줄 수 있는 방법**
  // why? props는 손자가 아닌 자식에게만 넘겨줄 수 있음
  // props의 진화형이 context, context를 응용한 것이 redux

  // context를 사용해야 이유?
  // 1) B는 props가 필요가 없음
  // 2) props를 받는다는 뜻은 렌더링이 될 가능성(위험)이 있다는 뜻

  // 2. 이걸 대신 해주는 것으로 PureComponent가 있음
  // 1) setState의 호출 여부가 아닌, 값 자체가 바뀔 때만 리렌더링이 일어나는 효과
  // 추가로 2) 부모 컴포넌트가 리렌더링 되었을 때, 자동으로 자식 컴포넌트가 리렌더링 되는 것을 막음

  // 위 설정을 적용하면 setState를 불러도 값 자체가 바뀌지 않는다면 리렌더링되지 않음
  // 값 자체가 바뀔 때만! 리렌더링이 일어남
  // 단, object, list와 같은 참조형 자료형들은 참조가 바뀌어야 리렌더링이 됨(스프레드 문법)
  handleOnClick = () => {
    // state와 props가 바뀌어야 리렌더링이 되는 것이 아니라
    // ***setState함수가 호출되어도 리렌더링이 일어남***
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
