import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import swal from "sweetalert2";
import _ from "lodash";

class CreateProject extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (_.includes(this.state, "")) {
      return swal.fire({
        title: "can't create project",
        text: "you must complete form before submit data",
        icon: "error"
      });
    }

    this.props.createProject(this.state);
    return swal
      .fire({
        title: "success",
        text: "added new project",
        icon: "success",
        allowOutsideClick: false
      })
      .then(response => {
        if (response.value) this.props.history.push("/");
      });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin"></Redirect>;

    return (
      <div className="container ">
        <form onSubmit={this.handleSubmit} className="card card-border">
          <div className="card-content">
            <h5 className="grey-text text-darken-3">Create Project </h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="input-field">
              <button className="btn indigo lighten-1 z-depth-0">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
