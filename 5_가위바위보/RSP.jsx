const React = require("react");
const { Component, createRef } = React;
const { useState, useRef } = React;

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

// Object.entries(rspCoords) :
// [
//   ["바위", "0"],
//   ["가위", "-142px"],
//   ["보", "-284px"]
// ]
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

// 생애주기
// class : constructor, 메서드 구성 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> (true) -> render -> componentDidUpdate)
// -> componentWillUnmount -> 소멸

// 일단 Component로 만든 후, 성능의 문제가 생길 것 같다면 PureComponent로 전환
class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: "0",
  };

  interval;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.가위)
      this.setState({ imgCoord: rspCoords.바위 });
    else if (imgCoord === rspCoords.바위)
      this.setState({ imgCoord: rspCoords.보 });
    else if (imgCoord === rspCoords.보)
      this.setState({ imgCoord: rspCoords.가위 });
  };

  // **Refactoring : 고차 함수(High order) 패턴 적용**
  // 1. onClick={() => this.onClickBtn} => onClick={this.onClickBtn}
  // 2. onClickBtn 정의된 곳에 뺏던 () =>을 아래와 같이 추가
  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;

    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({ result: "비겼습니다." });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => ({
        result: "이겼습니다!",
        score: prevState.score + 1,
      }));
    } else {
      this.setState((prevState) => ({
        result: "졌습니다ㅠ",
        score: prevState.score - 1,
      }));
    }
    setTimeout(() => {
      this.interval = setInterval(() => {
        // this를 붙여주지 않으면 => changeHand 함수를 찾지 못했다고 에러 발생
        this.changeHand();
      }, 100);
    }, 1000);
  };

  // 2. componentDidMount => 붙이는 그 순간에 특정한 동작을 해야 하는 경우
  // render가 실행되면 React가 DOM에다가 붙임
  // render가 1) 처음 2) 성공적으로 실행되었다면 => componentDidMount를 이어서 실행
  // cf> setState 등으로 리렌더링이 발생할 경우에는 componentDidMount가 실행되지 않음에 주의!
  // e.g. 비동기 요청
  componentDidMount() {
    // 클로저 문제 => **비동기 함수 안에서 밖 실행 컨텍스트의 변수를 참조할 때, 값이 바뀌지 않는 문제?**
    // setInterval 함수 안에서는 계속 0으로 평가
    // 변수를 정의한 실행 컨텍스트가 어딘지 잘 확인해야 함!
    // const { imgCoord } = this.state; // 0
    // 아래처럼 함수 객체 자체만 보내도 됨!
    console.log("다시 실행");
    this.interval = setInterval(this.changeHand, 100);
    // this.interval = setInterval(() => {
    //   // this를 붙여주지 않으면 => changeHand 함수를 찾지 못했다고 에러 발생
    //   this.changeHand();
    // }, 100);
  }

  // 3. componentDidUpdate => 컴포넌트가 리렌더링이 실행될 때
  componentDidUpdate() {}

  // 4. componentWillUnmount => 컴포넌트가 제거되기 직전에 특정한 동작을 해야하는 경우
  // 부모 컴포넌트가 자식 컴포넌트를 없앨 때
  // e.g. 비동기 요청 정리 : setInterval 같은 비동기 Web API 함수들은 컴포넌트와 독립적으로 동작하기 때문에, 컴포넌트가 사라져도 자동으로 clearInterval 되거나 하지 않음
  // => 다시 컴포넌트를 렌더링 하는 경우, 독립적으로 2개가 돌아감(구카 타이머 구현할 때 문제점) 메모리 누수
  // **componentWillUnmount 안에서 이런 처리를 해줘야 깔끔하게 동작함**
  componentWillUnmount() {
    console.log("종료");
    clearInterval(this.interval);
  }

  // 1. render
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.state.imgCoord} 0`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

module.exports = RSP;
