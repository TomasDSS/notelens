import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import the CSS file

function Login() {
  // Store user's input in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // When the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login info to the backend
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // If there's an error, show a message
      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // Save the token and move to upload page
      localStorage.setItem('token', data.token);
      alert('Login successful');
      navigate('/upload');
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong while logging in');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login to NoteLens</h1>

        <form onSubmit={handleLogin}>
          {/* Email field */}
          <label>Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password field */}
          <label>Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Link to register page */}
        <p className="login-footer">
          Don’t have an account?{' '}
          <span className="login-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

