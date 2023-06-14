import React from "react";
import { useCallback, useState, useTransition, useEffect } from "react";

// useTransition
// useLayoutEffect가 실행 순서를 앞당겼다면, useTransition은 실행 순서를 뒤로 미룸
// useDeferredValue와 함께 두 가지 중에서 선택!
// 언제 사용하는가?
// e.g. 검색 창에 특정 단어를 검색하고, 결과가 나중에 뜨는 상황
// 검색 결과를 리렌더링하는 시간 때문에 검색 창 또한 리렌더링 되는 시간이 걸리는 상황
const Transition = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [loading, startTransition] = useTransition();

  const onChange = useCallback((e) => {
    setName(e.target.value);
    // => 조금 느려도 되는 부분을 startTransition으로 감싸줌
    // React가 알아서 미뤄줌
    startTransition(() => {
      setResult(e.target.value + "의 결과");
    });
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

  // 렌더링 할 컴포넌트가 너무 많으면 렉이 걸릴 수 있음
  // 1. 가장 좋은 방법은 렌더링되는 컴포넌트의 수를 줄임(useMemo, memo vs. 20개씩 보여주는 방법)
  // 2. 위 방법을 사용하지 못하는 걸 가정하였을 때, 지금 혹은 나중에 리렌더링 해야할 것을 구분
  // => 나중에 리렌더링으로 구분된 컴포넌트는 실제로 나중에 리렌더링
  // 1) input : 리렌더링이 느리면 심리적으로 느리다고 느낌
  // 2) 검색 결과 : 가져오는 시간도 있고, 리렌더링이 느려도 심리적으로 괜찮음
  return (
    <div>
      <div>{count}</div>
      {loading ? <div>로딩중...</div> : null}
      <input value={name} onChange={onChange} />
      {name
        ? Array(1000)
            .fill()
            .map((v, i) => <div key={i}>{result}</div>)
        : null}
    </div>
  );
};

export default Transition;
