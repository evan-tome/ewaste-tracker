import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import Title from "./Components/Title/Title";
import About from "./Components/About/About";
import Login from './Pages/Login';
import UserDashboard from './Pages/User';
import AdminDashboard from './Pages/Admin';
import Register from './Pages/Register';

const App = () => {
  return (
    <Router>
      {/* Your existing layout stays untouched */}
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title title='Start your journey today!'/>
        <Programs/>
        <About/>
      </div>

      {/* Routing for login and dashboards */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

<div id="top"></div>

export default App;
