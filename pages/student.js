import React from "react";
import { useState, useEffect } from "react";
import { fetch } from "../utils/fetch";

import Slider from "../components/student_components/Slider";
import Menu from "../components/Menu";
import MyPulse from "../components/student_components/MyPulse";
import Poll from "../components/student_components/Poll";

import "../styles/App.css";

var guid = CreateGuid();
var username = "Joe Gaucho";
var pollResponse = 0;

export default function Student(props) {
  const [menu_items, setMenuItems] = useState(["My Pulse", "Poll"]);
  const [active_page, setActivePage] = useState("My Pulse");
  const [myPulse, setMyPulse] = useState(50);

  useEffect(async () => {
    console.log("guid: " + guid);
    console.log("username: " + username);
    console.log("myPulse: " + myPulse);
    console.log("poll_response: " + myPulse);

    await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // the body of this song is built from state
      body: JSON.stringify({
        guid: guid,
        username: username, // HARD-CODED
        pulse: myPulse,
        poll_response: pollResponse, // HARD-CODED
        collection: "ABC123" // HARD-CODED
      })
    });
  }, [myPulse]);

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
