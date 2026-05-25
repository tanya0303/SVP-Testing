import React, { useState } from 'react';
import Toast from './Toast';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const imgInfoIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' stroke='%230176d3' stroke-width='1.5'/%3E%3Cpath d='M8 7v4M8 5v.5' stroke='%230176d3' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgLightBulbIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 1v1M3 3l.7.7M1 8h1M3 13l.7-.7M13 3l-.7.7M15 8h-1M13 13l-.7-.7' stroke='%23f39c12' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='8' cy='8' r='3' stroke='%23f39c12' stroke-width='1.5'/%3E%3C/svg%3E";

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

export default function ManageUserAccessModal({ isOpen, onClose }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    setToastMessage('User permissions updated successfully');
    setShowToast(true);
    // Optionally close modal after a delay
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  // Sample user data
  const users = [
    { name: 'Lakshmi TV', username: 'lakshmi@company.com', profile: 'System Administrator', access: 'Commercial Planning and Forecasting' },
    { name: 'John Doe', username: 'john@company.com', profile: 'Standard User', access: '' },
    { name: 'Jane Smith', username: 'jane@company.com', profile: 'System Administrator', access: 'Commercial Planning and Forecasting' },
    { name: 'Bob Johnson', username: 'bob@company.com', profile: 'Standard User', access: '' },
    { name: 'Alice Williams', username: 'alice@company.com', profile: 'System Administrator', access: 'Commercial Planning and Forecasting' },
    { name: 'Charlie Brown', username: 'charlie@company.com', profile: 'Standard User', access: '' },
    { name: 'Diana Prince', username: 'diana@company.com', profile: 'System Administrator', access: 'Commercial Planning and Forecasting' },
    { name: 'Eve Davis', username: 'eve@company.com', profile: 'Standard User', access: '' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">Manage User Access</h2>
            <img src={imgInfoIcon} alt="Info" className="info-icon" />
          </div>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-tabs">
          <div className="modal-tab modal-tab-active">User Access</div>
          <div className="modal-tab">Permission Sets</div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Left Sidebar */}
          <div className="modal-sidebar">
            <div className="modal-sidebar-header">
              <h3>Filter By</h3>
            </div>
            <div className="modal-sidebar-section">
              <label className="radio-label">
                <input type="radio" name="userFilter" defaultChecked />
                <span>All Users</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="userFilter" />
                <span>Active Users</span>
              </label>
            </div>

            {/* Insight Card */}
            <div className="insight-card">
              <img src={imgLightBulbIcon} alt="Tip" className="insight-icon" />
              <div className="insight-content">
                <h4 className="insight-title">Need help assigning permissions?</h4>
                <button className="insight-button">Learn More</button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="modal-content">
            {/* Description */}
            <p className="modal-description">
              Assign and Manage End User Permission Sets
            </p>

            {/* Usage Metrics */}
            <div className="usage-metrics">
              <div className="mini-metric">
                <span className="metric-label">Total Users</span>
                <div className="metric-values">
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Active</span>
                    <span className="metric-number">20</span>
                  </div>
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Inactive</span>
                    <span className="metric-number">5</span>
                  </div>
                </div>
              </div>

              <div className="mini-metric">
                <span className="metric-label">Users with Access</span>
                <div className="metric-values">
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Active</span>
                    <span className="metric-number">100</span>
                  </div>
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Inactive</span>
                    <span className="metric-number">0</span>
                  </div>
                </div>
              </div>

              <div className="mini-metric">
                <span className="metric-label">Available Licenses</span>
                <div className="metric-values">
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Active</span>
                    <span className="metric-number">100</span>
                  </div>
                  <div className="metric-value-col">
                    <span className="metric-sublabel">Inactive</span>
                    <span className="metric-number">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="users-table-container">
              {/* Table Header */}
              <div className="table-header">
                <div className="table-header-left">
                  <div className="table-dropdown">
                    <span>All Users</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <p className="table-description">
                    Select users to assign Commercial Planning and Forecasting permissions
                  </p>
                </div>
                <div className="table-header-right">
                  <div className="table-search">
                    <img src={imgSearchIcon} alt="Search" />
                    <input type="text" placeholder="Search users..." />
                  </div>
                  <button className="table-icon-button">⋮</button>
                  <button className="table-icon-button">⚙</button>
                  <button className="table-icon-button">↻</button>
                </div>
              </div>

              {/* Table */}
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="table-cell-checkbox">
                      <input type="checkbox" />
                    </th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Profile</th>
                    <th>Access</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="table-cell-checkbox">
                        <input type="checkbox" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.profile}</td>
                      <td>{user.access || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Buttons */}
            <div className="modal-footer-buttons">
              <button className="modal-cancel-button" onClick={onClose}>Cancel</button>
              <button className="modal-save-button" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <Toast
            message={toastMessage}
            onClose={closeToast}
            duration={3000}
          />
        )}
      </div>
    </div>
  );
}
