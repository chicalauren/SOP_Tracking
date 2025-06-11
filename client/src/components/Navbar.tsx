import React from 'react';
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
    </div>
  </nav>
);

export default Navbar;