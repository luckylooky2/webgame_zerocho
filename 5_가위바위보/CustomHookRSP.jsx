// ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ./CustomHookRSP.jsx
// CommonJS의 module.exports나 exports.* 구문을 사용해야 함
// CommonJS(module.exports, require)와 ES Module(import, export)을 함께 사용하지 못함
const useInterval = require("./useInterval");
const React = require("react");
const { useState } = React;

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

const CustomHookRSP = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [isRunning, setIsRunning] = useState(true);

  const changeHand = () => {
    if (imgCoord === rspCoords.가위) setImgCoord(rspCoords.바위);
    else if (imgCoord === rspCoords.바위) setImgCoord(rspCoords.보);
    else if (imgCoord === rspCoords.보) setImgCoord(rspCoords.가위);
  };

  // custom hook
  // 특정한 hook 2개 이상이 반복될 때 사용하면 유용
  // useRef와 useEffect가 하나의 interval 역할을 하기 때문에 만들면 좋음
  // hook이 너무 길거나? 반복되는 hook이 있으면 custom hook을 만들면 편함
  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setIsRunning(false);
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
        setIsRunning(true);
      }, 1000);
    }
  };

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

module.exports = CustomHookRSP;
