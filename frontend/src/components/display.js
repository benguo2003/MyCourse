import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {BASE_URL} from "../util/constants";

class SubjectSelect extends React.Component {
    constructor(props) {
        super(props)
        this.iter = 0;
        this.TOKEN = "C3296KxXi8PAbAkzpB2pAOs1wRoa";
        this.selTerm = '23W';
        this.state = {
            subjects: [],
            courses: [],
            sections: [],
            fullClassDetail: [],
            selectedSubject: "",
            selectedCourse: "",
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.getClassDetails = this.getClassDetails.bind(this);
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
        this.setState({ 
            selectedCourse: event.target.value
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
        const elements = []
        for(var j = 0; j < len; j++)
        {

            elements.push(<MenuItem value={this.state.section[j].classNumber} key={j}>{"Lecture: " + this.state.section[j].classNumber}</MenuItem>)
        }
        return elements
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

    render() {
        return (
        <div>
        <Box sx={{ maxWidth: 350 }}>
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
        <Box sx={{ maxWidth: 160 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select 
                defaultValue="" 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={this.handleChange1}>
                {this.state.courses.map((c, i) => {
                    return <MenuItem value={c.courseCatalogNumber} key={i}>{c.subjectAreaCode + " " + c.courseCatalogNumberDisplay}</MenuItem>
                })}
            </Select>
            </FormControl>
        </Box>
        <Box sx={{ maxWidth: 180 }}>
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
        );
    }
}

export default SubjectSelect;