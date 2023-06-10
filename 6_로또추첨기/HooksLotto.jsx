const React = require("react");
const { useState, useRef, useEffect, useMemo, useCallback } = React;
const Ball = require("./Ball");

// state 사용하지 않는 함수는 컴포넌트 밖으로 옮기자!
function getWinNumbers() {
  // 문제 : hooks에서는 getWinNumbers가 계속 실행됨
  // render()가 아니라 모두 다시 실행되기 때문에
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

// **Hooks는 순서가 매우 중요함!**
// 1. 순서가 바뀌면 안 됨 => 최상위에 위치시킬 것
// 2. 조건문 안에 절대 넣으면 안 됨(순서가 바뀌기 때문에) e.g. if (조건) { const [state, setState] = ... }
// 3. 함수나 반복문 안에도 웬만하면 넣지 말 것
const HooksLotto = () => {
  // getWinNumbers가 다시 실행되지 않게 하기 위해 값을 저장
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  // 여기서 getWinNumbers가 계속 실행됨 => useMemo를 이용하여 한 번만 실행되게 함
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const displayBalls = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevState) => [...prevState, winNumbers[i]]);
      }, (i + 1) * 1000); // 순서대로 나타내기
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  // useMemo가 특정 함수의 결과 값을 다시 실행되지 않게 하려는 목적이었다면,
  // useCallback은 특정 함수 자체가 다시 정의되지 않게 하려는 목적

  // ***주의해야 할 사항!***
  // 무조건 함수마다 useCallback을 사용하는 것이 좋은가?
  // 1. 안에서 state를 사용한다면 의존성 배열에 state를 추가해야, 바뀐 state를 가지고 진행할 수 있음
  // 2. 자식 컴포넌트에 함수를 props로 넘기는 경우에는 항상 useCallback을 사용 => 새로 함수가 정의되면 항상 자식 컴포넌트가 리렌더링
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  // 의존성 배열이 비었다면? componentDidMount
  // 의존성 배열에 요소가 있다면? componentDidMount + componentDidUpdate 동시 수행
  useEffect(() => {
    displayBalls();

    // cf> 그냥 실행시킬 코드가 아니라 "함수"임에 주의!
    return () =>
      timeouts.current.forEach((t) => {
        clearTimeout(t);
      });
    // ***꼭 state가 아니어도 됨*** => ref, boolean여도 상관없음
    // 오히려 state(redo)라면 더 어렵게 처리해야 함
    // timeouts.current[i]는 componentDidUpdate를 실행하지 않음(참조 변경 x)
  }, [timeouts.current]);

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winNumbers]);

  // componentDidMount와 동일
  useEffect(() => {
    // ajax 요청
  }, []);

  // useEffect에서 componentDidMount가 아닌 componentDidUpdate에서만 ajax 요청을 하려면?
  // 기본적으로 componentDidMount에서만 실행을 안 시키도록 하지는 못함
  // 대신 패턴을 이용
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true; // componentDidMount에서는 건너뜀
    } else {
      // 이후 componentDidUpdate에서만 실행
      // ajax 요청
    }
  });

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
        <button id="redo" onClick={redo ? onClickRedo : () => {}}>
          한 번 더!
        </button>
      )}
    </>
  );
};

module.exports = HooksLotto;
