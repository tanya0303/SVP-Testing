import React, { useEffect, useMemo, useRef, useState } from 'react';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";
const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";
const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";
const imgSuccessIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' fill='%2306914d'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function ManageHierarchiesModal3({ isOpen, onClose }) {
  const CREATE_PANEL_ANIMATION_MS = 260;
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateClosing, setIsCreateClosing] = useState(false);
  const [createHierarchyName, setCreateHierarchyName] = useState('');
  const [createDimension, setCreateDimension] = useState('Account');
  const [createNumLevels, setCreateNumLevels] = useState(5);
  const [createLevelMenuIndex, setCreateLevelMenuIndex] = useState(null);
  const [createLevels, setCreateLevels] = useState([
    { id: 0, level: 0, name: '' },
    { id: 1, level: 1, name: '' },
    { id: 2, level: 2, name: '' },
    { id: 3, level: 3, name: '' },
    { id: 4, level: 4, name: '' },
  ]);

  const [hierarchies, setHierarchies] = useState([
    { name: 'AccountSales', dimension: 'Accounts', levelStructure: '3 Levels (HQ-->Regional-->Country)', dataStatus: 'Data Requested', createdOn: 'Mar 23, 2026' },
    { name: 'ProductCatalog', dimension: 'Products', levelStructure: '3 Levels (Category-->Family-->SKU)', dataStatus: 'Data Requested', createdOn: 'Mar 30, 2026' },
  ]);
  const createCloseTimeoutRef = useRef(null);

  const filteredHierarchies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return hierarchies;
    return hierarchies.filter((item) => (
      item.name.toLowerCase().includes(query)
      || item.dimension.toLowerCase().includes(query)
      || item.levelStructure.toLowerCase().includes(query)
      || item.dataStatus.toLowerCase().includes(query)
      || item.createdOn.toLowerCase().includes(query)
    ));
  }, [hierarchies, searchTerm]);

  const groupedHierarchies = useMemo(() => filteredHierarchies.reduce((groups, hierarchy) => {
    if (!groups[hierarchy.dimension]) {
      groups[hierarchy.dimension] = [];
    }
    groups[hierarchy.dimension].push(hierarchy);
    return groups;
  }, {}), [filteredHierarchies]);


  const resetCreateForm = () => {
    setCreateHierarchyName('');
    setCreateDimension('Account');
    setCreateNumLevels(5);
    setCreateLevelMenuIndex(null);
    setCreateLevels([
      { id: 0, level: 0, name: '' },
      { id: 1, level: 1, name: '' },
      { id: 2, level: 2, name: '' },
      { id: 3, level: 3, name: '' },
      { id: 4, level: 4, name: '' },
    ]);
  };

  const openCreatePanel = () => {
    if (createCloseTimeoutRef.current) {
      clearTimeout(createCloseTimeoutRef.current);
      createCloseTimeoutRef.current = null;
    }
    resetCreateForm();
    setIsCreateClosing(false);
    setIsCreateOpen(true);
  };

  const closeCreatePanel = () => {
    setIsCreateClosing(true);
    createCloseTimeoutRef.current = setTimeout(() => {
      setIsCreateOpen(false);
      setIsCreateClosing(false);
      setCreateLevelMenuIndex(null);
      createCloseTimeoutRef.current = null;
    }, CREATE_PANEL_ANIMATION_MS);
  };

  const handleSaveCreate = () => {
    const trimmedName = createHierarchyName.trim();
    if (!trimmedName) return;

    const dimension = createDimension === 'Account' ? 'Accounts' : 'Products';
    const levelNames = createLevels.map((level) => level.name.trim()).filter(Boolean);
    const levelStructure = `${createLevels.length} Levels (${levelNames.join('-->') || 'Custom'})`;

    setHierarchies((prev) => [
      {
        name: trimmedName,
        dimension,
        levelStructure,
        dataStatus: 'Not Synced',
        createdOn: 'May 18, 2026'
      },
      ...prev
    ]);
    setSearchTerm('');
    closeCreatePanel();
  };

  const handleLevelNameChange = (index, value) => {
    setCreateLevels((prev) => prev.map((level, i) => (i === index ? { ...level, name: value } : level)));
  };

  const handleAddCreateLevel = (index) => {
    const nextLevels = [...createLevels];
    const maxId = Math.max(...nextLevels.map((level) => level.id));
    nextLevels.splice(index + 1, 0, { id: maxId + 1, level: index + 1, name: '' });
    const normalized = nextLevels.map((level, i) => ({ ...level, level: i }));
    setCreateLevels(normalized);
    setCreateNumLevels(normalized.length);
    setCreateLevelMenuIndex(null);
  };

  const handleDeleteCreateLevel = (index) => {
    if (createLevels.length <= 1) return;
    const normalized = createLevels
      .filter((_, i) => i !== index)
      .map((level, i) => ({ ...level, level: i }));
    setCreateLevels(normalized);
    setCreateNumLevels(normalized.length);
    setCreateLevelMenuIndex(null);
  };

  const handleGoToSetupDetails = () => {
    onClose();
  };

  useEffect(() => () => {
    if (createCloseTimeoutRef.current) {
      clearTimeout(createCloseTimeoutRef.current);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-hierarchies v3-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-simple">
          <h2 className="modal-title">Manage Hierarchies v3</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        <div className="modal-body-simple v3-modal-body">
          <div className="hierarchies-header">
            <div className="hierarchies-button-group">
              <button className="hierarchies-sync-button" type="button">Sync to Data Cloud</button>
              <button className="hierarchies-create-button" type="button" onClick={openCreatePanel}>Create New</button>
            </div>
          </div>

          <div className="measures-info-bar">
            <span className="measures-info-bar-text">Need more context on these hierarchies?</span>
            <button className="measures-info-bar-link" onClick={handleGoToSetupDetails}>
              Go to Setup for more details
            </button>
          </div>

          <div className="hierarchies-search-container">
            <div className="hierarchies-search">
              <img src={imgSearchIcon} alt="Search" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="hierarchies-table-container">
            <table className="hierarchies-table">
              <thead>
                <tr>
                  <th>Hierarchy Name</th>
                  <th>Level Structure</th>
                  <th>Data Status</th>
                  <th>Created On</th>
                  <th className="table-cell-actions"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedHierarchies).map(([dimension, items], groupIndex) => (
                  <React.Fragment key={dimension}>
                    <tr className="hierarchy-group-row">
                      <td colSpan="5">
                        <span className="hierarchy-group-title">{dimension} ({items.length})</span>
                      </td>
                    </tr>
                    {items.map((hierarchy, rowIndex) => {
                      const menuIndex = `${groupIndex}-${rowIndex}`;
                      return (
                        <tr key={`${dimension}-${hierarchy.name}`}>
                          <td><span className="manage-hierarchies-2-link">{hierarchy.name}</span></td>
                          <td>{hierarchy.levelStructure}</td>
                          <td>
                            <div className="data-status-cell">
                              <img src={imgSuccessIcon} alt="Status" className="status-icon" />
                              <span>{hierarchy.dataStatus}</span>
                            </div>
                          </td>
                          <td>{hierarchy.createdOn}</td>
                          <td className="table-cell-actions">
                            <div className="dropdown-wrapper">
                              <button className="table-row-dropdown" type="button" onClick={() => setOpenMenuIndex(openMenuIndex === menuIndex ? null : menuIndex)}>
                                <img src={imgDownIcon} alt="Actions" />
                              </button>
                              {openMenuIndex === menuIndex && (
                                <div className="dropdown-menu">
                                  <button className="dropdown-menu-item" type="button">Edit</button>
                                  <button className="dropdown-menu-item" type="button">Clone</button>
                                  <button className="dropdown-menu-item" type="button">Sync Now</button>
                                  <div className="dropdown-menu-divider"></div>
                                  <button className="dropdown-menu-item dropdown-menu-item-danger" type="button">Delete</button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {isCreateOpen && (
            <div className={`v3-create-overlay ${isCreateClosing ? 'slide-out' : 'slide-in'}`}>
              <div className="manage-hierarchies-2-panel-header">
                <div className="manage-hierarchies-2-create-header-left">
                  <button type="button" className="manage-hierarchies-2-back-button" onClick={closeCreatePanel}>
                    ← Back
                  </button>
                  <p className="manage-hierarchies-2-panel-title">Create New Hierarchy</p>
                </div>
                <div className="edit-panel-header-actions">
                  <button type="button" className="edit-panel-icon-button edit-panel-icon-button-cancel" onClick={closeCreatePanel}>✕</button>
                  <button type="button" className="edit-panel-icon-button edit-panel-icon-button-save" onClick={handleSaveCreate}>
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="edit-panel-body v3-create-body">
                <div className="clone-form-section">
                  <label className="clone-form-label">* New Hierarchy Name</label>
                  <input
                    type="text"
                    className="clone-form-input"
                    value={createHierarchyName}
                    onChange={(e) => setCreateHierarchyName(e.target.value)}
                    placeholder="Enter Hierarchy Name"
                  />
                </div>

                <div className="clone-form-section">
                  <label className="clone-form-label">Dimension</label>
                  <select
                    className="clone-form-input clone-form-select"
                    value={createDimension}
                    onChange={(e) => setCreateDimension(e.target.value)}
                  >
                    <option value="Account">Account</option>
                    <option value="Product">Product</option>
                  </select>
                </div>

                <div className="clone-form-section">
                  <div className="clone-form-label-row">
                    <label className="clone-form-label">Enter Number of Levels for your hierarchy</label>
                    <button type="button" className="clone-info-icon">ⓘ</button>
                  </div>
                  <div className="clone-level-control">
                    <button
                      type="button"
                      className="clone-level-button"
                      onClick={() => {
                        if (createLevels.length > 1) {
                          const reduced = createLevels.slice(0, -1).map((level, i) => ({ ...level, level: i }));
                          setCreateLevels(reduced);
                          setCreateNumLevels(reduced.length);
                        }
                      }}
                    >
                      −
                    </button>
                    <span className="clone-level-value">{createNumLevels}</span>
                    <button
                      type="button"
                      className="clone-level-button"
                      onClick={() => {
                        const maxId = Math.max(...createLevels.map((level) => level.id));
                        const nextLevels = [...createLevels, { id: maxId + 1, level: createLevels.length, name: '' }];
                        setCreateLevels(nextLevels);
                        setCreateNumLevels(nextLevels.length);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="clone-hierarchy-table">
                  <div className="clone-table-header">
                    <div className="clone-table-header-cell">Hierarchy Level</div>
                    <div className="clone-table-header-cell">Name</div>
                    <div className="clone-table-header-cell clone-table-header-actions"></div>
                  </div>
                  <div className="clone-table-body">
                    {createLevels.map((levelData, index) => {
                      const indentClass = levelData.level > 0 ? `clone-table-row-indent-${levelData.level}` : '';
                      const isLastLevel = index === createLevels.length - 1;
                      return (
                        <div key={levelData.id} className={`clone-table-row ${indentClass}`}>
                          <div className="clone-table-cell">
                            <button type="button" className={isLastLevel ? 'clone-chevron-empty' : 'clone-chevron'}>›</button>
                            <span className="clone-level-text">{createDimension} L{levelData.level}</span>
                          </div>
                          <div className="clone-table-cell">
                            <input
                              type="text"
                              className="clone-name-input"
                              placeholder="Enter Name"
                              value={levelData.name}
                              onChange={(e) => handleLevelNameChange(index, e.target.value)}
                            />
                          </div>
                          <div className="clone-table-cell clone-table-cell-actions">
                            <div className="clone-level-dropdown-wrapper">
                              <button
                                type="button"
                                className="clone-level-dropdown-button"
                                onClick={() => setCreateLevelMenuIndex(createLevelMenuIndex === index ? null : index)}
                              >
                                <img src={imgDownIcon} alt="Actions" />
                              </button>
                              {createLevelMenuIndex === index && (
                                <div className="clone-level-dropdown-menu">
                                  <button type="button" className="clone-level-dropdown-item" onClick={() => handleAddCreateLevel(index)}>
                                    Add Level
                                  </button>
                                  <button type="button" className="clone-level-dropdown-item" onClick={() => handleDeleteCreateLevel(index)}>
                                    Delete Level
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-done-button" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
