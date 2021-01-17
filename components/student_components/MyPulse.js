import React from "react";

import "../../styles/Pulse.css";

export default function MyPulse(props) {
  return (
    <div className={"pulse"}>
      <table className="tg">
        <tbody>
          <tr>
            <td colSpan="2" style={{ fontSize: 32, lineHeight: 2 }}>
              My Pulse
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ fontSize: 150, lineHeight: 0.7 }}>
              {props.pulse}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
