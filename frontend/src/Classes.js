import React from "react"
import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { BASE_URL } from "./util/constants";
import { useLocation, useNavigate } from "react-router-dom"

export default function() {
  const [classes, setClasses] = useState([]);
  const { state } = useLocation();

  let navigate = useNavigate();

  useEffect(() => {
    if(state !== null){
      const data = {userEmail: state.email};
      fetch(`${BASE_URL}/api/getUserCourses/${state.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        setClasses(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  })

  const parseTime = (start, end) => {
    if(start === "" && end === ""){
      return "N/A";
    }
    return start + " - " + end;
  }

  const goToHome = () =>{
    navigate('/home', {state: {email: state.email,
      userName: state.userName}});
  }

  const goToClass = () =>{
    navigate('/classes', {state: {email: state.email,
      userName: state.userName}});
  }

  if(state !== null){
    return (
      <div class = "wholeclassespage">
          <nav class="navbar navbar-expand-lg navbar-custom">
          <a class="navbar-brand" href="" style={{ color: 'white'}}>
             Hello, <b style={{ color: 'lightblue'}}> {state.userName}. </b>
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
                <button class = "navbarbutton" onClick={() => goToHome()}>Home</button>
              </li>
              <li class="nav-item active">
              <button class = "navbarbutton" onClick={() => goToClass()}>Classes</button>
              </li>
              </ul>
              <span class="navbar-text">
                <Link to="/auth" class="nav-link" href="#" style={{ color: 'white'}}>
                  Log Out
                </Link>
              </span>
            </div>
          </nav>
          <div className="title">MyCourse</div>
          <div class = "nobullets">
            {classes.map((data, i) => (
              <li key = {data.classSecID}>
                <h1 className = "header">{data.selectedSubject + " " + data.selectedCourse}</h1>
                <div class = "row">
                  <div class = "col-sm" wProp = "col" >
                    <div class = "classescolumn">
                      <h2><b>Seats Available: </b> </h2>
                      <h3>{data.classCapacityLeft <= 0 ? "Full" : data.classCapacityLeft }</h3>
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
                    <div class = "classescolumn">
                      <h2><b>Time: </b></h2>
                      <h3>{ parseTime(data.meetingStartTime, data.meetingStopTime)}</h3>
                      <br></br>
                      <br></br>
                      <h2><b>Days: </b></h2>
                      <h3>{data.meetingDaysofWeek}</h3>
                      <br></br>
                      <br></br>
                      <h2><b>Units: </b></h2>
                      <h3>{data.classUnits}</h3>
                    </div>
                  </div>
                  <div class = "col-sm" wProp = "col">
                      <div class = "classescolumn">
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
  return(
    <div>
      <p class="warning"> Unauthorized Access: No Login Detected </p>
      <Link to="/auth" class="nav-link" href="#" style={{ textAlign: 'center', fontSize: '30px', textDecoration: 'underline'}}>
        Sign In Here
      </Link>
    </div>
  )
}