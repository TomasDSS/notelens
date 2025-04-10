import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // We’re reusing the same CSS file

function Register() {
  // Save what user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Run this when user submits the form
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send email + password to the backend
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      // Save token and send to upload page
      localStorage.setItem('token', data.token);
      alert('Registration successful');
      navigate('/upload');

    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Create Your Account</h1>

        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">Register</button>
        </form>

        <p className="login-footer">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/')}>
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

