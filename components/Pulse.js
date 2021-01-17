import React, { useEffect } from "react";

import "../styles/Pulse.css";
import PulseLine from "./PulseLine";

export default function Pulse(props) {
  return (
    <div className={"pulse"}>
      <table className={"pulse_table"}>
        <tbody>
          <tr>
            <td colSpan="2" style={{ fontSize: 32, lineHeight: 2 }}>
              Current Average Pulse
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ fontSize: 150, lineHeight: 0.9 }}>
              {~~props.data_y[props.data_y.length - 1]}%
            </td>
          </tr>
          <tr style={{ fontSize: 25, lineHeight: 2 }}>
            <td>Low: {arrMin(props.data, "pulse")}%</td>
            <td>&nbsp;&nbsp;&nbsp; High: {arrMax(props.data, "pulse")}%</td>
          </tr>
        </tbody>
      </table>
      <div>
        <PulseLine data_x={props.data_x} data_y={props.data_y} />
      </div>
    </div>
  );
}

function arrMin(arr, attr) {
<<<<<<< HEAD
  //console.log(arr);
  let m = Number.POSITIVE_INFINITY;
  for (let x of arr) if (+x[attr] < m) m = +x[attr];
  return m;
=======
    let m = Number.POSITIVE_INFINITY;
    for (let x of arr)
        if (+x[attr] < m) m = +x[attr];
    return m;
>>>>>>> 6805e8bdb51f9c0e8e4ca78d7c755a0a5d97ee8d
}

function arrMax(arr, attr) {
  let m = Number.NEGATIVE_INFINITY;
  for (let x of arr) if (+x[attr] > m) m = +x[attr];
  return m;
}
