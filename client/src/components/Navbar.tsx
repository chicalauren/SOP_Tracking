import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

type UserRole = 'User' | 'Reporter' | 'Auditor' | 'Administrator';

interface NavbarProps {
  role?: UserRole;
}

const Navbar: React.FC<NavbarProps> = ({ role = 'User' }) => (
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
      <div className="sop-navbar-links">
        <Link to="/" className="sop-navbar-link sop-navbar-highlight">
          My SOPs
        </Link>
        <span className="sop-navbar-link">SOPs</span>
        {role === 'Reporter' && (
          <span className="sop-navbar-link">Reports</span>
        )}
        {role === 'Administrator' && (
          <>
            <span className="sop-navbar-link">Employees</span>
            <span className="sop-navbar-link">Manage Groups</span>
            <span className="sop-navbar-link">Reports</span>
            <span className="sop-navbar-link">Configuration</span>
          </>
        )}
        <span className="sop-navbar-link">Support</span>
      </div>
      <div className="sop-navbar-circle-left" />
      <div className="sop-navbar-circle-right" />
    </div>
  </nav>
);

export default Navbar;