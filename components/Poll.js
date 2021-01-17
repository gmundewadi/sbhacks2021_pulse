import React, { useState, useEffect } from "react";
import PollPie from "./PollPie";
import { fetch } from "../utils/fetch";

import "../styles/Poll.css";

export default function Poll(props) {
  const [pollOpen, setPollOpen] = useState(false);

  useEffect(async () => {
    if (pollOpen) {
      await fetch("/api/addPoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // the body of this song is built from state
        body: JSON.stringify({
          options: props.options,
          collection: "ABC123" // HARD-CODED
        })
      });
    }
  }, [pollOpen]);

  return (
    <div className={"poll"}>
      {!pollOpen && (
        <div className={"poll_options"}>
          {props.options.map((option, index) => (
            <div key={index} className="poll_wrapper">
              <input
                value={option}
                index={index}
                className={"poll_option"}
                onChange={e => props.changeOption(index, e.target.value)}
              ></input>
              <span
                className={"poll_delete"}
                onClick={() => props.deleteOption(index)}
              >
                X
              </span>
            </div>
          ))}
          <button className={"add_option"} onClick={props.addOption}>
            Add Option
          </button>
        </div>
      )}

      {!pollOpen && (
        <button className={"send_poll"} onClick={() => setPollOpen(true)}>
          Open Poll
        </button>
      )}

      {pollOpen && (
        <div>
          <PollPie data={props.data} options={props.options} />
          <button className={"send_poll"} onClick={() => setPollOpen(false)}>
            Close Poll
          </button>
        </div>
      )}
    </div>
  );
}
