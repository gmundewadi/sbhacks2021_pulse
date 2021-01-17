import ReactSlider from "react-slider";
import { useState } from "react";
import "../../styles/Slider.css";

export default function Slider(props) {
  return (
    <ReactSlider
      className="vertical-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      defaultValue={[50]}
      onChange={val => props.setPulse(val)}
      orientation="vertical"
      invert
      pearling
      minDistance={10}
    />
  );
}
