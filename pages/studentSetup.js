import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetch } from "../utils/fetch";

import '../styles/index.css';

export default function studentSetup(props) {

  const [id, setId] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(async () => {
    if (id.length != 6) setValid(false);
    else {
      await fetch(`/api/collection?id=${id}`, { method: "GET" }).then(d => {
        setValid(d.result);
      });
    }
  }, [id])

  return (
    <div className={'index'}>
      {/* <header>Who are you?</header> */}
      {/* <Link href="/">
        <a>| Home | </a>
      </Link> */}

      <h2>Name:</h2>
      <input id="student_name_input"></input>
      <h2>Room ID:</h2>
      <input id="student_room_id_input" onChange={(e) => setId(e.target.value)}></input>


      {valid && <div className={'links'} onClick={saveData}>
        <Link href="/student" prefetch={false}>
          <a className="tab">Proceed</a>
        </Link>
      </div>}
    </div>
  );
}

function saveData() {
  localStorage.setItem("username", document.getElementById("student_name_input").value);
  localStorage.setItem("roomID", document.getElementById("student_room_id_input").value);
}