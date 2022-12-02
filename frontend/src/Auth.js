import React, { useState, useRef, useEffect } from "react"
import * as API from './api/users'
import {BASE_URL} from "./util/constants";
import { useNavigate } from "react-router-dom";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const [data, setUsers] = useState([]);
  const [curUsers, setCurUsers] = useState([]);
  const [showErrorMsg, setErrorMsg] = useState(false)

  let navigate = useNavigate();

  const SignUpEmailField = useRef(null);
  const SignUpPasswordField = useRef(null);
  const SignInEmailField = useRef(null);
  const SignInPasswordField = useRef(null);
  const SignUpNameField = useRef(null);
  const SignUpStudentIDField = useRef(null);


  useEffect(() => {
    fetch(`${BASE_URL}/api/users`)
      .then((response) => response.json())
      .then((res) => {
        setUsers(res)
      })
      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
    }, [])

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const registerUser = () => {
    API.createUser(SignUpEmailField.current.value, SignUpPasswordField.current.value, SignUpStudentIDField.current.value, SignUpNameField.current.value);
  }

  const authenticate = () => {
    {data.map((c) => {
        if (SignInEmailField.current.value === c.email && SignInPasswordField.current.value === c.password){
            API.createCurUser(SignInEmailField.current.value);
            navigate('/home', {state: {email: c.email, userName: c.userName}});
        }
    })}
  }

  if (authMode === "signin") {
    return (
      <div>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  <u>Sign Up</u> 
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  ref={SignInEmailField}
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  ref={SignInPasswordField}
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={authenticate}>
                  Submit
                </button>
              </div>
            </div>
          </form>
          <p> {showErrorMsg ? "Error! Someone is logged in with this email" : ""} </p>
        </div>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              <u>Sign In</u>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              ref={SignUpEmailField}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              ref={SignUpPasswordField}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              ref={SignUpNameField}
              type="text"
              className="form-control mt-1"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Student ID</label>
            <input
              ref={SignUpStudentIDField}
              type="number"
              className="form-control mt-1"
              placeholder="9 digit Student ID"
              minLength="9"
              maxLength="9"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={registerUser}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
