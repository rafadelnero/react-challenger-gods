import React, { Component } from "react";
import GodDataService from "../services/god.service";

export default class AddGod extends Component {

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePower = this.onChangePower.bind(this);
    this.onChangeGreek = this.onChangeGreek.bind(this);
    this.saveGod = this.saveGod.bind(this);
    this.newGod = this.newGod.bind(this);

    this.state = {
      id: "",
      name: "",
      power: "",
      greek: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePower(e) {
    this.setState({
      power: e.target.value
    });
  }

  onChangeGreek(e) {
    this.setState({
      greek: e.target.value
    });
  }

  saveGod() {
    let data = {
      name: this.state.name,
      power: this.state.power,
      greek: this.state.greek
    };
    GodDataService.create(data)
      .then(response => {
        this.setState({
          _id: response.data.id,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newGod() {
    this.setState({
      id: null,
      name: "",
      power: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newGod}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
            <label htmlFor="power">Power</label>
            <input
                type="text"
                className="form-control"
                id="power"
                required
                value={this.state.power}
                onChange={this.onChangePower}
                name="power"
            />
          </div>

            <div className="form-group">
              <label htmlFor="greek">Greek</label>
              <input
                  type="text"
                  className="form-control"
                  id="greek"
                  required
                  value={this.state.greek}
                  onChange={this.onChangeGreek}
                  name="greek"
              />
            </div>

            <button onClick={this.saveGod} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
