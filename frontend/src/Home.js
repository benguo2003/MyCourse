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
    navigate('/auth')
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
<nav class="navbar navbar-expand-lg navbar-custom">
          <div class="navbarcenter">
            <div class="title">MyCourse |</div>
          </div>

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
          <a class="navbar-brand" href="" style={{ color: "white" }}>
              Hello, <b style={{ color: "lightblue" }}> {state.userName}. </b>
            </a>
            <ul class="navbar-nav ml-auto">
              
              <li class="nav-item">
                <button class="button-30" onClick={() => goToHome()}>
                  Home
                </button>
              </li>
              <li class="nav-item active">
                <button class="button-30" onClick={() => goToClass()}>
                  Classes
                </button>
              </li>
            </ul>

            <span class="navbar-text">
                <button class="button-30" onClick={() => logout()}>
                  Log Out
                </button>
            </span>
          </div>
        </nav>
        <div class="wholebackground">
        <br></br>
        <SubjectSelect email={state.email} userName={state.userName} />
        <br></br>
        </div>
      </div>
    );
}