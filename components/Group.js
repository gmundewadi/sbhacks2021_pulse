import React from "react";

import "../styles/Group.css";

export default function Group(props) {
  return (
    <div className={"group"}>
      <ul>
        <li>Jane Doe | 32%</li>
        <li>John Doe | 50%</li>
      </ul>
    </div>
  );
}
