import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import Title from "./Components/Title/Title";
import About from "./Components/About/About";
import Login from './Pages/Login';
import UserDashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import RecyclingCentres from './Pages/RecyclingCentres';
import LogItemForm from './Pages/LogItem';
import RewardsPage from './Pages/Rewards';
import Leaderboard from './Pages/Leaderboard';

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
              </>
            }
          />

          {/* Auth & dashboard routes */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/centres" element={<RecyclingCentres />} />
          <Route path="/recycle" element={<LogItemForm />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
