// <script>를 사용하지 않고, require를 사용하는 방법
const React = require("react");
// 객체 구조 분해 할당 : 모든 객체에서 특정 프로퍼티만 가져와 개별 변수로 사용
const { useState, useRef } = require("react");

const GuGudan = () => {
  // Hooks : useState()
  // state를 객체로 묶지 않고 쪼갰다고 생각하면 됨!
  // 물론 기존의 방식처럼 state를 하나의 객체로 관리할 수도 있음
  // 부분적으로 state를 바꾸는 경우에 문제 발생 => 누락한 state 값이 사라지는(초기화되는) 문제
  // class component의 this.setState()는 바꾸지 않을 state를 누락해도 상관 없음
  // 주의! 컴포넌트 안에 넣어주어야 함
  const [operand1, setOperand1] = useState(Math.ceil(Math.random() * 9));
  const [operand2, setOperand2] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === operand1 * operand2) {
      setResult(`${operand1} * ${operand2} = ${value} 딩동댕`);
      setOperand1(Math.ceil(Math.random() * 9));
      setOperand2(Math.ceil(Math.random() * 9));
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      {operand1} 곱하기 {operand2}는?
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

// <script>를 사용하지 않는 대신, exports를 해주어야 다른 파일에서 사용할 수 있음
module.exports = GuGudan;
