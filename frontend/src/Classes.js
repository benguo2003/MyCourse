import React from "react"
import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { BASE_URL } from "./util/constants";

class ClassInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: [],
      classSectionBuildingCode: [],
      curBuilding: ""
    }
    // this.determineArea = this.determineArea.bind(this);
  }

  componentDidMount(){
    fetch(`${BASE_URL}/api/courses`)
      .then((response) => response.json())
      .then((res) => {
        const classes = res;
        this.setState({classes});
      })
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
            {this.state.classes.map((data, i) => (
              <li key = {data.classSecID}>
                <p><b>Class Name: </b> {data.selectedSubject + " " + data.selectedCourse}</p>
                <p><b>Section: </b>Lecture {data.selectedSection}</p>
                <p><b>Location: </b>{data.buildingDisp}</p>
                <p><b>Time: </b>{data.meetingStartTime + " \- " + data.meetingStopTime}</p>
                <p><b>Days: </b>{data.meetingDaysofWeek}</p>
                <p><b>Units: </b>{data.classUnits}</p>
                <p> <img src={require(`../src/Assets/${data.gridVal}.png`)} /> 
                </p>
              </li>
            ))}
          </ul>
          <br></br><br></br>
          
      </div>
    )
  }
}

export default ClassInfo;
