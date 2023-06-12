import React from "react";
import {
  useState,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  createContext,
} from "react";
import Table from "./Table";
import Form from "./Form";
import { START_GAME, OPEN_CELL, CODE, CLICK_MINE } from "./constant";

// 1. createContext
// 기본 값을 설정할 수 있음 => 초기 값이 따로 필요하지 않으므로 모양만 맞추어 줌
// 상태 값을 활용할 것이기 때문?
// why export? TableContext 객체에 값이 담기나? <TableContext.Provider>의 value와는 무슨 관계?
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: false,
};

function createMap(row, col, mine) {
  const candidate = Array(row * col)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];

  // shuffle 정렬
  // mine 개수만큼의 숫자를 랜덤으로 뽑아 놓음
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    data[Math.floor(shuffle[k] / col)][shuffle[k] % col] = CODE.MINE;
  }
  return data;
}

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: createMap(action.row, action.col, action.mine),
      };
    case OPEN_CELL: {
      // 이차원 배열 : 필요한 부분만 깊은 복사를 하여 효율적으로 불변성을 유지
      // row의 얕은 복사를 수행하기 때문에 tableData의 주소는 다를지 몰라도 row의 주소는 다름
      const tableData = [...state.tableData];
      // 값이 바뀐 row만 깊은 복사 수행
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.OPENED;
      return {
        ...state,
        tableData: tableData,
      };
    }
    // cf> 일차원 배열?
    // 얕은 복사는 일차원 배열에서는 깊은 복사와 동일한 결과를 보이지만, 배열의 요소들이 객체나 배열과 같이 참조 타입을 가지는 경우에는 차이가 나타남
    // 결과적으로 스프레드 문법은 얕은 복사를 진행하는 것이고, 일차원 배열에서는 각각의 요소들이 객체나 배열을 참조하고 있지 않으므로 깊은 복사와 동일한 결과라고 생각하면 됨
    // 대신 일차원 배열이라도 객체를 참조하고 있다면( e.g. const a = [{a : 1}, {a : 2} , {a : 3}]; ), 깊은 복사와 동일한 결과가 나타나지 않음
    // const b = a.map(obj => ({ ...obj })); 처럼 개별적으로 얕은 복사를 해주어야 함!
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.OPENED;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL:
      return;
    case QUESTION_CELL:
      return;
    case NORMAL_CELL:
      return;
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.tableData);

  // cf> context API 최적화 : useMemo()를 통한 캐싱
  // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}> 이런 식으로 사용하면
  // value가 리렌더링 될 때마다 새로 생기기 때문에, 성능에 큰 무리가 감
  const value = useMemo(
    () => ({
      tableData: state.tableData,
      dispatch,
    }),
    [state.tableData]
  );

  // Form에 dispatch을 props로 넘겨야 하는데, 컴포넌트를 거치지 않고 바로 context API를 이용하여 받을 수 있음
  // 2. <TableContext.Provider>로 묶어줌 => 자식 컴포넌트에서 데이터(value)에 접근할 수 있음
  // 3. value 채우기 : 자식 컴포넌트에 전달할 상태 값들
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
