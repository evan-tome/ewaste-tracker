import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // <-- added Link

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      if (role === 'admin') {
        navigate('/admin'); // redirect to admin dashboard
      } else {
        navigate('/user'); // redirect to user dashboard
      }
    }
  };

  return (
    <div id="login-section" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />
        <button type="submit">Login</button>
      </form>

      {/* NEW SECTION — clickable link to registration page */}
      <p style={{ marginTop: '15px' }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}

export default Login;
