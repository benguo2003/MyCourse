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
//import { stripBasename } from '@remix-run/router';

class SubjectSelect extends React.Component {
    constructor(props) {
        super(props)
        this.iter = 0;
        this.TOKEN = TOKEN;
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
            lengthOfClassNum: 0,
            classSecID: "",
            gradeType: "",
            classUnits: "",
            meetingDaysofWeek: "",
            meetingStartTime: "",
            meetingStopTime: "",
            building: "",
            buildingRoomCode: "",
            Courses: [],
            newCourses: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.getClassDetails = this.getClassDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.addClass = this.addClass.bind(this);
        this.generateDaysOfTheWeek = this.generateDaysOfTheWeek.bind(this);
        
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
        this.state.Courses.push(this.state.newCourses[0]);
        this.setState({newCourses: []});
    }

    handleChange = (event) => {
      this.setState({ 
        selectedSubject: event.target.value
      },
      function() {
        var classes_url = `https://api.ucla.edu/sis/classes/${this.selTerm}/v1?subjectAreaCode=${this.state.selectedSubject}&PageSize=0`
        fetch(`${classes_url}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.TOKEN}`,
                    'Content-Type': 'application/json',
                    }})   
            .then((response) => response.json())
            .then((res) => {
            this.setState({
                courses: res.classes
            });
            })
            .catch((error) => {
            console.error(`Could not get products: ${error}`);
            });
        }
      );
    };

    handleChange1 = (event) => {
        const disp_formatted = event.target.value;
        const tempval =typeof disp_formatted==="string" ?disp_formatted.split(':')[0]:""
        const disp =typeof disp_formatted==="string" ?disp_formatted.split(':')[1]:""
        console.log(tempval)
        console.log(disp)
        this.setState({ 
            selectedCourse: tempval,
            selectedCourseDisp: disp
            },
            function() {
                
                var classes_url = `https://api.ucla.edu/sis/classes/${this.selTerm}/v1?subjectAreaCode=${this.state.selectedSubject}&courseCatalogNumber=${this.state.selectedCourse}&PageSize=0`       
                fetch(`${classes_url}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${this.TOKEN}`,
                           'Content-Type': 'application/json',
                        }})
                .then((response) => response.json())
                .then((res) => {
                    this.setState({
                        section: res.classes[0].termSessionGroupCollection[0].classCollection,
                        lengthOfClassNum: res.classes[0].termSessionGroupCollection[0].classCollection.length
                    });
                })
                .catch((error) => {
                    console.error(`Could not get products: ${error}`);
                });
            }
        );
    };

    runForClassLength = (len) => {
        var elements = [];
        for(var j = 0; j < len; j++)
        {

            elements.push(<MenuItem value={this.state.section[j].classNumber} key={j}>{"Lecture: " + this.state.section[j].classNumber}</MenuItem>);
        }
        return elements;
    };

    handleChange2 = (event) => {
        this.setState({ 
            selectedSection: event.target.value
        },
            function () {
                var classes_url = `https://api.ucla.edu/sis/classsections/${this.selTerm}/${this.state.selectedSubject}/${this.state.selectedCourse}/${this.state.selectedSection}/classsectiondetail/v1`;
                fetch(`${classes_url}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${this.TOKEN}`,
                            'Content-Type': 'application/json',
                            }})   
                    .then((response) => response.json())
                    .then((res) => {
                    this.setState({
                        fullClassDetail: res.classSectionDetail
                    },
                    function () {
                        this.getClassDetails();
                    }
                    );                    
                    })
                    .catch((error) => {
                    console.error(`Could not get products: ${error}`);
                    });
            }
        );
    };

    getClassDetails = () => {
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
        });
    };

    handleSubmit = () => {
        this.setState({
            newCourses: [
                {
                    id: new Date(),
                    name: this.state.selectedSubjectDisp + " " + this.state.selectedCourseDisp,
                    section: this.state.selectedSection,
                    time: this.state.meetingStartTime + " \- " + this.state.meetingStopTime,
                    meetingdays: this.state.meetingDaysofWeek
                }
            ]
        })
    }

    generateDaysOfTheWeek = (daystring) => {
        let days = [];
        let returnstring = "";
        if(daystring.includes("M")){
            days.push("Monday");
        }
        if(daystring.includes("T")){
            days.push("Tuesday");
        }
        if(daystring.includes("W")){
            days.push("Wednesday");
        }
        if(daystring.includes("R")){
            days.push("Thursday");
        }
        if(daystring.includes("F")){
            days.push("Friday");
        }
        
        if(days.length === 1){
            return days[0];
        }
        else if(days.length === 2){
            returnstring = days[0] + " and " + days[1];
            return returnstring;
        }
        else{
            returnstring = ""
            for (var i = 0; i < days.length; i++) {
                if(i === days.length - 1){
                    returnstring += "and " + days[i];
                }
                else{
                    returnstring += days[i] + ", ";
                }
            }
            return returnstring;
        }
    }


    render() {
        const classes = this.state.Courses.map((data) => (
            <div className="classdisplay">
              <h3>Course: {data.name}</h3>
              <p>Section: {data.section}</p>
              <p>Time: {data.time}</p>
              <p>Meeting Days: {this.generateDaysOfTheWeek(data.meetingdays)}</p>

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
              <p>Meeting Days: {this.generateDaysOfTheWeek(data.meetingdays)}</p>

    
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
                            return <MenuItem value={c.courseCatalogNumber + ":" + c.courseCatalogNumberDisplay} key={i}>{c.subjectAreaCode + " " + c.courseCatalogNumberDisplay}</MenuItem>
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
                        {this.runForClassLength(this.state.lengthOfClassNum)}
                    </Select>
                    </FormControl>
                </Box>
            </div>
            <div class="col-sm" align="center">
                <button class="button-51" role="button" onClick={() => this.handleSubmit()}>
                Submit
                </button>
            </div>
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
            <br></br>
            </Container>
        </div>
        );
    }
}

export default SubjectSelect;