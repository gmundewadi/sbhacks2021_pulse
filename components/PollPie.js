import React from "react";
import { Pie } from "react-chartjs-2";

function calculateResults(data, len) {
  var result = [];
  result.length = len;
  result.fill(0);

  for (let d of data) if (+d.poll_response > -1) result[+d.poll_response]++;

<<<<<<< HEAD
  // console.log(data);
  // console.log(len);
  // console.log(result);

  return result;
=======
    return result;
>>>>>>> 6805e8bdb51f9c0e8e4ca78d7c755a0a5d97ee8d
}

function generateColors(len) {
  var result = [];

  for (let i = 0; i < len; i++)
    result.push("#" + (((1 << 24) * Math.random()) | 0).toString(16));

  return result;
}

export default class PollPie extends React.Component {
  render() {
    const colors = [
      "#46b7f8",
      "#f98594",
      "#f9bf94",
      "#eed67b",
      "#83f4b8",
      "#839df5",
      "#6984f0",
      "#ee91cc",
      "#eeee9c",
      "#46fd9d",
      "#7689fc",
      "#fd82c9"
    ];
    const data = {
      labels: this.props.options,
      datasets: [
        {
          data: calculateResults(this.props.data, this.props.options.length),
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };

    return (
      <div className={"pollPie"}>
        <h2>Poll Results</h2>
        <Pie ref="pollpie" data={data} width={400} height={400} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.pollpie.chartInstance.data;
  }
}
