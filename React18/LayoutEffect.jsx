import React from "react";
import { useState, useLayoutEffect, useEffect } from "react";

// useLayoutEffect
// 언제 사용하는가?
// 화면 깜빡임이 발생할 때, 간발의 차이로 리렌더링이 될 때
// 즉, 실행 순서를 앞당길 때!
const LayoutEffect = () => {
  const [name, setName] = useState("");

  // 깜빡이는 효과가 나타남
  // why? name이 "" 였다가 나중에 useEffect를 통해 "제로초"로 바뀌기 때문
  // 1. useState 선언할 때 사용
  // 2. 값을 나중에 알게 되는 경우 : 서버, 캐시로부터 받아오는 경우 불가

  // hook flow
  // render() => browser paint => useEffect()
  //      useState("")
  //                      setName("제로초")
  useEffect(() => {
    setName("제로초");
  }, []);

  // hook flow
  // render() => useLayoutEffect() => browser paint => useEffect()
  //      useState("")
  //                         setName("제로초")
  useLayoutEffect(() => {
    setName("제로초");
  }, []);

  console.log("render : ", name);

  return (
    <div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
      <div>안녕하세요. {name}입니다.</div>
    </div>
  );
};

export default LayoutEffect;
