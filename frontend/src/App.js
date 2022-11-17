import React from 'react';
import './App.css';
import * as API from './api/courses'
import BasicSelect from './filters';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teacher: '',
          courseid: 0,
          coursename: '',
          days: '',
          times: '',
          values: [0]
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
                <BasicSelect test={this.state.values}/>
            </div>
        )
    }
}

export default App;