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
            gridVal: "",
            userEmail: "",
            buildingDisp: "",
            classSectionNumber: "",
            classCapacityLeft: "",
            userName: "",
            Courses: [],
            newCourses: [],
            inDatabaseCourses: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.addClass = this.addClass.bind(this);
        this.generateDaysOfTheWeek = this.generateDaysOfTheWeek.bind(this);
        
    }

    componentDidMount() {
        this.setState({
            userName: this.props.userName
        });
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

        const data = {userEmail: this.props.email};
        fetch(`${BASE_URL}/api/getUserCourses/${this.props.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
            params: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                Courses: data
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    handleAdd = () => {
        API.createCourse(
            this.state.selectedCourseDisp,
            this.state.selectedSubjectDisp,
            this.state.selectedSection,
            this.state.classSecID,
            this.state.gradeType,
            this.state.classUnits,
            this.state.meetingDaysofWeek,
            this.state.meetingStartTime,
            this.state.meetingStopTime,
            this.state.building,
            this.state.buildingRoomCode,
            this.state.gridVal,
            this.state.buildingDisp,
            this.state.userEmail,
            this.state.classCapacityLeft
        );
    };

    deleteClass = (ID) => {
        API.deleteCourse(ID);
        window.location.reload();
    }
    
    addClass = (ID, currentsection) => {
        const data = {userEmail: this.state.userEmail};
        fetch(`${BASE_URL}/api/getUserCourses/${this.props.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
            params: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((res) => {
            const inDatabaseCourses = res;
            this.setState({
                inDatabaseCourses
            },
            function() {
                for (var i = 0; i < this.state.inDatabaseCourses.length; i += 1) {
                    if( this.state.inDatabaseCourses[i].classSecID == ID && this.state.inDatabaseCourses[i].classSectionNumber == currentsection){
                        return;
                    }
                }
                this.handleAdd();
                this.setState({newCourses: []});
                window.location.reload();
            }
            );
        })
        .catch((error) => {
          console.error(`Could not get products: ${error}`);
        }); 
    }

    handleChange = (event) => {
      this.setState({ 
        selectedSubject: event.target.value,
        courses: [],
        sections: [],
        //selectedCourse: "",
        //selectedSection: ""
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
            //selectedSection: ""
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
                classes_url = `https://api.ucla.edu/sis/classsections/${this.selTerm}/${this.state.selectedSubject}/${this.state.selectedCourse}/${this.state.selectedSection}/classsectiondetail/v1`;
                fetch(`${classes_url}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${TOKEN}`,
                            'Content-Type': 'application/json',
                            }})   
                    .then((response) => response.json())
                    .then((res) => {
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
            meetingDaysofWeek: this.generateDaysOfTheWeek(this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingDaysofWeekCode),
            meetingStartTime: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingStartTime,
            meetingStopTime: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionMeetingStopTime,
            building: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionBuildingCode,
            buildingRoomCode: this.state.fullClassDetail.classSectionMeetingCollection[0].classSectionBuildingRoomCode,
            classSectionNumber: this.state.fullClassDetail.classSectionNumber,
            classCapacityLeft: parseInt(this.state.fullClassDetail.classSectionEnrollmentCapacityNumber,10) - parseInt(this.state.fullClassDetail.classSectionEnrollmentTotal,10)
        },
        function() {
            console.log("MeetingStartTime: " + this.state.meetingStartTime + ", MeetingStopTime: " + this.state.meetingStopTime)
            const data = {classSectionBuildingCode: this.state.building};
            fetch(`${BASE_URL}/api/getBuilding/${this.state.building}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
              params: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    gridVal: data.gridVal,
                    buildingDisp: data.building
                },
                function () {
                    console.log(this.state.gridVal);
                })
            })
            .catch((error) => {
              console.error('Error:', error);
            });
            this.setState({
                newCourses: [
                    {
                        id: this.state.classSecID,
                        name: this.state.selectedSubjectDisp + " " + this.state.selectedCourseDisp,
                        section: this.state.selectedSection,
                        time: this.parseTime(this.state.meetingStartTime, this.state.meetingStopTime),
                        meetingdays: this.state.meetingDaysofWeek
                    },
                ],
                userEmail: this.props.email,
            })
        }
        );
    };

    generateDaysOfTheWeek = (daystring) => {
        if(daystring === "UNSCHED"){
            return "N/A";
        }
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

    parseTime = (start, end) => {
        if (start === "" || end === "")
        {
            return "N/A";
        }

        return start + " - " + end;
      }

    render() {
        const classes = this.state.Courses.map((data) => (
            
            <div className="classdisplay">
              <h3 className = "displayclassinfo">Course: {data.selectedSubject + " " + data.selectedCourse}</h3>
              <p className = "displayclassinfo" > Section: {data.selectedSection}</p>
              <p className = "displayclassinfo"> Time: {this.parseTime(data.meetingStartTime, data.meetingStopTime)} </p>
              <p className = "displayclassinfo"> Meeting Days: {data.meetingDaysofWeek}</p>

              <button
                className="classbutton"
                type="button"
                onClick={() => this.deleteClass(data.classSecID)}
              >
                Drop
              </button>
              <hr className = "striped-border"></hr>

            </div>
          ))
        
          const newClasses = this.state.newCourses.map((data) => (
            <div className="classdisplay">
              <h3 className = "displayclassinfo"> Course: {data.name}</h3>
              <p className = "displayclassinfo"> Section: {data.section}</p>
              <p className = "displayclassinfo"> Time: {data.time} </p>
              <p className = "displayclassinfo"> Meeting Days: {data.meetingdays}</p>

    
              <button
                className="classbutton"
                type="button"
                onClick={() => this.addClass(data.id, data.classSectionNumber)}
              >
                Add
              </button>
            </div>
          ))

        return (
        <div class="container">
        <div class = "pageraiseddisplay"  >
            <div class = "addpadding">
            <br></br>
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
                            return <MenuItem value={c.courseCatalogNumber + ":" + c.courseCatalogNumberDisplay} key={this.state.selectedSubject + toString(i)}>{c.subjectAreaCode + " " + c.courseCatalogNumberDisplay}</MenuItem>
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
                            return <MenuItem value={"00" + (i+1)} key={this.state.selectedSubject + this.state.selectedCourseDisp + toString(i)}>{"Lecture: 00" + (i+1)}</MenuItem>
                        })}
                    </Select>
                    </FormControl>
                </Box>
            </div>
            <div class="col-sm" align="center">
                <button class="button-27" role="button" onClick={() => this.handleSubmit()}>
                Submit
                </button>
            </div>
            </div>
            <Container>
                <br></br>
                <h3>Selected Class</h3>
                <div className="oneclass">
                    {newClasses}
                </div>
                <br></br>
                <h3>{this.state.userName}'s Added Classes</h3>
                <div className="classes">
                    <div>
                        {classes}
                    </div>
                </div>
                <br></br>
            </Container>
            </div>
        </div>
        </div>
        );
    }
}

export default SubjectSelect;