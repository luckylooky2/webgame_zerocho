import React, { useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./MineSearch";

const Table = () => {
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
};

export default Table;
