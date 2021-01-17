import React from "react";
import { fetch } from "../utils/fetch";
import Router from "next/router";

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
      menu_items: ["Pulse", "Poll", "Group", "Close Room"],
      active_page: "Pulse",
      options: ["Option A", "Option B", "Option C", "Option D"],
      data: [
        { username: "Alice Abbott", pulse: "100", poll_response: "2" },
        { username: "Bob Blackmon", pulse: "30", poll_response: "2" },
        { username: "Charlie Chamberlain", pulse: "86", poll_response: "0" },
        { username: "David Davenport", pulse: "91", poll_response: "1" }
      ],
      graph_datapoints_x: [],
      graph_datapoints_y: [],
      collection: 0
    };
  }

  goToPage = async page => {
    this.setState({ active_page: page });
    if (page == "Close Room") {
      localStorage.clear("collection"); // clear the collection from the localstorage
      await fetch("/api/deleteCollection", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          collection: this.state.collection
        })
      });
      Router.push({
        pathname: "/"
      });
    }
  };

  getData = () => {
    // Get data from server
<<<<<<< HEAD
    fetch("/api/all?id=" + this.state.collection, { method: "GET" }).then(d => {
      this.setState({ data: d.result });
      let sum = 0,
        now = new Date();
      for (let d of this.state.data) sum += +d.pulse;
=======
    fetch("/api/all?id=ABC123", { method: "GET" }).then(d => {
      var result = [];
      for (let datum of d.result)
        if (!datum.options)
          result.push(datum);

      this.setState({ data: result });
      let sum = 0, now = new Date();
      for (let d of this.state.data)
        sum += +d.pulse;
>>>>>>> 328b2c217188e4484a6762563d074ebdae476518
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

  async componentDidMount() {
    var roomKey = 0;
    if (typeof window !== "undefined") {
      if (localStorage.getItem("collection") == null) {
        // generate new room key
        const min = 100000;
        const max = 999999;
        roomKey = Math.floor(Math.random() * (max - min + 1) + min);
        // generate a new room
        await fetch("/api/makeRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: roomKey
          })
        });
        localStorage.setItem("collection", roomKey);
      } else {
        roomKey = localStorage.getItem("collection");
      }
    }
    this.setState({ collection: roomKey });

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
          collection={this.state.collection}
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
