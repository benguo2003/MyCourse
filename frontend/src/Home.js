import React from 'react';
import './Home.css';
//import * as API from './api/courses'

//import BasicSelect from './components/filters';
import SubjectSelect from './components/display';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Home extends React.Component {
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
    }

    render() {
        return(
            <div>
                <div className="title">
                    MyCourse
                </div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="0">
                            <SubjectSelect />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;