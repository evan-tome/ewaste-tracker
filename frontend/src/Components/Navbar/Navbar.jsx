import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // <-- import Link
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    
    // cleanup to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
        <a href="#top" className="btn">Home</a>
        </li>

        <li>
        <a href="#login-section" className="btn">Sign in</a>
        </li>

        <li>
          <a href="#about-us-section"><button className="btn">About Us</button>
  </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
