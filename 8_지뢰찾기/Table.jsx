import React, { useContext, memo } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  // 리렌더링 확인용
  console.log("render : Table");

  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((v, rowIndex) => {
          return <Tr key={"row" + rowIndex} rowIndex={rowIndex} />;
        })}
    </table>
  );
});

export default Table;
