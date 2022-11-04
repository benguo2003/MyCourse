import React from 'react';
import './App.css';
import * as API from './api/courses'


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
        API.getAllCourses();
        alert('A name was submitted: ' + this.state.teacher);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div className="title">
                    MyCourse
                </div>
                <form onSubmit={this.handleSubmit} className="submitForm">
                    <label>
                    Teacher Name:
                    <input type="text" value={this.state.teacher} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default App;