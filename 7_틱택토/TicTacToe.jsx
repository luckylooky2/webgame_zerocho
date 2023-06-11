const React = require("react");
const { useState, useReducer, useCallback, useEffect } = React;
// CommonJS로 컴포넌트를 require할 때는 destructuring 없이!
const Table = require("./Table");
const { CLICK_CELL, SET_WINNER, SET_TURN, RESET_GAME } = require("./constant");

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  // 모든 셀을 매번 검사하는 것보다 최근 셀을 저장하여, 해당 셀이 될 수 있는 부분만 하면 더 효율적
  recentCell: [-1, -1],
};

// reducer : 뭔가를 줄인다는 뜻?
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state, // 기존 객체에서 얕은 복사(spread 문법)
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      // immer 라이브러리로 가독성 해결
      tableData[action.rowIndex] = [...tableData[action.rowIndex]];
      tableData[action.rowIndex][action.columnIndex] = state.turn;

      return {
        ...state,
        tableData: tableData,
        recentCell: [action.rowIndex, action.columnIndex],
      };

    // return {
    //   ...state,
    //   tableData: [
    //     ...state.tableData,
    //     (state.tableData[action.rowIndex][columnIndex] = state.turn),
    //   ],
    // };

    case SET_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case RESET_GAME:
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};

// Td -> Tr -> Table
// 실제 클릭하는 것은 Td 컴포넌트, state는 TicTacToe 컴포넌트에 존재
// 2단계를 거쳐서 주고 받아야 함 => 주로 context API 혹은 useReducer로 해결
const TicTacToe = () => {
  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableData, setTableData] = useState([
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""],
  // ]);
  // useReducer : state의 개수를 줄이는 방법(하나의 state, setState로 통일할 수 있음)
  // redux 라이브러리의 개념을 따옴
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, recentCell, turn } = state;

  // const onClickTable = useCallback(() => {
  //   // dispatch 안에 들어가는 매개변수는 "action"
  //   // 1. action의 정해진 형식은 없고, reducer에서 잘 처리만 하면 됨
  //   // 2. action 자체로 state가 변하는 것은 아니고
  //   // action을 전달 -> reducer가 해석 및 state 변경 -> state 변경
  //   // 3. action.type은 unique하게 만들 것
  //   dispatch({ type: SET_WINNER, winner: "O" });
  // }, []);

  useEffect(() => {
    const [row, column] = recentCell;

    if (row < 0) return; // componentDidMount인 경우를 제외하기 위해
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    )
      win = true;
    if (
      tableData[0][column] === turn &&
      tableData[1][column] === turn &&
      tableData[2][column] === turn
    )
      win = true;
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    )
      win = true;
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    )
      win = true;
    if (win) {
      dispatch({
        type: SET_WINNER,
        winner: turn,
      });
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부 검사
      let all = true; // 다 차있다고 가정
      tableData.forEach((row) => {
        row.forEach((column) => {
          if (!column) all = false;
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else dispatch({ type: SET_TURN });
    }
  }, [recentCell]);

  // onClick은 Table 컴포넌트의 props이므로 클릭한다고하여 실행되지 않음
  // 특정 HTML 태그 속성에 추가하는 과정이 필요
  // **dispatch도 마찬가지**
  return (
    <>
      <Table
        // onClick={onClickTable}
        tableData={tableData}
        dispatch={dispatch}
      />
      {winner && <div>{winner}님의 승리!</div>}
    </>
  );
};

module.exports = TicTacToe;
