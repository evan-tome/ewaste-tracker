import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const { setRole } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setRole(roleSelection);               // <-- updates context
      navigate(roleSelection === 'admin' ? '/admin' : '/user');
    }
  };

  return (
    <div id="login-section" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username}
               onChange={(e) => setUsername(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <select value={roleSelection} onChange={(e) => setRoleSelection(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}

export default Login;
