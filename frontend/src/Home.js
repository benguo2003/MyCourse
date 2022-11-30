import React from "react";
import "./Home.css";
import * as API from "./api/courses";
import SubjectSelect from './components/display';
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classID: 0,
      teacher: "",
      daysOfWeek: "",
      className: "",
      meetingStartTime: "",
      meetingStopTime: "",
      Courses: [
        {
          id: 0,
          name: "CS 31",
          section: "1",
          time: "4-5PM",
        },
        {
          id: 1,
          name: "CS 32",
          section: "2",
          time: "9-10AM",
        },
        {
          id: 2,
          name: "CS 33",
          section: "2",
          time: "9-10AM",
        },
      ],
      newCourses: [
          {
              id: 3,
              name: "CS 35L",
              section: "4",
              time: "2-4PM",
          },
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
  }

  deleteClass(ID) {
    //Delete from the database too
    const temp = this.state.Courses.filter(c => c.id !== ID);
    this.setState({Courses: temp});
  }

  addClass(ID) {
    const temp1 = this.state.newCourses.filter(c => c.id !== ID);
    var temp2 = 0;
    for (var i = 0; i < this.state.newCourses.length; i += 1) {
        if (this.state.newCourses[i].id == ID) {
            temp2 = this.state.newCourses[i];
        }
    }
    this.state.Courses.push(temp2);
    console.log(this.state.Courses);
    this.setState({newCourses: temp1});
  }

  handleChange(event) {
    this.setState({ teacher: event.target.value });
  }

  handleSubmit(event) {
    var x = API.getAllCourses();
    console.log(x);
    alert("A name was submitted: " + this.state.teacher);
    event.preventDefault();
  }

  render() {
    const classes = this.state.Courses.map((data) => (
        <div className="classdisplay">
          <h3>Course: {data.name}</h3>
          <p>Section: {data.section}</p>
          <p>Time: {data.time}</p>

          <button
            class="enrollbutton"
            type="button"
            onClick={() => this.deleteClass(data.id)}
          >
            Drop
          </button>
        </div>
      ))
    
      const newClasses = this.state.newCourses.map((data) => (
        <div className="classdisplay">
          <h3>Course: {data.name}</h3>
          <p>Section: {data.section}</p>
          <p>Time: {data.time}</p>

          <button
            class="enrollbutton"
            type="button"
            onClick={() => this.addClass(data.id)}
          >
            Add
          </button>
        </div>
      ))

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
              <li class="nav-item active">
                <Link to="/home" class="nav-link" href="#">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/classes" class="nav-link" href="#">
                  Classes
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
        <br></br>
        <SubjectSelect />
        <br></br>
        <Container>
          <h3>Current Class</h3>
          <div className="oneclass">
          {newClasses}
          </div>

          <h3>Added Classes</h3>

          <div className="classes">
            <div>
              {classes}
              </div>
          </div>
        </Container>
        <br></br>
      </div>
    );
  }
}

export default Home;
