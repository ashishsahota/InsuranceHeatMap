import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HeatMap from "./components/heat-map.page";
import Form from "./components/form.page";
import Analytics from "./components/analytics.page";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
              </a>
              <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
                  <div>
                    <Link to="/" className="nav-link">Home</Link>
                  </div>
                  <div>
                    <Link to="/form" className="nav-link">Maps</Link>
                  </div>
                  <div>
                    <Link to="/analytics/:id" className="nav-link">Analytics</Link>
                  </div>
                  <div>
                    <Link to="/analytics/:id" className="nav-link">Contact Us</Link>
                  </div>
            </nav>
            <br/>
            <Route path="/" exact component={HeatMap} />
            <Route path="/form" component={Form} />
            <Route path="/analytics/:id" component={Analytics} />
          </div>
        </Router>
    );
  }
}

export default App;
