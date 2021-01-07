import React, { Component } from "react";
import GodDataService from "../services/god.service";
import { Link } from "react-router-dom";

export default class GodsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveGods = this.retrieveGods.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGod = this.setActiveGod.bind(this);
    this.removeAllGods = this.removeAllGods.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      gods: [],
      currentGod: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveGods();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveGods() {
    GodDataService.findAll().then(response => {
      console.log(response)
      this.setState({
        gods: response.data
      });
    });
  }

  refreshList() {
    this.retrieveGods();
    this.setState({
      currentGod: null,
      currentIndex: -1
    });
  }

  setActiveGod(god, index) {
    this.setState({
      currentGod: god,
      currentIndex: index
    });
  }

  removeAllGods() {
    GodDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentGod: null,
      currentIndex: -1
    });

    GodDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          gods: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, gods, currentGod, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}/>

            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Gods List</h4>

          <ul className="list-group">
            {gods && gods.map((god, index) => (
                <li className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveGod(god, index)}
                  key={index} >
                  {god.name} + {god.greek} + {god.id}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllGods}
          >
            Remove All
          </button>
        </div>

        <div className="col-md-6">
          {currentGod ? (
            <div>
              <h4>God</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentGod.name}
              </div>
              <div>
                <label>
                  <strong>Power:</strong>
                </label>{" "}
                {currentGod.power}
              </div>
              <div>
                <label>
                  <strong>Greek:</strong>
                </label>{" "}
                {currentGod.greek}
              </div>

              <Link
                to={"/gods/" +  currentGod.id}
                className="badge badge-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a God...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
