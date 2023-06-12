import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Td from "./Td";

const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[rowIndex].map((v, columnIndex) => {
        return (
          <Td
            key={"column" + columnIndex}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        );
      })}
    </tr>
  );
};

export default Tr;
