import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext } from "./MineSearch";
import { START_GAME } from "./constant";

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  // 4. useContext로 데이터 가져올 수 있음
  // const value = useContext(TableContext);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCol = useCallback((e) => {
    setCol(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, col, mine });
  }, [row, col, mine]);

  console.log("render : Form");

  return (
    <>
      <input
        type="number"
        value={row}
        placeholder="세로"
        onChange={onChangeRow}
      />
      <input
        type="number"
        value={col}
        placeholder="가로"
        onChange={onChangeCol}
      />
      <input
        type="number"
        value={mine}
        placeholder="지뢰"
        onChange={onChangeMine}
      />
      <button onClick={onClickBtn}>시작</button>
    </>
  );
});

export default Form;
