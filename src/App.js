import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddGod from "./components/add-god.component";
import God from "./components/god.component";
import GodsList from "./components/gods-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/gods"} className="navbar-brand">
            Challenger Service - God of War UI
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/gods"} className="nav-link">
                Gods
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/gods"]} component={GodsList} />
            <Route exact path="/add" component={AddGod} />
            <Route path="/gods/:id" component={God} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
