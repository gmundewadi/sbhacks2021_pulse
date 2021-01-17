import React from "react";
import { fetch } from "../utils/fetch";

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
        { username: "Alice Abbott", pulse: "100", poll_response: "2" },
        { username: "Bob Blackmon", pulse: "30", poll_response: "2" },
        { username: "Charlie Chamberlain", pulse: "86", poll_response: "0" },
        { username: "David Davenport", pulse: "91", poll_response: "1" }
      ],
      // graph_datapoints_x: [1610841720585, 1610841721585, 1610841722585, 1610841723585, 1610841725585, 1610841820585],
      // graph_datapoints_y: [98, 95, 20, 30, 60, 65]
      graph_datapoints_x: [],
      graph_datapoints_y: []
    };
  }

  goToPage = page => {
    this.setState({ active_page: page });
  };

  getData = () => {
    // Get data from server
    fetch("/api/all?id=ABC123", { method: "GET" }).then(d => {
      var result = [];
      for (let datum of d.result)
        if (!datum.options)
          result.push(datum);

      this.setState({ data: result });
      let sum = 0, now = new Date();
      for (let d of this.state.data)
        sum += +d.pulse;
      let avg = sum / this.state.data.length;

      let dpx = this.state.graph_datapoints_x, dpy = this.state.graph_datapoints_y;
      if (dpx.length > 20) dpx.shift();
      if (dpy.length > 20) dpy.shift();

      if (avg != dpy[dpy.length - 1]) {
        this.setState({
          graph_datapoints_x: [
            ...this.state.graph_datapoints_x,
            now.getTime()
          ]
        });

        this.setState({
          graph_datapoints_y: [
            ...this.state.graph_datapoints_y,
            avg
          ]
        });
      }
    });
  }

  changeOption = (index, value) => {
    const newOptions = this.state.options.slice();
    newOptions[index] = value;
    this.setState({ options: newOptions });
  };

  addOption = () => {
    this.setState({ options: [...this.state.options, "New Option"] });
  };

  deleteOption = index => {
    const newOptions = this.state.options.slice();
    newOptions.splice(index, 1);
    this.setState({ options: newOptions });
  };

  componentDidMount() {
    // Get data from server
    this.getData();
    var interval = setInterval(this.getData, 500);
    this.setState({ intervalID: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
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
          {this.state.active_page === "Poll" && (
            <Poll
              options={this.state.options}
              data={this.state.data}
              changeOption={this.changeOption}
              addOption={this.addOption}
              deleteOption={this.deleteOption}
            />
          )}
          {this.state.active_page === "Group" && (
            <Group data={this.state.data} options={this.state.options} />
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
