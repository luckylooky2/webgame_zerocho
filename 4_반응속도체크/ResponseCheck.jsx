const React = require("react");
const { Component, createRef } = React;
const { useState, useRef } = React;

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeout; // this.timeout
  // startTime을 state로 만들면 리렌더링이 일어나기 때문에 이렇게 선언
  startTime; // this.startTime
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;

    if (state === "waiting") {
      this.setState({ state: "ready", message: "초록색이 되면 클릭하세요." });
      this.timeout = setTimeout(() => {
        this.setState({ state: "now", message: "지금 클릭!" });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤
    } else if (state === "ready") {
      // too fast
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요.",
      });
      clearTimeout(this.timeout);
    } else if (state === "now") {
      // check
      this.endTime = new Date();
      this.setState((prevState) => ({
        state: "waiting",
        message: "클릭해서 시작하세요.",
        result: [...prevState.result, this.endTime - this.startTime],
      }));
    }
  };

  onClickReset = () => {
    this.setState({
      state: "waiting",
      message: "클릭해서 시작하세요.",
      result: [],
    });
  };

  // render 안의 코드가 너무 길어지면 함수로 뺌
  renderAverage = () => {
    const { result } = this.state; // destructuring으로 조금 더 간결화

    // null, false, undefined는 태그가 없는 것을 의미!
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간 : {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={this.onClickReset}>reset</button>
      </>
    );
  };

  // render()의 return 안에서는(즉, JSX 안에서는) for문과 if문을 사용하지 못함
  // 사용할 수는 있지만 지저분 함(즉시실행함수) => 다른 방식으로 표현해야 함, 가독성을 저해하는 요인

  // <if문>
  // 1. 조건부 연산자(삼항 연산자) 사용 => a === b ? null : <div></div>
  // 2. && 연산자 사용 => a !== b && <div></div>
  // 3. 즉시실행함수 정의 후 실행 => {(() => { if (a === b) return null; else return <div></div>; })()}
  // <for문>
  // 1. map, filter 등의 함수 사용
  // 2. 즉시실행함수 정의 후 실행

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

// message와 시간을 나타내는 부분은 서로 상관이 없기 때문에 나누는 것이 좋음
// 서로 리렌더링될 때 영향을 안 주기 위해서
// 지금 여기서는 리셋 버튼을 눌러도 스크린 및 메시지가 다시 한 번 리렌더링 되는 문제가 발생 => 같은 render() 안에 있기 때문에
// state, message가 바뀌지 않아도 result가 바뀌면 리렌더링이 될 수 밖에 없음 => 다른 컴포넌트로 분할

const HooksResponseCheck = () => {
  // 리렌더링 되게 하고 싶은 값들 => useState
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);

  // 리렌더링 되지 않게 하고 싶은 값들 => useRef
  // 항상 current 사용하는 것을 잊지 말기!
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  // cf> let vs. useRef
  // let timeout, startTime, endTime;
  // 이렇게 사용하지 않고 useRef를 사용(DOM에 직접 접근하는 것과 다른 기능으로)
  // 컴포넌트 안에 let으로 선언하면 컴포넌트가 리렌더링될때마다 새로 선언되므로 값이 초기화됩니다. useRef는 **이전 값이 유지됩니다.**
  // startTime에 저장 => state, message가 바뀌면서 컴포넌트가 리렌더링 => let 변수에 저장할 경우 리렌더링 시 undefined로 초기화

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤
    } else if (state === "ready") {
      // too fast
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
      clearTimeout(timeout.current);
    } else if (state === "now") {
      // check
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      // let 변수 : undefined Thu Jun 08 2023 19:24:48 GMT+0900 (Korean Standard Time) => 왜 undefined?
      // useRef : Thu Jun 08 2023 19:22:17 GMT+0900 (Korean Standard Time) Thu Jun 08 2023 19:22:18 GMT+0900 (Korean Standard Time)
      console.log(startTime, endTime);
      setResult((prevState) => [
        ...prevState,
        endTime.current - startTime.current,
      ]);
    }
  };

  const onClickReset = () => {
    setState("waiting");
    setMessage("클릭해서 시작하세요.");
    setResult([]);
  };

  // render 안의 코드가 너무 길어지면 함수로 뺌
  // **JSX에서는 [] 안에 JSX를 넣을 수도 있음!** : return [<div key="사과">사과</div>, ...]
  // 마찬가지로 key 속성을 넣어주어야 함
  const renderAverage = () => {
    // null, false, undefined는 태그가 없는 것을 의미!
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간 : {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onClickReset}>reset</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

// module.exports = ResponseCheck;
module.exports = HooksResponseCheck;
