import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import * as API from './api/courses'
import BasicSelect from './components/filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Auth"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classID: 0,
          teacher: '',
          daysOfWeek: '',
          className: '',
          meetingStartTime: '',
          meetingStopTime: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({teacher: event.target.value});
      }
    
    handleSubmit(event) {
        var x = API.getAllCourses();
        console.log(x);
        alert('A name was submitted: ' + this.state.teacher);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<Navigate to="/auth" replace />} />
                </Routes>
                </BrowserRouter>
                <div className="title">
                    MyCourse
                </div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="3">
                            <BasicSelect />
                        </Col>
                        <Col xs lg="3">
                            <BasicSelect />
                        </Col>
                        <Col xs lg="3">
                            <BasicSelect />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default App;