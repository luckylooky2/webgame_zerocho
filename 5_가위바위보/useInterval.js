// ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ./CustomHookRSP.jsx
// CommonJS의 module.exports나 exports.* 구문을 사용해야 함
// CommonJS(module.exports, require)와 ES Module(import, export)을 함께 사용하지 못함
const React = require("react");
const { useEffect, useRef } = React;

// 기능 : 특정 동작을 1초마다 실행하는 커스텀 훅
// delay을 null로 만들면 interval이 멈추게 만들어 더 쉽게 다룰 수 있음

// 사용 예시 :
// const [isRunning, setRunning] = useState(true);
// useInterval(() => {
//   console.log("hello");
// }, isRunning ? 1000 : null);

function useInterval(callback, delay) {
  // callback을 저장하기 위해 선언
  const savedCallback = useRef();

  // 컴포넌트가 렌더링될 때마다 callback을 savedCallback.current에 할당(저장)하는 역할
  // 이렇게 하면 savedCallback.current가 항상 최신의 callback을 참조하게 됨
  // cf> 컴포넌트의 모든 렌더링과 함께 실행됨
  useEffect(() => {
    savedCallback.current = callback;
  });

  // if 의존성 배열에 state가 있다면? delay가 변경될 때만 실행됨
  // if 의존성 배열이 비었다면? 초기 렌더링 후 한 번만 실행됨(componentDidMount와 유사)
  useEffect(() => {
    function tick() {
      // 이 때, 항상 최신의 callback을 사용할 수 있음!
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  // callback을 의존성 배열에 담아서 렌더링해도 되는 것 아닌가?
  // setInterval, clearInterval할 때, 딜레이가 조금씩 발생
  // callback이 변함에 따라 set, clear가 동작하고 그에 따라 딜레이가 반영이 되어 1초보다 더 늦게 변화
  // 대신, ref를 이용하여 최신 콜백을 담아둔 다음에 최신 콜백을 실행하게 하는 방법

  return savedCallback.current;
}

module.exports = useInterval;
