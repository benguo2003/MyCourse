import React from "react"
import { Link } from "react-router-dom"
import './style.css'

export default function (props) {
  const classes = [
    {name: "GEOG 5", location: "Franz Hall 1178", section: "1", time: "12-1:50", days: "MW", units: 4},
    {name: "GEOG 7", location: "Haines Hall 39",section: "1", time: "10-11:50", days: "TR",units: 4},
    {name: "MATH 32A", location: "Kaplan Hall A51", section: "1", time: "8-8:50", days: "MWF", units: 4},
  ];
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
            <li key = {data.name}>
              <p><b>Class Name: </b> {data.name}</p>
              <p><b>Section: </b>Lec {data.section}</p>
              <p><b>Location: </b>{data.location}</p>
              <p><b>Time: </b>{data.time}</p>
              <p><b>Days: </b>{data.days}</p>
              <p><b>Units: </b>{data.units}</p>
            </li>
          ))}
        </ul>
        <br></br>
        
        {/* <SubjectSelect /> */}
        <br></br>
        
    </div>
  )
}
