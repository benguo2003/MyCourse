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
    fetch(`${BASE_URL}/api/getCurUsers`)
      .then((response) => response.json())
      .then((res) => {
        const data = {userEmail: res[0].email};
        fetch(`${BASE_URL}/api/getUserCourses/${res[0].email}`, {
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
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
    }, [])

  const parseTime = (start, end) => {
    if(start === "" && end === ""){
      return "N/A";
    }
    return start + " - " + end;
  }

  const goToHome = () =>{
    navigate('/home', {state: {email: state.email}});
  }

  const goToClass = () =>{
    navigate('/classes', {state: {email: state.email}});
  }

    return (
      <div class = "wholeclassespage">
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="">
              Hello {state.email}
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
                <button onClick={() => goToHome()}>Home</button>
              </li>
              <li class="nav-item active">
              <button onClick={() => goToClass()}>Classes</button>
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
            {classes.map((data, i) => (
              <li key = {data.classSecID}>
                <h1 className = "header">{data.selectedSubject + " " + data.selectedCourse}</h1>
                <div class = "row">
                  <div class = "col-sm" wProp = "col" >
                    <div class = "classescolumn">
                      <h2><b>Seats Available: </b> </h2>
                      <h3>{data.classCapacityLeft < 0 ? "Full" : data.classCapacityLeft }</h3>
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