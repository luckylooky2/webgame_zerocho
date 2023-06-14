import React, {
  useCallback,
  useContext,
  useEffect,
  memo,
  useMemo,
} from "react";
import { TableContext } from "./MineSearch";
import {
  OPEN_CELL,
  CLICK_MINE,
  CODE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMAL_CELL,
} from "./constant";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return { background: "#444" };
    case CODE.CLICKED_MINE:
      return { background: "red" };
    case CODE.MINE:
      return { background: "#444" };
    case CODE.OPENED:
      return { background: "white" };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return { background: "skyblue" };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return { background: "yellow" };
    default:
      return { background: "white" };
  }
};

const Td = memo(({ columnIndex, rowIndex }) => {
  // useContext를 사용하면 tableData가 바뀔 때마다 기본적으로 모든 Td 컴포넌트가 리렌더링됨
  const { tableData, dispatch, halted } = useContext(TableContext);

  // 사실 컴포넌트가 리렌더링 되는 것은 막을 수 없는데
  // return 하는 JSX가 리렌더링되는 것을 막을 수 는 있음 => useMemo() : 값, JSX 캐싱
  console.log("render : Td"); // 100번 리렌더링

  const getTdText = useCallback(
    (code) => {
      // open한 칸만 리렌더링
      console.log("render : getTdText");
      switch (code) {
        case CODE.NORMAL:
        case CODE.OPENED:
          return "";
        case CODE.MINE:
          return halted ? "X" : "";
        // return "X"; // 디버깅 용도
        case CODE.CLICKED_MINE:
          return "펑";
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          return "🚩";
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          return "?";
        default:
          return code;
      }
    },
    [halted]
  );

  // **함수는 useCallBack 생활화!**
  const onClickCell = useCallback(() => {
    // onClick={halted ? () => {} : onClickCell} 보다 효율적인 듯?
    if (halted) return;
    switch (tableData[rowIndex][columnIndex]) {
      case CODE.OPENED: // 굳이 return을 안 써줘도 됨
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, col: columnIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, col: columnIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][columnIndex], halted]);

  const onRightClickCell = useCallback(
    (e) => {
      e.preventDefault();
      if (halted) return;
      switch (tableData[rowIndex][columnIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          // action 먼저 추상적으로 선언한 후, 나중에 구체화하는 방법이 편함
          dispatch({ type: FLAG_CELL, row: rowIndex, col: columnIndex });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, col: columnIndex });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NORMAL_CELL, row: rowIndex, col: columnIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][columnIndex], halted]
  );

  // react가 편한 이유
  // 데이터에 따라서 style, text를 바꿔줄 수 있기 때문에 매우 편함

  // useMemo를 통한 리렌더링 방지
  return useMemo(
    () => (
      <td
        onClick={onClickCell}
        onContextMenu={onRightClickCell}
        style={getTdStyle(tableData[rowIndex][columnIndex])}
      >
        {getTdText(tableData[rowIndex][columnIndex])}
      </td>
    ),
    [tableData[rowIndex][columnIndex], halted]
  );
});

export default Td;
