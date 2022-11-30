import React from "react"
import { Link } from "react-router-dom"

export default function (props) {
  return (
    <div>
              <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Hello USER
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link to="/home" class="nav-link" href="#">
                  Home
                </Link>
              </li>
              <li class="nav-item active">
                <Link to="/classes" class="nav-link" href="#">
                  Classes
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
            <span class="navbar-text">
              <Link to="/auth" class="nav-link" href="#">
                Log Out
              </Link>
            </span>
          </div>
        </nav>
    </div>
  )
}
