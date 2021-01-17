import React from "react";

import "../../styles/Poll.css";

export default function Poll(props) {
  console.log(props.options);
  return (
    <div className={"poll"}>
      <div className={"poll_options"}>
        {props.options.map((option, index) => (
          <div key={index} className={`poll_wrapper ${index === props.selectedOption ? 'selected_option' : ''}`} onClick={() => props.selectOption(index)}>
           <p style={{fontSize: 24}}>{option}</p>
          </div>
        ))}
      </div>
    </div >
  );
}
