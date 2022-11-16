import React from 'react';
import './App.css';
import * as API from './api/courses'
import BasicSelect from './components/filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teacher: '',
          courseid: 0,
          coursename: '',
          days: '',
          times: ''
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