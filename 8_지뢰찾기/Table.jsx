import React, { useContext, memo } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

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
