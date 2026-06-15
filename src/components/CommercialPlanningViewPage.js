import React, { useEffect, useRef, useState } from 'react';
import Toast from './Toast';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";
const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";
const imgChevronDown = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgSparkIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 1.5l1 2.2 2.2 1-2.2 1-1 2.3-1-2.3-2.2-1 2.2-1 1-2.2z' fill='%230176d3'/%3E%3C/svg%3E";
const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

export default function PlanningViewPage({
  onNavigateToGridConfig,
  onNavigateToMeasuresPage,
  onNavigateToHierarchySetup,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConfigIds, setSelectedConfigIds] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRolesDropdownOpen, setIsRolesDropdownOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const rolesDropdownRef = useRef(null);
  const assignableRoles = [
    'Key Account Manager',
    'Regional Director',
    'Account Director',
  ];
  const [planConfigs] = useState([
    {
      id: 1,
      name: 'KAMPlanConfig',
      description: 'KAM planning grid configuration for account planning users',
      dimensions: '2 dimensions',
      measures: '0 measures',
      status: 'Draft',
      updatedBy: 'Admin',
    },
    {
      id: 2,
      name: 'RetailPlanConfig',
      description: 'Retail planning grid setup for product and store planning',
      dimensions: '3 dimensions',
      measures: '4 measures',
      status: 'Active',
      updatedBy: 'Admin',
    },
  ]);

  const filteredPlanConfigs = planConfigs.filter((config) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return true;
    return (
      config.name.toLowerCase().includes(normalizedSearch) ||
      config.description.toLowerCase().includes(normalizedSearch)
    );
  });

  const filteredPlanConfigIds = filteredPlanConfigs.map((config) => config.id);
  const isAllFilteredSelected =
    filteredPlanConfigIds.length > 0 &&
    filteredPlanConfigIds.every((id) => selectedConfigIds.includes(id));
  const isSomeFilteredSelected =
    filteredPlanConfigIds.some((id) => selectedConfigIds.includes(id)) && !isAllFilteredSelected;

  const handleToggleSelectAll = () => {
    if (isAllFilteredSelected) {
      setSelectedConfigIds((prev) =>
        prev.filter((id) => !filteredPlanConfigIds.includes(id))
      );
      return;
    }

    setSelectedConfigIds((prev) => {
      const nextSelected = new Set(prev);
      filteredPlanConfigIds.forEach((id) => nextSelected.add(id));
      return Array.from(nextSelected);
    });
  };

  const handleToggleRowSelection = (configId) => {
    setSelectedConfigIds((prev) =>
      prev.includes(configId)
        ? prev.filter((id) => id !== configId)
        : [...prev, configId]
    );
  };

  const toggleRoleSelection = (roleName) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((role) => role !== roleName)
        : [...prev, roleName]
    );
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setIsRolesDropdownOpen(false);
  };

  const handleAssign = () => {
    setToastMessage('Assigned Successfully');
    setShowToast(true);
    handleCloseAssignModal();
  };

  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rolesDropdownRef.current && !rolesDropdownRef.current.contains(event.target)) {
        setIsRolesDropdownOpen(false);
      }
    };

    if (isRolesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRolesDropdownOpen]);

  return (
    <div className="measures-page-layout">
      <aside className="left-sidebar hierarchy-setup-sidebar">
        <div className="sidebar-search hierarchy-setup-sidebar-search">
          <div className="search-field hierarchy-setup-search-field">
            <img src={imgSearchIcon} alt="Search" className="search-icon" />
          </div>
        </div>
        <div className="hierarchy-setup-nav-group">
          <div className="hierarchy-setup-nav-item hierarchy-setup-nav-parent">
            <img src={imgChevronDown} alt="" className="chevron-icon" />
            <span>Commercial Planning...</span>
          </div>
          <div className="hierarchy-setup-nav-item">
            <img src={imgSparkIcon} alt="" />
            <button
              type="button"
              className="side-nav-link-button"
              onClick={onNavigateToHierarchySetup}
            >
              Dimensions &amp; Hierarchies
            </button>
          </div>
          <div className="hierarchy-setup-nav-item">
            <span className="hierarchy-setup-nav-indent" />
            <button
              type="button"
              className="side-nav-link-button"
              onClick={onNavigateToMeasuresPage}
            >
              Measures
            </button>
          </div>
          <div className="hierarchy-setup-nav-item hierarchy-setup-nav-selected">
            <span className="hierarchy-setup-nav-indent" />
            <span>Plan Configuration</span>
          </div>
        </div>
      </aside>

      <div className="measures-page-content">
        <div className="planning-view-page">
          <div className="planning-view-header">
            <div className="planning-view-title-section">
              <h1 className="planning-view-title">Plan Configurations</h1>
              <p className="planning-view-subtitle">{planConfigs.length} Configurations</p>
            </div>
            <div className="planning-view-toolbar-right">
              <button
                className="planning-view-button planning-view-button-secondary"
                disabled={selectedConfigIds.length === 0}
                onClick={() => setIsAssignModalOpen(true)}
              >
                Assign To
              </button>
              <button className="planning-view-button planning-view-button-primary" onClick={onNavigateToGridConfig}>
                + Create new
              </button>
            </div>
          </div>

          <div className="planning-view-card">
            <div className="planning-view-card-header">
              <div className="planning-view-search-controls">
                <div className="planning-view-search">
                  <img src={imgSearchIcon} alt="Search" />
                  <input
                    type="text"
                    placeholder="Search plan configurations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="planning-view-table-container">
              <table className="planning-view-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={isAllFilteredSelected}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = isSomeFilteredSelected;
                          }
                        }}
                        onChange={handleToggleSelectAll}
                        aria-label="Select all plan configurations"
                      />
                    </th>
                    <th>Configuration Name</th>
                    <th>Description</th>
                    <th>Dimensions</th>
                    <th>Measures</th>
                    <th>Status</th>
                    <th>Last Updated By</th>
                    <th className="table-cell-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlanConfigs.map((config) => (
                    <tr key={config.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedConfigIds.includes(config.id)}
                          onChange={() => handleToggleRowSelection(config.id)}
                          aria-label={`Select ${config.name}`}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="planning-grid-link-button"
                          onClick={onNavigateToGridConfig}
                        >
                          {config.name}
                        </button>
                      </td>
                      <td>{config.description}</td>
                      <td>{config.dimensions}</td>
                      <td>{config.measures}</td>
                      <td>
                        <span className={`status-badge ${config.status === 'Active' ? 'status-active' : 'status-draft'}`}>
                          {config.status}
                        </span>
                      </td>
                      <td>{config.updatedBy}</td>
                      <td className="table-cell-actions">
                        <button className="table-row-dropdown" type="button">
                          <img src={imgDownIcon} alt="Row actions" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isAssignModalOpen && (
        <div className="modal-overlay" onClick={handleCloseAssignModal}>
          <div
            className="modal-container modal-container-compact planning-view-assign-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '680px', maxWidth: '95vw' }}
          >
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">Assign Plan Configurations</h2>
              </div>
              <button className="modal-close-button" onClick={handleCloseAssignModal}>
                <img src={imgCloseIcon} alt="Close" />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-content planning-view-assign-modal-content">
                <div className="planning-view-assign-field">
                  <label className="planning-view-assign-label">
                    Select roles you want to assign this plan config to
                  </label>
                  <div className="planning-view-role-dropdown" ref={rolesDropdownRef}>
                    <button
                      type="button"
                      className="planning-view-role-dropdown-trigger"
                      onClick={() => setIsRolesDropdownOpen((prev) => !prev)}
                    >
                      <span>
                        {selectedRoles.length
                          ? `${selectedRoles.length} role${selectedRoles.length > 1 ? 's' : ''} selected`
                          : 'Select roles'}
                      </span>
                      <img src={imgChevronDown} alt="" />
                    </button>
                    {isRolesDropdownOpen && (
                      <div className="planning-view-role-dropdown-menu">
                        {assignableRoles.map((roleName) => (
                          <label key={roleName} className="planning-view-role-dropdown-option">
                            <input
                              type="checkbox"
                              checked={selectedRoles.includes(roleName)}
                              onChange={() => toggleRoleSelection(roleName)}
                            />
                            <span>{roleName}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedRoles.length > 0 && (
                    <div className="planning-view-role-pill-list">
                      {selectedRoles.map((roleName) => (
                        <span key={roleName} className="planning-view-role-pill">
                          {roleName}
                          <button
                            type="button"
                            className="planning-view-role-pill-remove"
                            onClick={() => toggleRoleSelection(roleName)}
                            aria-label={`Remove ${roleName}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer-buttons" style={{ padding: '0 24px 20px' }}>
              <button className="modal-cancel-button" onClick={handleCloseAssignModal}>
                Cancel
              </button>
              <button className="modal-save-button" onClick={handleAssign}>
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={closeToast}
        />
      )}
    </div>
  );
}
