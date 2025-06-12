import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        if (res.token) {
          localStorage.setItem('token', res.token);
          setSuccess('Logged in!');
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await registerUser(email, password);
        if (res.token) {
          setSuccess('Registered! Please log in.');
          setIsLogin(true);
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card position-relative">
        <div className="auth-circle auth-circle-left"></div>
        <div className="auth-circle auth-circle-right"></div>
        <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
        <div className="auth-subtitle">
          Welcome to <span style={{ color: '#ffd700', fontWeight: 600 }}>SOP Tracker</span>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="auth-alert alert alert-danger">{error}</div>}
          {success && <div className="auth-alert alert alert-success">{success}</div>}
          <button className="auth-btn btn w-100" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center">
          <button
            className="auth-toggle-btn"
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            type="button"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;