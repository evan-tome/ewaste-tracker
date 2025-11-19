import React, { useContext } from 'react';
import './Programs.css';
import program_1 from '../../assets/program-1.png';
import program_2 from '../../assets/program-2.png';
import program_3 from '../../assets/program-3.png';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Programs = () => {
  const { role } = useContext(AuthContext); // logged in user info
  const navigate = useNavigate();

  // Helper function for navigation
  const goTo = (path) => {
    if (!role) {
      navigate("/login"); // not logged in -> send to login
    } else {
      navigate(path); // logged in -> go to the page
    }
  };

  return (
    <div className='programs'>
      
      <div className="program" onClick={() => goTo("/dashboard")}>
        <img src={program_1} alt="" />
        <div className="caption">
          <p>Check your profile</p>
        </div>
      </div>

      <div className="program" onClick={() => goTo("/centres")}>
        <img src={program_2} alt="" />
        <div className="caption">
          <p>Find a nearby location</p>
        </div>
      </div>

      <div className="program" onClick={() => goTo("/rewards")}>
        <img src={program_3} alt="" />
        <div className="caption">
          <p>Compete for rewards</p>
        </div>
      </div>

    </div>
  );
};

export default Programs;
