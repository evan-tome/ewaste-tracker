import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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

      const user = data.user; // user = { id, username, role }

      if (user.role === "admin") {
        navigate('/admin'); // redirect to admin dashboard
        setRole("admin");
      } else {
        navigate('/user'); // redirect to user dashboard
        setRole("user");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="login-section" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
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