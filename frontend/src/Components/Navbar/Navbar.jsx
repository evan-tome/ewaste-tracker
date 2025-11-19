import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { role, setRole } = useContext(AuthContext);
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => window.scrollY > 50 ? setSticky(true) : setSticky(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  useEffect(() => {
    console.log('[Navbar] current role:', role);
  }, [role]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // IMPORTANT for session cookies
      });

      if (!res.ok) {
        console.error("Logout failed");
        return;
      }

      setRole(null); // clear frontend role
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        {role === null ? (
          <>
            <li><a href="/" className="btn">Home</a></li>
            <li><a href="/#about-us-section"><button className="btn">About Us</button></a></li>
            <li><a href="/login" className="btn">Sign in</a></li>
          </>
        ) : (
          <>
            <li><a href="/" className="btn">Home</a></li>
            <li><a href="/dashboard"><button className="btn">Dashboard</button></a></li>
            <li><a href="/recycle"><button className="btn">Log Items</button></a></li>
            <li><a href="/centres"><button className="btn">Request Pickup</button></a></li>
            <li><a href="/rewards"><button className="btn">Rewards</button></a></li>
            <li><a href="/leaderboard"><button className="btn">Leaderboard</button></a></li>
            <li><a href="/" className="btn" onClick={handleLogout}>Logout</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
