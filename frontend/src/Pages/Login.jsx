import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import "./Login.css";

function Login() {
  const { setRole } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed for sessions
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const user = data.user;

      if (user.role === "admin") {
        setRole("admin");
      } else {
        setRole("user");
      }
      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="login-section" style={{ textAlign: 'center', marginTop: '150px' }}>
      <h1 className="title">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Login</button>

        <br /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* NEW SECTION — clickable link to registration page */}
      <p style={{ marginTop: '15px' }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}

export default Login;