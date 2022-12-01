import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from "react-bootstrap/Container";
import {BASE_URL} from "../util/constants";
import {TOKEN} from "../util/constants";

import * as API from "../api/courses";
import { stripBasename } from '@remix-run/router';

class SubjectSelect extends React.Component {
    constructor(props) {
        super(props)
        this.iter = 0;
        this.selTerm = '23W';
        this.state = {
            subjects: [],
            courses: [],
            sections: [],
            fullClassDetail: [],
            selectedSubject: "",
            selectedSubjectDisp: "",
            selectedCourse: "",
            selectedCourseDisp: "",
            selectedSection: "",
            classSecID: "",
            gradeType: "",
            classUnits: "",
            meetingDaysofWeek: "",
            meetingStartTime: "",
            meetingStopTime: "",
            building: "",
            buildingRoomCode: "",
            Courses: [],
            newCourses: [],
            isSubmitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.addClass = this.addClass.bind(this);
    }

    componentDidMount() {
        fetch(`${BASE_URL}/api/subjarea`)
        .then((response) => response.json())
        .then((res) => {
            const subjects = res;
            this.setState({
                subjects
            });
        })
        .catch((error) => {
          console.error(`Could not get products: ${error}`);
        }); 
    }

    handleAdd = () => {
        API.createCourse(
            this.state.selectedSubjectDisp,
            this.state.selectedCourseDisp,
            this.state.selectedSection,
            this.state.classSecID,
            this.state.gradeType,
            this.state.classUnits,
            this.state.meetingDaysofWeek,
            this.state.meetingStartTime,
            this.state.meetingStopTime,
            this.state.building,
            this.state.buildingRoomCode
        );
    };

    handleDelete = () => {
        API.deleteCourse(this.state.classSecID);
    };

    deleteClass = (ID) => {
        this.handleDelete();
        const temp = this.state.Courses.filter(c => c.id !== ID);
        this.setState({Courses: temp});
    }
    
    addClass = (ID) => {
        this.handleAdd();
        const temp1 = this.state.newCourses.filter(c => c.id !== ID);
        var temp2 = 0;
        for (var i = 0; i < this.state.newCourses.length; i += 1) {
            if (this.state.newCourses[i].id == ID) {
                temp2 = this.state.newCourses[i];
            }
        }
        this.state.Courses.push(temp2);
        this.setState({newCourses: temp1});
    }

    handleChange = (event) => {
      this.setState({ 
        selectedSubject: event.target.value,
        courses: [],
        sections: [],
        selectedCourse: "",
        selectedSection: ""
      },
      function() {
        var classes_url = `https://api.ucla.edu/sis/classes/${this.selTerm}/v1?subjectAreaCode=${this.state.selectedSubject}&PageSize=0`
        fetch(`${classes_url}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                    }})   
            .then((response) => response.json())
            .then((res) => {
            this.setState({
                courses: res.classes,
                isSubmitted: false
            });
            })
            .catch((error) => {
                console.error(`Could not get products: ${error}`);
            });
        }
      );
    };

    handleChange1 = (event) => {
        const disp = event.target.value;
        const urlCourse =typeof disp==="string" ?disp.split(':')[0]:""
        const disp_formatted =typeof disp==="string" ?disp.split(':')[1]:""
        this.setState({ 
            selectedCourse: urlCourse,
            selectedCourseDisp: disp_formatted,
            sections: [],
            selectedSection: ""
            },
            function() {
                var classes_url = `https://api.ucla.edu/sis/classes/${this.selTerm}/v1?subjectAreaCode=${this.state.selectedSubject}&courseCatalogNumber=${this.state.selectedCourse}&PageSize=0`       
                fetch(`${classes_url}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${TOKEN}`,
                           'Content-Type': 'application/json',
                        }})
                .then((response) => response.json())
                .then((res) => {
                    this.setState({
                        sections: res.classes[0].termSessionGroupCollection[0].classCollection
                    })
                })
                .catch((error) => {
                    console.error(`Could not get products: ${error}`);
                });
            }
        );
    };

