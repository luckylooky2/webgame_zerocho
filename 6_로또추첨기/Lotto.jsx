const React = require("react");
const { Component, createRef } = React;
const { useState, useRef } = React;
const Ball = require("./Ball");

function getWinNumbers() {
  // 계산량이 많은 함수 => 반복 실행을 막고자 할 때를 위해
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);

  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

// 생애주기
// class : constructor, 메서드 구성 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> (true) -> render -> componentDidUpdate)
// -> componentWillUnmount -> 소멸

// 일단 Component로 만든 후, 성능의 문제가 생길 것 같다면 PureComponent로 전환
class Lotto extends Component {
  // jQuery와 같이 직접 DOM을 건드리지 않음(querySelector)
  // state만 바꿔서 react가 화면을 저절로 그리게 하는 방식 => React의 작동 원리이자 장점
  state = {
    // 게임 트릭 : 미리 계산해놓고 하나씩 결과를 보여주는 방식을 많이 사용
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  displayBalls = () => {
    // 1. 비동기 함수에 변수를 함께 쓰면, 동기화가 안되는 클로저 문제가 발생하는데
    // let을 사용하면 괜찮음(ES6 추가 기능)
    // why?
    // 2. 항상 setTimeout, setInterval들은 clear를 해주어야 함 => 부모 컴포넌트에 의해 언제든지 사라질 수 있음
    // 사라질 때에, clear해주는 로직이 필요 => 메모리 누수 / 의도하지 않은 동작 방지
    // class(this에 바로 추가, componentWillUnmount)
    // hooks(useRef를 이용하여 저장(일반 변수에 저장 x), useEffect return)
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => ({
          winBalls: [...prevState.winBalls, this.state.winNumbers[i]],
        }));
      }, (i + 1) * 1000); // 순서대로 나타내기
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({ bonus: this.state.winNumbers[6], redo: true });
    }, 7000);
  };

  componentDidMount() {
    this.displayBalls();
  }

  // 바뀌기 이전 state : prevState
  // 바뀐 이후 state : this.state
  // 업데이트 하고 싶은 상황을 **조건문으로 잘 처리해주어야 함!**
  // why? 모든 props, state가 바뀔 때마다 실행되기 때문
  componentDidUpdate(prevProps, prevState) {
    // 숫자 공이 추가될 때도 componentDidUpdate가 호출되지만, 걸리는 것이 없기 때문에 그냥 넘어감
    // console.log로 디버깅하는 습관
    console.log("did update");
    // winBalls이 초기화되었을 때
    if (this.state.winBalls.length === 0) this.displayBalls();
  }

  componentWillUnmount() {
    // 정리 작업 : 많이 놓치기 쉬움
    this.timeouts.forEach((t) => {
      clearTimeout(t);
    });
  }

  onClickRedo = () => {
    // 초기화
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && (
          <button id="redo" onClick={redo ? this.onClickRedo : () => {}}>
            한 번 더!
          </button>
        )}
      </>
    );
  }
}

module.exports = Lotto;
