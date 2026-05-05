import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './ResidentPortal.css';

const ResidentPortal = () => {
  const { user, logout } = useAuth();

  const requests = [
    { type: 'Barangay Clearance', status: 'Pending' },
    { type: 'Certificate of Indigency', status: 'Approved' },
  ];

  return (
    <div className="portal">
      {/* Header */}
      <div className="portal-header">
        <h1>Barangay Portal</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="portal-container">
        {/* Welcome */}
        <div className="welcome">
          <h2>Welcome</h2>
          <p>{user?.email}</p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="card">
            <span>Active</span>
            <strong>2</strong>
          </div>
          <div className="card">
            <span>Completed</span>
            <strong>5</strong>
          </div>
          <div className="card">
            <span>Appointments</span>
            <strong>1</strong>
          </div>
          <div className="card">
            <span>Notifications</span>
            <strong>3</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="section">
          <h3>Quick Actions</h3>
          <div className="actions">
            <button className="action-card">
              <strong>Request Document</strong>
              <p>Clearance, Indigency, Residency</p>
            </button>

            <button className="action-card">
              <strong>Book Appointment</strong>
              <p>Schedule visit or pickup</p>
            </button>

            <button className="action-card">
              <strong>Update Profile</strong>
              <p>Request info changes</p>
            </button>
          </div>
        </div>

        {/* Requests */}
        <div className="section">
          <h3>Recent Requests</h3>
          <div className="list">
            {requests.map((req, i) => (
              <div key={i} className="list-item">
                <div>
                  <strong>{req.type}</strong>
                  <p className="ref">Ref: BRGY-2026-00{i + 1}</p>
                </div>
                <span className={`status ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="section">
          <h3>Announcements</h3>
          <div className="announcement">
            <strong>Community Clean-Up Drive</strong>
            <p>Saturday 7AM. Volunteers welcome.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentPortal;