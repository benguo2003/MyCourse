import React, { useState, useRef, useEffect } from "react"
import * as API from './api/users'
import {BASE_URL} from "./util/constants";
import { useNavigate } from "react-router-dom";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const [data, setUsers] = useState([]);
  let navigate = useNavigate();

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

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
    API.createUser(inputRef.current.value, inputRef2.current.value, inputRef.current.value + Date().toLocaleString());
  }

  const authenticate = () => {
    {data.map((c) => {
        if (inputRef3.current.value === c.email && inputRef4.current.value === c.password) {
            API.createCurUser(inputRef3.current.value);
            navigate('/home');
        }
    })}
  }

  if (authMode === "signin") {
    return (
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
                ref={inputRef3}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                ref={inputRef4}
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
              ref={inputRef}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              ref={inputRef2}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
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
