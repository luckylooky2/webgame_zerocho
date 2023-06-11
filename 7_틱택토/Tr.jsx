const React = require("react");
const { useState, useRef, memo } = React;
const Td = require("./Td");

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  // <tr>이 있어야 3*3 형태가 됨 => 없으면 1*9 형태
  // index를 활용하기 위해서는 map의 두 번째 인자인 index를 이용!
  return (
    <tr>
      {rowData.map((v, columnIndex) => (
        <Td
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          dispatch={dispatch}
          columnData={rowData[columnIndex]}
        />
      ))}
    </tr>
  );
});

module.exports = Tr;
