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
  const [rating, setRating] = useState(0);
  const [classRating, setClassRating] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [testRating, setTestRating] = useState([2, 5, 3, 4, 1]);

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
          getRatings(data);
          setShowRating(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleRatingChange = (event, newVal) => {
    setRating(newVal);
  };

  const handleSubmit = (classSecID, userEmail) => {
    API.updateCourse(classSecID, userEmail, rating);
    window.location.reload();
  };
  
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

  const avg_review = (arr) => {
    var count = 0;
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].userRating != -1) {
        count += 1;
        total += arr[i].userRating;
      }
    }
    if(count === 0)
        {
          classRating.push(0)
        }
        else{
          classRating.push((total/count).toFixed(2))
        }
  };
  

  const getRatings = (classes) => {
    for(var i=0; i<classes.length; i++)
    {fetch(`${BASE_URL}/api/ratings`, {
        method: 'POST',
        body: JSON.stringify({
          selectedSubject: classes[i].selectedSubject,
          selectedCourse: classes[i].selectedCourse
        }),
        headers: {
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((res) => {
            avg_review(res);
        })
        .catch((error) => {
            console.error(`Could not get products: ${error}`);
        }); }
  };

  // const displayRating = (classes, i) => {
  //   getRatings(classes, i);
  //   return classRating[i];
  // }

  const logout = () => {
    navigate("/auth")
  }

  
  if (state !== null) {
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
        <div class="nobullets">
          {classes.map((data, i) => (
            <li key={data.classSecID}>
              <h1 className="header">
                {data.selectedSubject + " " + data.selectedCourse}
              </h1>
              <div class="row">
                <div class="col-sm" wProp="col">
                  <div class="classescolumn">
                    <h2>
                      <b>Seats Available: </b>{" "}
                    </h2>
                    <h3>
                      {data.classCapacityLeft <= 0
                        ? "Full"
                        : data.classCapacityLeft}
                    </h3>
                    <br></br>
                    <br></br>
                    <h2>
                      <b>Section: </b>
                    </h2>
                    <h3>Lecture {data.selectedSection}</h3>
                    <br></br>
                    <br></br>
                    <h2>
                      <b>Location: </b>
                    </h2>
                    <h3>{data.buildingDisp}</h3>
                  </div>
                </div>
                <div class="col-sm" wProp="col">
                  <div class="classescolumn">
                    <h2>
                      <b>Time: </b>
                    </h2>
                    <h3>
                      {parseTime(data.meetingStartTime, data.meetingStopTime)}
                    </h3>
                    <br></br>
                    <br></br>
                    <h2>
                      <b>Days: </b>
                    </h2>
                    <h3>{data.meetingDaysofWeek}</h3>
                    <br></br>
                    <br></br>
                    <h2>
                      <b>Units: </b>
                    </h2>
                    <h3>{data.classUnits}</h3>
                    <Box sx={{ width: 300 }}>
                        <Slider
                          aria-label="Rating"
                          value={rating}
                          onChange={handleRatingChange}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={1}
                          max={5}
                        />
                    </Box>
                    <button class="button-51" role="button" onClick={() => handleSubmit(data.classSecID, data.userEmail)}>
                      Submit
                    </button>
                    <Typography component="legend">Read only</Typography>
                    {console.log(parseInt(classRating[i], 10))}
                    <Rating name="read-only" value={showRating ? parseInt(classRating[i], 10) : 0} readOnly />

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
          ))}
        </div>

        <br></br>
        <br></br>
      </div>
    );
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