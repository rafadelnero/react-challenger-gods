import React, { Component } from "react";
import GodDataService from "../services/god.service";


export default class God extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePower = this.onChangePower.bind(this);
    this.onChangeGreek = this.onChangeGreek.bind(this);

    this.getGod = this.getGod.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateGod = this.updateGod.bind(this);
    this.deleteGod = this.deleteGod.bind(this);

    this.state = {
      currentGod: {
        id: null,
        name: "",
        power: "",
        greek: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getGod(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentGod: {
          ...prevState.currentGod,
          name: name
        }
      };
    });
  }

  onChangePower(e) {
    const power = e.target.value;
    
    this.setState(prevState => ({
      currentGod: {
        ...prevState.currentGod,
        power: power
      }
    }));
  }

  onChangeGreek(e) {
    const greek = e.target.value;

    this.setState(prevState => ({
      currentGod: {
        ...prevState.currentGod,
        greek: greek
      }
    }));
  }

  getGod(id) {
    GodDataService.get(id)
      .then(response => {
        this.setState({
          currentGod: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    let data = {
      id: this.state.currentGod.id,
      name: this.state.currentGod.name,
      power: this.state.currentGod.power,
      greek: this.state.currentGod.greek
    };

    GodDataService.update(this.state.currentGod.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentGod: {
            ...prevState.currentGod,
            submitted: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateGod() {
    GodDataService.update(
      this.state.currentGod.id,
      this.state.currentGod
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The God was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteGod() {
    GodDataService.delete(this.state.currentGod.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/gods')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentGod } = this.state;

    return (
      <div>
        {currentGod ? (
          <div className="edit-form">
            <h4>God</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentGod.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="power">Power</label>
                <input
                  type="text"
                  className="form-control"
                  id="power"
                  value={currentGod.power}
                  onChange={this.onChangePower}
                />
              </div>
              <div className="form-group">
                <label htmlFor="greek">Greek</label>
                <input
                    type="text"
                    className="form-control"
                    id="greek"
                    value={currentGod.greek}
                    onChange={this.onChangeGreek}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentGod.greek ? "Greek" : "Not Greek"}
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteGod}>
              Delete
            </button>

            <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateGod}>
              Update
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a God...</p>
          </div>
        )}
      </div>
    );
  }
}
