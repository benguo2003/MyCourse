import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import './Home.css';
import Auth from "./Auth";
import Home from "./Home";
import ClassInfo from "./Classes";

class App extends React.Component {
    render() {
        return(
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/classes" element={<ClassInfo />} />
                    <Route path="/" element={<Navigate to="/auth" replace />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;