import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "./util/constants";
import { useLocation, useNavigate } from "react-router-dom"
import * as API from "./api/courses"

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function () {
  const [classes, setClasses] = useState([]);
  const { state } = useLocation();

  let navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      const data = { userEmail: state.email };
      fetch(`${BASE_URL}/api/getUserCourses/${state.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setClasses(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        }); 
    }
  }, []);

  const parseTime = (start, end) => {
    if (start === "" && end === "") {
      return "N/A";
    }
    return start + " - " + end;
  };

  const goToHome = () => {
    navigate("/home", {
      state: { email: state.email, userName: state.userName },
    });
  };

  const goToClass = () => {
    navigate("/classes", {
      state: { email: state.email, userName: state.userName },
    });
  };

  const logout = () => {
    navigate("/auth")
  }

  if (state !== null && classes.length !== 0) {
    return (
      <div class="wholeclassespage wholebackground">
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
        <div class="nobullets">
          {classes.map((data, i) => (
            <div>
              <br></br>
            <div class = "container pageraiseddisplay addpadding">
            <li key={data.classSecID}>
              <h1 className="header">
                {data.selectedSubject + " " + data.selectedCourse}
              </h1>
              <hr className="striped-border"></hr>
              <br></br>
              <div class="row displayaclass">
                <div class="col-sm" wProp="col">
                  <div class="classescolumn">
                    <h3>
                      <b>Seats Available: </b>{" "}
                    </h3>
                    <h5>
                      {data.classCapacityLeft <= 0
                        ? "Full"
                        : data.classCapacityLeft}
                    </h5>
                    <br></br>
                    <br></br>
                    <h3>
                      <b>Section: </b>
                    </h3>
                    <h5>Lecture {data.selectedSection}</h5>
                    <br></br>
                    <br></br>
                    <h3>
                      <b>Location: </b>
                    </h3>
                    <h5>{data.buildingDisp}</h5>
                  </div>
                </div>
                <div class="col-sm" wProp="col">
                  <div class="classescolumn">
                    <h3>
                      <b>Time: </b>
                    </h3>
                    <h5>
                      {parseTime(data.meetingStartTime, data.meetingStopTime)}
                    </h5>
                    <br></br>
                    <br></br>
                    <h3>
                      <b>Days: </b>
                    </h3>
                    <h5>{data.meetingDaysofWeek}</h5>
                    <br></br>
                    <br></br>
                    <h3>
                      <b>Units: </b>
                    </h3>
                    <h5>{data.classUnits}</h5>
                  </div>
                </div>
                <div class="col-sm" wProp="col">
                  <div class="classescolumn">
                    <p>
                      {" "}
                      <img
                        className="fullclass"
                        src={require(`../src/Assets/${data.gridVal}.png`)}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <hr className="striped-border"></hr>
              <br></br>
            </li>
            </div>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
  else if(state !== null && classes.length === 0){
    {console.log("adscasdc")}
    return (
      <div class="wholeclassespage">
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
        <p class="addClassesSuggestion"> Nothing to see here - add some classes! </p>
      </div>
    )
  }
  return (
    <div>
      <p class="warning"> Unauthorized Access: No Login Detected </p>
      <Link
        to="/auth"
        class="nav-link"
        href="#"
        style={{
          textAlign: "center",
          fontSize: "30px",
          textDecoration: "underline",
        }}
      >
        Sign In Here
      </Link>
    </div>
  );
}