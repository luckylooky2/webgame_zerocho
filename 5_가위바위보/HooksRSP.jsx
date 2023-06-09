const { useEffect } = require("react");
const React = require("react");
const { useState, useRef } = React;

// 생애주기
// class : constructor, 메서드 구성 -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때 -> shouldComponentUpdate -> (true) -> render -> componentDidUpdate)
// -> componentWillUnmount -> 소멸

// 함수형 컴포넌트에 라이프사이클이 따로 존재하는 것은 아니지만 hooks을 이용하여 라이프사이클을 따라할 수는 있음

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

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

const HooksRSP = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const interval = useRef(null);

  const changeHand = () => {
    if (imgCoord === rspCoords.가위) setImgCoord(rspCoords.바위);
    else if (imgCoord === rspCoords.바위) setImgCoord(rspCoords.보);
    else if (imgCoord === rspCoords.보) setImgCoord(rspCoords.가위);
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다ㅠ");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  // 아래 2개를 어떻게 처리? => useEffect hook
  //   componentDidMount() {
  //     this.interval = setInterval(this.changeHand, 100);
  //   }

  //   componentWillUnmount() {
  //     clearInterval(this.interval);
  //   }

  // componentDidMount, componentDidUpdate와 비슷한 기능(1대1 대응은 아님에 주의)
  // why? class 컴포넌트는 리렌더링 시, render()만 다시 실행하는 반면,
  // functional 컴포넌트는 리렌더링 시, **컴포넌트 전체가 다시 실행되는** 차이점(특성)이 존재
  // 그럼에 따라 모든 함수, 변수(useRef 제외)들이 초기화됨 => useMemo, useCallback
  // 따라서, 1대1로 완벽하게 대응하지 않고 작동 방식이 약간 다름
  // 여기서는 setInterval이 단위 시간마다 실행되는 것이 아니라, 단위 시간마다 setInterval, clearInterval을 반복하는 것에 불과
  // 즉, 그냥 setTimeout을 계속 하는 것과 같은 효과
  // cf> class와 functional의 작동 방식이 다르기 때문에 이러한 차이가 발생하는 것!
  useEffect(() => {
    console.log("다시 실행");
    interval.current = setInterval(changeHand, 100);

    // componentWillUnmount와 비슷한 기능(1대1 대응은 아님에 주의)
    return () => {
      console.log("종료");
      clearInterval(interval.current);
    };
  }, [imgCoord]); // 의존성 배열 : 앞서 발생했던 클로저 문제를 해결하는 역할(componentDidMount vs. componentDidUpdate을 선택하는 역할)

  //                        result, imgCoord, score
  // componentDidMount
  // componentDidUpdate
  // componentWillUnmount

  // class 컴포넌트의 경우, 생애주기 함수에서 모든 state를 조건문으로 분기하여 처리(가로)
  //   componentDidMount() {
  //     this.setState({
  //       imgCoord: 3,
  //       score: 1,
  //       result: 2,
  //     });
  //   }

  // functional 컴포넌트의 경우, state마다 useEffcet를 사용하여 생애주기 함수를 관리한다고 생각(세로)
  //   useEffect(() => {}, [imgCoord]);
  //   useEffect(() => {}, [score]);
  //   useEffect(() => {}, [result]);

  // useLayoufEffect
  // useEffect : 화면이 렌더링 되고 난 후 시점에 특정 동작을 실행하려고 할 때(화면 바뀐 후를 감지)
  // useLayoufEffect : 화면이 렌더링 되기 전 시점에 특정 동작을 실행하려고 할 때(화면 바뀌는 것 자체를 감지)

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

module.exports = HooksRSP;
