import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Landing page with Hero, Title, Programs, About */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="container">
                  <Title title='Start your journey today!'/>
                  <Programs />
                  <About />
                </div>
                <Login />
              </>
            }
          />

          {/* Auth & dashboard routes */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
