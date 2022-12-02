import React from "react";
import "./Home.css";
import * as API from "./api/courses";
import * as APIUser from "./api/users";
import SubjectSelect from './components/display';
import { Link } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  logout() {
    APIUser.deleteCurUser();
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Hello USER
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/home" class="nav-link" href="#">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/classes" class="nav-link" href="#">
                  Classes
                </Link>
              </li>
            </ul>
            <span class="navbar-text">
              <Link to="/auth" class="nav-link" href="#" onClick={this.logout}>
                Log Out
              </Link>
            </span>
          </div>
        </nav>
        <div className="title">MyCourse</div>
        <br></br>
        <SubjectSelect />
        <br></br>
      </div>
    );
  }
}

export default Home;
