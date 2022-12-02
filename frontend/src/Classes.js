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

  parseTime(start, end){
    if(start === "" && end === ""){
      return "N/A";
    }
    return start + " - " + end;
    
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
      <div class = "wholeclassespage">
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
          <div class = "nobullets">
            {this.state.classes.map((data, i) => (
              <li key = {data.classSecID}>
                <h1 className = "header">{data.selectedSubject + " " + data.selectedCourse}</h1>
                <div class = "row">
                  <div class = "col-sm" wProp = "col" >
                    <div class = "firstcolumn">
                      <h2><b>Class Name: </b> </h2>
                      <h3>{data.selectedSubject + " " + data.selectedCourse}</h3>
                      <br></br>
                      <br></br>
                      <h2><b>Section: </b></h2>
                      <h3>Lecture {data.selectedSection}</h3>
                      <br></br>
                      <br></br>
                      <h2><b>Location: </b></h2>
                      <h3>{data.buildingDisp}</h3>
                    </div>
                  </div>
                  <div class = "col-sm" wProp = "col">
                    <h2><b>Time: </b></h2>
                    <h3>{ this.parseTime(data.meetingStartTime, data.meetingStopTime)}</h3>
                    <br></br>
                    <br></br>
                    <h2><b>Days: </b></h2>
                    <h3>{data.meetingDaysofWeek}</h3>
                    <br></br>
                    <br></br>
                    <h2><b>Units: </b></h2>
                    <h3>{data.classUnits}</h3>
                  </div>
                  <div class = "col-sm" wProp = "col">
                      <div class = "thirdcolumn">
                      <p> <img className = "fullclass" src={require(`../src/Assets/${data.gridVal}.png`)} /></p>
                      </div>
                  </div>
                </div>
                <hr className = "striped-border"></hr>
                <br></br>

              </li>
              
            ))}
            
          </div>
        
          <br></br><br></br>
          
      </div>
    )
  }
}

export default ClassInfo;
