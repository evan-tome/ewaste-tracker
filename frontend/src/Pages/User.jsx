import React, { useEffect } from 'react';

function UserDashboard() {

  // Hide landing page sections when dashboard mounts
  useEffect(() => {
    const hero = document.querySelector('.hero');           // Hero section
    const about = document.querySelector('.about');         // About section
    const programs = document.querySelector('.programs');   // Programs section
    const title = document.querySelector('#about-us-section'); // Title section

    if (hero) hero.style.display = 'none';
    if (about) about.style.display = 'none';
    if (programs) programs.style.display = 'none';
    if (title) title.style.display = 'none';

    // Restore when unmounting
    return () => {
      if (hero) hero.style.display = '';
      if (about) about.style.display = '';
      if (programs) programs.style.display = '';
      if (title) title.style.display = '';
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>


      {/* Profile Section */}
      <section style={{
        marginTop: '30px',
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        display: 'inline-block',
        textAlign: 'left',
        minWidth: '300px'
      }}>
        <h2>Profile</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Member since:</strong> January 2025</p>
        <button style={{
          padding: '8px 14px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#1976d2',
          color: '#fff',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Edit Profile
        </button>
      </section>
    </div>
  );
}

export default UserDashboard;
