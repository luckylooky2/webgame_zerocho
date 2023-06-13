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
import {
  START_GAME,
  RESET_GAME,
  WIN_GAME,
  OPEN_CELL,
  CODE,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMAL_CELL,
  INCREMENT_TIMER,
} from "./constant";

// 1. createContext
// 기본 값을 설정할 수 있음 => 초기 값이 따로 필요하지 않으므로 모양만 맞추어 줌
// 상태 값을 활용할 것이기 때문?
// why export? TableContext 객체에 값이 담기나? <TableContext.Provider>의 value와는 무슨 관계?
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: true,
});

const initialState = {
  count: { row: 0, column: 0, mine: 0 },
  tableData: [],
  timer: 0,
  result: "",
  halted: true,
  // mineCount를 세는 것이 아니라 openedCount를 셈
  // why? mineCount는 Mine + FlagMine으로 계산하기 때문에, 두 개를 같다고 생각한다는 문제
  openedCount: 0,
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

// const countObject = (target, object) => {
//   let count = 0;
//   target.map((v) => {
//     count += v.filter((v) => v === object).length;
//   });
//   return count;
// };

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      // 여기서 timerRef를 사용하지 못하기 때문에...
      // timerRef = setInterval(() => {
      //   dispatch({ type: INCREMENT_TIMER });
      // });
      return {
        tableData: createMap(action.row, action.col, action.mine),
        timer: 0,
        result: "",
        halted: false,
        count: { row: action.row, column: action.col, mine: action.mine },
        openedCount: 0,
      };
    case OPEN_CELL: {
      // 이차원 배열 : 필요한 부분만 깊은 복사를 하여 효율적으로 불변성을 유지
      // row의 얕은 복사를 수행하기 때문에 tableData의 주소는 다를지 몰라도 row의 주소는 다름
      const tableData = [...state.tableData];
      // 모든 row만 깊은 복사 수행
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let openedCount = 0;
      // 1. 주변 9칸을 바로 검사하는 것이 아니라 검사할 칸을 추가하여 하나씩 돌면서 검사
      // 2. 재귀 호출을 해야 하기 때문에 => 함수화
      const checkAround = (row, col) => {
        // 체크하지 않는 경우 : 이미 클릭한 경우 / 플래그, 물음표 칸으로 설정한 경우
        if (
          [
            CODE.OPENED,
            CODE.FLAG_MINE,
            CODE.FLAG,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][col])
        )
          return;
        // 체크하지 않는 경우 : 재귀 호출을 할 때(클릭할 때 x), 상하좌우 칸이 없는 경우(0 ~ 9의 범위)
        if (
          row < 0 ||
          row >= tableData.length || // 등호 문제 : 끝 줄도 무시해버렸기 때문에
          col < 0 ||
          col >= tableData[0].length // 등호 문제
        )
          return;
        // 체크하지 않는 경우 : 재귀 호출을 할 때, 이미 체크한 칸을 건너 뜀
        // cf> 건너뛰지 않을 경우, 이미 체크한 칸을 계속 검사하여 비효율적 + 꼭지점 칸을 클릭하면 무한 재귀 호출로 인한 콜 스택 오버플로우
        // Dynamic Programming의 해결법과 비슷(이미 체크한 칸은 저장해놓고, 검사하지 않음)
        if (checked.includes(row + "/" + col)) return;
        else checked.push(row + "/" + col);
        // openedCount++; // 문제) openedCount를 최대한 뒤로 미룸
        let around = [tableData[row][col - 1], tableData[row][col + 1]];
        // concat의 return은 array
        // 좌우는 검사하지 않는 이유? JS의 특성 때문
        // 1. 상하 칸이 없을 경우 tableData[row - 1]이 undefined가 됨
        // 2. undefined에 [] 연산을 하는 경우 에러가 발생
        // 3. 좌우 칸이 없을 경우 tableData[row - 1][col - 1]이 undefined가 됨
        // 4. filter()에서 undefined를 처리해주기 때문에 가능
        if (tableData[row - 1]) {
          around = around.concat(tableData[row - 1][col - 1]);
          around = around.concat(tableData[row - 1][col]);
          around = around.concat(tableData[row - 1][col + 1]);
        }
        if (tableData[row + 1]) {
          around = around.concat(tableData[row + 1][col - 1]);
          around = around.concat(tableData[row + 1][col]);
          around = around.concat(tableData[row + 1][col + 1]);
        }
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length; // filter의 return은 array
        // 여기에 놓으면 openedCount와 state.openedCount가 바뀌지 않음
        // why? 무조건 count가 세지기 때문에(tableData[row][col]가 바뀌기 때문에 cell의 속성이 바뀜 => -1 ~ -7 => 0 ~ 8)
        // 아래 조건문에서 무조건 false가 되어 openedCount를 셀 수 없음
        // tableData[row][col] = count;
        if (count === 0) {
          const near = [];
          // 마찬가지로 undefined 처리
          if (row - 1 > -1) {
            near.push([row - 1, col - 1]);
            near.push([row - 1, col]);
            near.push([row - 1, col + 1]);
          }
          near.push([row, col - 1]);
          near.push([row, col + 1]);
          // cf> 부등호 방향이 달랐기 때문에 클릭한 row 아래로는 검사하지 않았음
          if (row + 1 < tableData.length) {
            near.push([row + 1, col - 1]);
            near.push([row + 1, col]);
            near.push([row + 1, col + 1]);
          }
          near
            // **입력된 값을 boolean 값으로 변환하는 식**
            // => truthy한 값은 true로 falsey한 값은 false로 변환
            // falsey : 0, "", null, undefined, NaN ...
            // 위에서 if문을 통해 필터링을 하기 때문에 굳이 필요는 없으나 기억해두자!
            // .filter((v) => !!v[0])
            .forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED)
                // 주변 칸들이 이미 연 칸이 아니면 체크하지 않음
                checkAround(n[0], n[1]);
            });
        }
        // 여기서 무작정 올리지 말고, 닫힌 칸이면 카운트 증가
        // 조건문 없이 올리자니, 다음 번에 셀 때 이미 센 것 까지 같이 카운트되는 문제
        // count로 바꾸는 것은 마지막으로 미뤄두고, 현재 열지 않은 것(CODE.NORMAL)만 카운트에 추가
        if (tableData[row][col] === CODE.NORMAL) {
          openedCount++;
        }
        tableData[row][col] = count;
      };

      checkAround(action.row, action.col);
      let halted = false;
      let result = "";
      console.log(
        state.count.row * state.count.column - state.count.mine,
        state.openedCount,
        openedCount
      );
      if (
        state.count.row * state.count.column - state.count.mine ===
        state.openedCount + openedCount
      ) {
        halted = true;
        result = `승리하셨습니다! 기록 : ${state.timer}초`;
      }
      return {
        ...state,
        tableData: tableData,
        openedCount: state.openedCount + openedCount,
        halted: halted,
        result: result,
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
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData: tableData,
        result: "패배하셨습니다!",
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // FLAG_CELL, FLAG_MINE_CELL 중복 처리
      if (tableData[action.row][action.col] === CODE.MINE)
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      else tableData[action.row][action.col] = CODE.FLAG;
      return {
        ...state,
        tableData: tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.FLAG_MINE)
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      else tableData[action.row][action.col] = CODE.QUESTION;
      return {
        ...state,
        tableData: tableData,
      };
    }
    case NORMAL_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE)
        tableData[action.row][action.col] = CODE.MINE;
      else tableData[action.row][action.col] = CODE.NORMAL;
      return {
        ...state,
        tableData: tableData,
      };
    }
    case RESET_GAME:
      return initialState;
    case WIN_GAME:
      return {
        ...state,
        result: "승리하셨습니다!",
        halted: true,
      };
    case "INCREMENT_TIMER":
      return {
        ...state,
        timer: state.timer + 1,
      };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // state destructuring
  const { tableData, halted, timer, result, count, openedCount } = state;

  // cf> context API 최적화 : useMemo()를 통한 캐싱
  // <TableContext.Provider value={{ tableData: state.tableData, dispatch }}> 이런 식으로 사용하면
  // value가 리렌더링 될 때마다 새로 생기기 때문에, 성능에 큰 무리가 감
  const value = useMemo(
    () => ({
      tableData: tableData,
      halted: halted,
      dispatch,
    }),
    [tableData, halted]
  );

  // useEffect(() => {
  //   // 승리 조건
  //   // if (
  //   //   tableData.length !== 0 &&
  //   //   countObject(tableData, CODE.FLAG_MINE) === mineCount
  //   // )
  //   if (count.row * count.column - count.mine === openedCount + count)
  //     dispatch({ type: WIN_GAME });
  // }, [tableData]);

  // 굳이 시작 버튼이 있는데 있을 필요가 없음
  // const onClickReset = useCallback(() => {
  //   dispatch({ type: RESET_GAME });
  // }, []);

  useEffect(() => {
    let timer;

    if (!halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  // Form에 dispatch을 props로 넘겨야 하는데, 컴포넌트를 거치지 않고 바로 context API를 이용하여 받을 수 있음
  // 2. <TableContext.Provider>로 묶어줌 => 자식 컴포넌트에서 데이터(value)에 접근할 수 있음
  // 3. value 채우기 : 자식 컴포넌트에 전달할 상태 값들
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
      {/* {halted ? <button onClick={onClickReset}>reset</button> : ""} */}
    </TableContext.Provider>
  );
};

export default MineSearch;
