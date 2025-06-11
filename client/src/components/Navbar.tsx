import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => (
  <nav className="sop-navbar">
    <div className="sop-navbar-container">
      <h1 className="sop-navbar-title">
        <span className="sop-navbar-highlight">SOP</span> Tracker
      </h1>
      <p className="sop-navbar-lead">
        Empower your team to <span className="sop-navbar-highlight">learn</span>,{' '}
        <span className="sop-navbar-highlight">track</span>, and{' '}
        <span className="sop-navbar-highlight">master</span> your Standard Operating Procedures.
      </p>
      {/* {NAVIGATION LINKS BELOW} */}
      <div className="sop-navbar-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', zIndex: 1, position: 'relative' }}>
        <Link to="/" className="sop-navbar-link sop-navbar-highlight" style={{ textDecoration: 'none', fontWeight: 600 }}>
          My SOPs
        </Link>
        <span className="sop-navbar-link" style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: 0.8 }}>
          SOPs
        </span>
        <span className="sop-navbar-link" style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: 0.8 }}>
          Support
        </span>
      </div>
      <div className="sop-navbar-circle-left" />
      <div className="sop-navbar-circle-right" />
    </div>
  </nav>
);

export default Navbar;