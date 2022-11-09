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
        console.log(API.getAllCourses());
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
                <form onSubmit={this.handleSubmit} className="submitForm">
                    <label>
                    Course ID:
                    <input type="text" value={this.state.courseid} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmit} className="submitForm">
                    <label>
                    Course Name:
                    <input type="text" value={this.state.coursename} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmit} className="submitForm">
                    <label>
                    Course Days:
                    <input type="text" value={this.state.days} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmit} className="submitForm">
                    <label>
                    Course Times:
                    <input type="text" value={this.state.times} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default App;