const React = require("react");
const { useState, useRef, useEffect, memo, useCallback } = React;
const { CLICK_CELL, SET_WINNER, SET_TURN } = require("./constant");

// TicTacToe에 있는 dispatch를 넘기는 과정이 반복적이기 때문에 불편
// context API를 사용
const Td = memo(({ rowIndex, columnIndex, dispatch, columnData }) => {
  // 최적화 방법
  // 하이라이트가 빨간 색이 아니라면 성능에 크게 문제가 없음
  // 1. useRef / useEffect 를 이용하여 어떤 props, state가 바뀌었는지 확인
  const ref = useRef([]);

  useEffect(() => {
    // 바뀐 상태 값을 false로 확인
    console.log(
      rowIndex === ref.current[0],
      columnIndex === ref.current[1],
      dispatch === ref.current[2],
      columnData === ref.current[3]
    );
    // 어떻게 바뀌었는지 확인
    console.log(rowIndex, ref.current[0]);
    ref.current = [rowIndex, columnIndex, dispatch, columnData];
  }, [rowIndex, columnIndex, dispatch, columnData]);

  // 2. memo
  // props만 바뀌지 않는다면, 자식 컴포넌트가 리렌더링이 되지 않기 떄문에 비교적 쉬운 해결방법
  // 자식 컴포넌트들이 memo를 적용했다면, 부모 컴포넌트도 순차적으로 memo를 적용할 수 있음

  // 3. useMemo
  // 가장 마지막 방법으로 컴포넌트(JSX) 자체를 기억하는 방법
  // 의존성 배열로 바꿀 시점을 정함

  // columnData가 바뀔때 마다 함수를 새로 만들어야하기 때문에 => rowIndex, columnIndex가 계속 바뀌기 때문
  // 처음부터 아예 useCallback을 사용하지 말거나
  const onClickTd = useCallback(() => {
    if (columnData) return;

    // console.log(rowIndex, columnIndex);
    // **redux와 다르게 useState, useReducer 등 React는 state를 비동기로 처리** => redux는 동기적으로 처리
    dispatch({
      type: CLICK_CELL,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
    });
    // 즉, 여기서 console.log(turn)을 해도 바뀌기 전 값으로 나옴
    // ***비동기인 state에서 작업 처리를 하려면 항상 useEffect를 사용해야 함*** => 무슨 뜻?
    // dispatch(CLICK_CELL) => TicTacToe useEffect => dispatch(SET_TURN)을 기대했는데
    // 비동기 처리로 인해 dispatch(CLICK_CELL) => dispatch(SET_TURN) => TicTacToe useEffect로 실행되어 예상대로 되지 않음
    // dispatch({ type: SET_TURN });
  }, [columnData]);

  return <td onClick={onClickTd}>{columnData}</td>;
});

module.exports = Td;
