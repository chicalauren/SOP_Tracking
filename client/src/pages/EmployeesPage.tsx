import { useState } from 'react';
import Navbar from '../components/Navbar';
import './EmployeesPage.css';

// Mock employee data for autocomplete (replace with API call)
const mockEmployees = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@company.com' },
  { id: 2, firstName: 'Bob', lastName: 'Jones', email: 'bob@company.com' },
  { id: 3, firstName: 'Charlie', lastName: 'Brown', email: 'charlie@company.com' },
];

const roles = ['User', 'Reporter', 'Auditor', 'Administrator'] as const;

export default function EmployeesPage() {
  const [tab, setTab] = useState<'search' | 'email' | 'add'>('search');
  const role = (localStorage.getItem('role') as typeof roles[number]) || 'User';

  // Search state
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof mockEmployees[0] | null>(null);

  // Email state
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Add employee state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<typeof roles[number]>('User');
  const [addSuccess, setAddSuccess] = useState('');

  // Filter employees for autocomplete
  const filteredEmployees = search
    ? mockEmployees.filter(
        e =>
          e.firstName.toLowerCase().includes(search.toLowerCase()) ||
          e.lastName.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handlers
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call
    setAddSuccess(`Added ${firstName} ${lastName} as ${newRole}`);
    setFirstName('');
    setLastName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('User');
    setTimeout(() => setAddSuccess(''), 3000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 2000);
    setEmailTo('');
    setEmailSubject('');
    setEmailBody('');
  };

  return (
    <div className="employees-bg">
      <Navbar role={role} />
      <div className="employees-container">
        {/* Selection Bar */}
        <div className="employees-tabs">
          <button
            className={`employees-tab-btn${tab === 'search' ? ' active' : ''}`}
            onClick={() => setTab('search')}
            type="button"
          >
            Search
          </button>
          <button
            className={`employees-tab-btn${tab === 'email' ? ' active' : ''}`}
            onClick={() => setTab('email')}
            type="button"
          >
            Email
          </button>
          <button
            className={`employees-tab-btn${tab === 'add' ? ' active' : ''}`}
            onClick={() => setTab('add')}
            type="button"
          >
            Add New Employee
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'search' && (
          <div>
            <label className="form-label">Search Employees</label>
            <input
              className="form-control mb-2"
              placeholder="Type a name or email..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setSelectedEmployee(null);
              }}
              autoComplete="off"
            />
            {search && (
              <ul className="employees-autocomplete-list list-group">
                {filteredEmployees.length === 0 && (
                  <li className="list-group-item text-muted">No matches</li>
                )}
                {filteredEmployees.map(emp => (
                  <li
                    key={emp.id}
                    className="employees-autocomplete-item list-group-item list-group-item-action"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setSearch('');
                    }}
                  >
                    {emp.firstName} {emp.lastName} ({emp.email})
                  </li>
                ))}
              </ul>
            )}
            {selectedEmployee && (
              <div className="employees-alert alert alert-info">
                <strong>{selectedEmployee.firstName} {selectedEmployee.lastName}</strong><br />
                Email: {selectedEmployee.email}
              </div>
            )}
          </div>
        )}

        {tab === 'email' && (
          <form className="employees-form" onSubmit={handleSendEmail}>
            <label className="form-label">To</label>
            <input
              className="form-control"
              type="email"
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
              required
            />
            <label className="form-label">Subject</label>
            <input
              className="form-control"
              value={emailSubject}
              onChange={e => setEmailSubject(e.target.value)}
              required
            />
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows={4}
              value={emailBody}
              onChange={e => setEmailBody(e.target.value)}
              required
            />
            <button className="btn btn-primary w-100" type="submit">
              Send Email
            </button>
            {emailSent && <div className="employees-alert alert alert-success mt-2">Email sent!</div>}
          </form>
        )}

        {tab === 'add' && (
          <form className="employees-form" onSubmit={handleAddEmployee}>
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
            />
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <label className="form-label">Role</label>
            <select
              className="form-select mb-3"
              value={newRole}
              onChange={e => setNewRole(e.target.value as typeof roles[number])}
              required
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button className="btn btn-success w-100" type="submit">
              Add Employee
            </button>
            {addSuccess && <div className="employees-alert alert alert-success mt-2">{addSuccess}</div>}
          </form>
        )}
      </div>
    </div>
  );
}