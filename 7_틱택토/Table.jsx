const React = require("react");
const { memo } = React;
const Tr = require("./Tr");
const { CLICK_CELL, SET_WINNER, SET_TURN } = require("./constant");

const Table = memo(({ tableData, dispatch }) => {
  // console.log(Array(tableData.length).fill()); // [undefined, undefined, undefined]

  // useEffect(() => {
  //   for (let i = 0; i < tableData.length; i++) {
  //     if (
  //       tableData[i][0] !== "" &&
  //       tableData[i][0] === tableData[i][1] &&
  //       tableData[i][1] === tableData[i][2]
  //     ) {
  //       dispatch({
  //         type: SET_WINNER,
  //         winner: tableData[i][0],
  //       });
  //       return;
  //     }
  //   }
  //   for (let i = 0; i < tableData.length; i++) {
  //     if (
  //       tableData[0][i] !== "" &&
  //       tableData[0][i] === tableData[1][i] &&
  //       tableData[1][i] === tableData[2][i]
  //     ) {
  //       dispatch({
  //         type: SET_WINNER,
  //         winner: tableData[0][i],
  //       });
  //       return;
  //     }
  //   }

  //   if (
  //     tableData[0][0] !== "" &&
  //     tableData[0][0] === tableData[1][1] &&
  //     tableData[1][1] === tableData[2][2]
  //   ) {
  //     dispatch({
  //       type: SET_WINNER,
  //       winner: tableData[0][0],
  //     });
  //   }
  //   if (
  //     tableData[2][0] !== "" &&
  //     tableData[2][0] === tableData[1][1] &&
  //     tableData[1][1] === tableData[2][0]
  //   ) {
  //     dispatch({
  //       type: SET_WINNER,
  //       winner: tableData[2][0],
  //     });
  //   }
  // }, [tableData]);

  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
        ))}
    </table>
  );
});

module.exports = Table;
