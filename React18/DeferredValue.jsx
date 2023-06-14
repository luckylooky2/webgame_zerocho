import React from "react";
import {
  useCallback,
  useState,
  useTransition,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";

// useDeferredValue
// useLayoutEffect가 실행 순서를 앞당겼다면, useDeferredValue 실행 순서를 뒤로 미룸
// 언제 사용하는가?
// e.g. useMemo에서 많이 사용
const DeferredValue = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  // name이 더 중요하다는 것을 useDeferredValue hook으로 표시하는 기능!
  // 리렌더링이 더 빨리 되어야 하는 값
  const deferredName = useDeferredValue(name);
  // useMemo를 사용해도 name을 바꾸면 똑같이 리렌더링되어 같은 결과가 나타남
  const result = useMemo(() => deferredName + "의 결과", [deferredName]);

  const onChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  console.log("render : ", name);

  return (
    <div>
      <div>{count}</div>
      <input value={name} onChange={onChange} />
      {deferredName
        ? Array(1000)
            .fill()
            .map((v, i) => <div key={i}>{result}</div>)
        : null}
    </div>
  );
};

export default DeferredValue;
