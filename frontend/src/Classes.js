import React from "react"
import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { BASE_URL } from "./util/constants";

export default function (props) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then((response) => response.json())
      .then((res) => {
        setClasses(res)
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
  }, [])

  console.log(classes);

  // const classes = [
  //   {name: "GEOG 5", location: "Franz Hall 1178", section: "1", time: "12-1:50", days: "MW", units: 4},
  //   {name: "GEOG 7", location: "Haines Hall 39",section: "1", time: "10-11:50", days: "TR",units: 4},
  //   {name: "MATH 32A", location: "Kaplan Hall A51", section: "1", time: "8-8:50", days: "MWF", units: 4},
  // ];
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
              <li class="nav-item">
                <Link to="/home" class="nav-link" href="#">
                  Home
                </Link>
              </li>
              <li class="nav-item active">
                <Link to="/classes" class="nav-link" href="#">
                  Classes
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
            <span class="navbar-text">
              <Link to="/auth" class="nav-link" href="#">
                Log Out
              </Link>
            </span>
          </div>
        </nav>
        <div className="title">MyCourse</div>
        <ul>
          {classes.map((data) => (
            <li key = {data.classSecID}>
              <p><b>Class Name: </b> {data.selectedSubject + " " + data.selectedCourse}</p>
              <p><b>Section: </b>Lecture {data.selectedSection}</p>
              <p><b>Location: </b>{data.building}</p>
              <p><b>Time: </b>{data.meetingStartTime + " \- " + data.meetingStopTime}</p>
              <p><b>Days: </b>{data.meetingDaysofWeek}</p>
              <p><b>Units: </b>{data.classUnits}</p>
            </li>
          ))}
        </ul>
        <br></br>
        
        {/* <SubjectSelect /> */}
        <br></br>
        
    </div>
  )
}
