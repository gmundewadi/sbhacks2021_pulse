import React from "react";
import { useState } from "react";
import Slider from "../components/student_components/Slider";
import Menu from "../components/Menu";
import MyPulse from "../components/student_components/MyPulse";

import "../styles/App.css";

export default function Student(props) {
  const [menu_items, setMenuItems] = useState(["My Pulse", "Poll"]);
  const [active_page, setActivePage] = useState("My Pulse");
  const [myPulse, setMyPulse] = useState(50);

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
          <Slider setPulse={setMyPulse} />{" "}
        </div>
      </div>
    </div>
  );
}
