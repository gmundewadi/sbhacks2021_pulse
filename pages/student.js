import React from "react";
import { useState, useEffect } from "react";
import { fetch } from "../utils/fetch";
import useSWR from "swr";
import Router from "next/router";

import Slider from "../components/student_components/Slider";
import StudentMenu from "../components/student_components/StudentMenu";
import MyPulse from "../components/student_components/MyPulse";
import Poll from "../components/student_components/Poll";

import "../styles/App.css";

var guid = CreateGuid(),
  username = "",
  roomID = "";

// generate guid
if (typeof window !== "undefined") {
  if (localStorage.getItem("guid") == null) {
    guid = CreateGuid();
    localStorage.setItem("guid", guid);
  } else {
    guid = localStorage.getItem("guid");
  }
}

var pollResponse = 0;

export default function Student(props) {
  const [menu_items, setMenuItems] = useState(["My Pulse", "Poll"]);
  const [active_page, setActivePage] = useState("My Pulse");
  const [myPulse, setMyPulse] = useState(50);
  const [myPercentage, setMyPercentage] = useState(50);
  const [pollOptions, setPollOptions] = useState([]);
  const [selectedOption, selectOption] = useState(-1);

  if (typeof window !== "undefined") {
    const { data, mutate } = useSWR(
      "/api/collection?id=" + localStorage.getItem("roomID"),
      fetch,
      {
        // see example repo for explination about booleans
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 4000
      }
    );

    // does this collection exisit?. If it doesn't, data is false
    // and the user is kicked out of the room
    useEffect(() => {
      if (data && !data.result) {
        Router.push({
          pathname: "/"
        });
      }
      // now we want to see if we should update the SDK
    }, [data]);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get username (prompt user for name if not stored)
      username = localStorage.getItem("username");
      while (username === null || username === "null" || username == "") {
        username = prompt("What is your name?");
        localStorage.setItem("username", username);
      }

      // Get room ID
      roomID = localStorage.getItem("roomID");
    }
  }, []);

  useEffect(async () => {
    await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // the body of this song is built from state
      body: JSON.stringify({
        guid: guid,
        username: username,
        pulse: myPercentage,
        poll_response: selectedOption,
        collection: roomID
      })
    });
  }, [myPercentage, selectedOption]);

  useEffect(() => {
    const t = setInterval(() => {
      // Get data from server
      fetch(`/api/all?id=${roomID}`, { method: "GET" }).then(d => {
        for (let datum of d.result)
          if (datum.options) setPollOptions(datum.options);
      });
    }, 5000);
    return () => clearInterval(t);
  }, [setPollOptions]);

  return (
    <div>
      {" "}
      <div className="App">
        <StudentMenu
          menu_items={menu_items}
          goToPage={page => setActivePage(page)}
          active_page={active_page}
          roomID={roomID}
        />
        <div className="main" style={{ marginLeft: 0, padding: 20 }}>
          {active_page === "My Pulse" && <MyPulse pulse={myPulse} />}
          {active_page === "Poll" && (
            <Poll
              options={pollOptions}
              selectOption={selectOption}
              selectedOption={selectedOption}
            />
          )}
        </div>

        <div className="pulse">
          {active_page === "My Pulse" && (
            <Slider
              setPulseOnScreen={setMyPulse}
              setPulseInDatabase={setMyPercentage}
            />
          )}{" "}
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

function sleep(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
