import React from "react";
import { useState, useEffect } from "react";
import Slider from "../components/student_components/Slider";
import Menu from "../components/Menu";
import MyPulse from "../components/student_components/MyPulse";
import Poll from "../components/student_components/Poll";

import "../styles/App.css";

var guid = CreateGuid();

export default function Student(props) {
  const [menu_items, setMenuItems] = useState(["My Pulse", "Poll"]);
  const [active_page, setActivePage] = useState("My Pulse");
  const [myPulse, setMyPulse] = useState(50);

  console.log("guid:" + guid);

  return (
    <div>
      {" "}
      <div className="App">
        <Menu
          menu_items={menu_items}
          goToPage={page => setActivePage(page)}
          active_page={active_page}
        />
        <div className="main">
          {active_page === "My Pulse" && <MyPulse pulse={myPulse} />}
          {active_page === "Poll" && <Poll />}
        </div>

        <div className="pulse">
          {active_page === "My Pulse" && <Slider setPulse={setMyPulse} />}{" "}
        </div>
      </div>
    </div>
  );
}

function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}
