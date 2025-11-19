import React, { useEffect, useState } from 'react';

function UserDashboard() {
  const [user, setUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/session", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to load user session:", err);
      }
    };

    fetchUser();
  }, []);

  // Hide landing page sections when dashboard loads
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const programs = document.querySelector('.programs');
    const title = document.querySelector('#about-us-section');

    if (hero) hero.style.display = 'none';
    if (about) about.style.display = 'none';
    if (programs) programs.style.display = 'none';
    if (title) title.style.display = 'none';

    return () => {
      if (hero) hero.style.display = '';
      if (about) about.style.display = '';
      if (programs) programs.style.display = '';
      if (title) title.style.display = '';
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      {/* Preserve spacing */}
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>

      {/* If user hasn't loaded yet */}
      {!user ? (
        <p>Loading profile...</p>
      ) : (
        <section
          style={{
            marginTop: '30px',
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            display: 'inline-block',
            textAlign: 'left',
            minWidth: '300px'
          }}
        >
          <h2>Profile</h2>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member since:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>

          {/* <button
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#1976d2',
              color: '#fff',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Edit Profile
          </button> */}
        </section>
      )}
    </div>
  );
}

export default UserDashboard;