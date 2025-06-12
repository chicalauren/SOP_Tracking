import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

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
          // Optionally redirect here
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
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <div className="card shadow p-4" style={{ minWidth: 320, maxWidth: 400 }}>
        <h2 className="mb-3 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <div className="alert alert-danger py-1">{error}</div>}
          {success && <div className="alert alert-success py-1">{success}</div>}
          <button className="btn btn-primary w-100" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-link p-0" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;