    handleChange2 = (event) => {
        this.setState({ 
            selectedSection: event.target.value
        },
            function () {
                var classes_url = `https://api.ucla.edu/sis/classsections/${this.selTerm}/${this.state.selectedSubject}/${this.state.selectedCourse}/${this.state.selectedSection}/classsectiondetail/v1`;
                fetch(`${classes_url}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${TOKEN}`,
                            'Content-Type': 'application/json',
                            }})   
                    .then((response) => response.json())
                    .then((res) => {
                    console.log("i am here bro");
                    this.setState({
                        fullClassDetail: res.classSectionDetail
                    });                    
                })
                .catch((error) => {
                    console.error(`Could not get products: ${error}`);
                });
            }
        );
    };

    handleSubmit = () => {
        this.setState({ 
            selectedSubjectDisp: this.state.fullClassDetail.subjectAreaCode,
            classSecID: this.state.fullClassDetail.classSectionID,
            gradeType: this.state.fullClassDetail.classSectionGradeTypeCode,
            classUnits: this.state.fullClassDetail.classSectionUnitCollection[0].classSectionUnit,
            meetingDaysofWeek: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingDaysofWeekCode,
            meetingStartTime: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingStartTime,
            meetingStopTime: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingStopTime,
            building: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionBuildingCode,
            buildingRoomCode: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionBuildingRoomCode
        },
        function() {
            this.setState({
                newCourses: [
                    {
                        id: this.state.classSecID,
                        name: this.state.selectedSubjectDisp + " " + this.state.selectedCourseDisp,
                        section: this.state.selectedSection,
                        time: this.state.meetingStartTime + " \- " + this.state.meetingStopTime
                    },
                ],
                isSubmitted: true
            })
        }
        );
    };

    render() {
        const classes = this.state.Courses.map((data) => (
            <div className="classdisplay">
              <h3>Course: {data.name}</h3>
              <p>Section: {data.section}</p>
              <p>Time: {data.time}</p>
    
              <button
                className="enrollbutton"
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
                className="enrollbutton"
                type="button"
                onClick={() => this.addClass(data.id)}
              >
                Add
              </button>
            </div>
          ))

        return (
        <div class="row">
            <div class="col-sm" align="center">
                <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subject Area</InputLabel>
                    <Select 
                        defaultValue="" 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange}>
                        {this.state.subjects.map((c, i) => {
                            return <MenuItem value={c.abbrev} key={i}>{c.subjArea}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                </Box>
            </div>
            <div class="col-sm" align="center">
                <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                    <Select 
                        defaultValue="" 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange1}>
                        {this.state.courses.map((c, i) => {
                            return <MenuItem value={c.courseCatalogNumber + ":" + c.courseCatalogNumberDisplay} key={i}>{this.state.isSubmitted ? "Submitted" : c.subjectAreaCode + " " + c.courseCatalogNumberDisplay}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                </Box>
            </div>
            <div class="col-sm" align="center">
                <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Lecture Number</InputLabel>
                    <Select 
                        defaultValue="" 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleChange2}>
                        {this.state.sections.map((c, i) => {
                            return <MenuItem value={"00" + (i+1)} key={i}>{this.state.isSubmitted ? "Submitted" : "Lecture: 00" + (i+1)}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                </Box>
            </div>
            <div class="col-sm" align="center">
                <button class="button-51" role="button" onClick={() => this.handleSubmit()}>
                Submit
                </button>
            </div>
            <br></br>
            <Container>
            <br></br>
            <h3>Current Class</h3>
            <div className="oneclass">
            {newClasses}
            </div>
            <br></br>
            <h3>Added Classes</h3>

            <div className="classes">
                <div>
                {classes}
                </div>
            </div>
            </Container>
        </div>
        );
    }
}

export default SubjectSelect;