import React from "react";

import "../styles/Pulse.css";

export default function Pulse(props) {
  return (
    <div className={"pulse"}>
      <table class="tg">
        <tbody>
          <tr>
            <td colspan="2" style={{ fontSize: 32, lineHeight: 2 }}>
              Class Average
            </td>
          </tr>
          <tr>
            <td colspan="2" style={{ fontSize: 150, lineHeight: 0.7 }}>
              78%
            </td>
          </tr>
          <tr style={{ fontSize: 25, lineHeight: 2 }}>
            <td>Low: 10%</td>
            <td>&nbsp;&nbsp;&nbsp; High: 95%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
