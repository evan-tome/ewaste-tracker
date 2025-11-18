import React from 'react';

function AdminDashboard() {
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

export default AdminDashboard;