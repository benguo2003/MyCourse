import React, { useState, useEffect } from "react";
import "./Home.css";
import * as APIUser from "./api/users";
import SubjectSelect from './components/display';
import { Link } from "react-router-dom";
import { useLocation, useNavigate} from 'react-router-dom';
import { BASE_URL } from "./util/constants";

export default function (props) {
  let navigate = useNavigate();
  
  const logout = () => {
    APIUser.deleteCurUser();
  }

  const goToHome = () =>{
    navigate('/home', {state: {email: state.email,
                      userName: state.userName}});
  }

  const goToClass = () =>{
    navigate('/classes', {state: {email: state.email,
                          userName: state.userName}});
  }

  const { state } = useLocation();

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="">
             Hello, <b style={{ color: 'lightblue'}}> {state.userName}.</b>
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
                <button onClick={() => goToHome()}>Home</button>
              </li>
              <li class="nav-item">
              <button onClick={() => goToClass()}>Classes</button>
              </li>
            </ul>
            <span class="navbar-text">
              <Link to="/auth" class="nav-link" href="#" onClick={() => logout()}>
                Log Out
              </Link>
            </span>
          </div>
        </nav>
        <div className="title">MyCourse</div>
        <br></br>
        <SubjectSelect email={state.email} userName={state.userName} />
        <br></br>
      </div>
    );
}