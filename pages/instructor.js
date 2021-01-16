import React from "react";

import "../styles/App.css";

import "../components/Menu";
import Menu from "../components/Menu";
import Pulse from "../components/Pulse";
import Poll from "../components/Poll";
import Group from "../components/Group";

export default class Instructor extends React.Component {
  constructor() {
    super();
    this.state = {
      menu_items: ["Pulse", "Poll", "Group"],
      active_page: "Pulse",
      options: ["Option A", "Option B", "Option C", "Option D"],
      data: [
        { username: "Alice", pulse: "100", poll_response: "2" },
        { username: "Bob", pulse: "30", poll_response: "2" },
        { username: "Charlie", pulse: "86", poll_response: "0" },
        { username: "David", pulse: "91", poll_response: "1" }
      ],
      graph_datapoints_x: [
        "2021-1-16 11:20:00",
        "2021-1-16 11:20:05",
        "2021-1-16 11:20:10",
        "2021-1-16 11:20:15",
        "2021-1-16 11:20:20",
        "2021-1-16 11:20:25",
        "2021-1-16 11:20:30"
      ],
      graph_datapoints_y: [98, 95, 20, 30, 60, 65]
    };
  }

  goToPage = page => {
    this.setState({ active_page: page });
  };

  getData = () => {
    // TODO: Talk to server, update data

    let sum = 0,
      now = new Date();
    for (let d of this.state.data) sum += +d.pulse;
    let avg = sum / this.state.data.length;

    this.setState({
      graph_datapoints_x: [...this.state.graph_datapoints_x, formatDate(now)]
    });

    this.setState({
      graph_datapoints_y: [...this.state.graph_datapoints_y, avg]
    });

    console.log(this.state.graph_datapoints_x);
    console.log(this.state.graph_datapoints_y);
  };

  componentDidMount() {
    // // Load plot script
    // const script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    // document.head.appendChild(script);

    // Get data from server
    this.getData();
    var interval = setInterval(this.getData, 5000);
    this.setState({ intervalID: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    console.log("active state: " + this.state.active_page);
    return (
      <div className="App">
        <Menu
          menu_items={this.state.menu_items}
          goToPage={this.goToPage}
          active_page={this.state.active_page}
        />
        <div className={"main"}>
          {this.state.active_page === "Pulse" && (
            <Pulse
              data_x={this.state.graph_datapoints_x}
              data_y={this.state.graph_datapoints_y}
              data={this.state.data}
            />
          )}
          {this.state.active_page === "Poll" && <Poll />}
          {this.state.active_page === "Group" && (
            <Group data={this.state.data} />
          )}
        </div>
      </div>
    );
  }
}

function formatDate(date) {
  let d = date.getDate(),
    mo = date.getMonth(),
    y = date.getFullYear(),
    h = date.getUTCHours(),
    m = date.getUTCMinutes(),
    s = date.getUTCSeconds();

  return `${y}-${mo}-${d} ${h}:${m}:${s}`;
}
