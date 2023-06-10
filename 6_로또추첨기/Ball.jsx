const React = require("react");
const { memo } = React;

// state를 쓰지 않으면 **함수 컴포넌트**로 만들어주는 것이 좋음
// cf> 강의에서 말하는 hooks와 다름! => useState, useEffect와 같은 hooks를 말하는 것

// PureComponent로 만들고 싶을 때는 memo를 이용
// 컴포넌트를 다른 컴포넌트로 감싸는 것(e.g. memo, forwardRef)을 고차 컴포넌트(high order component, HOC)라고 부름
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "green";
  } else {
    background = "blue";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

module.exports = Ball;
