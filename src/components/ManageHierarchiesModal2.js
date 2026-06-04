import React, { useEffect, useMemo, useRef, useState } from 'react';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";
const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";
const imgSuccessIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' fill='%2306914d'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function ManageHierarchiesModal2({ isOpen, onClose, onGoToHierarchySetup }) {
  const CREATE_PANEL_ANIMATION_MS = 260;
  const [selectedDimension, setSelectedDimension] = useState('Account');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [isCreatePanelClosing, setIsCreatePanelClosing] = useState(false);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [isEditPanelClosing, setIsEditPanelClosing] = useState(false);
  const [selectedHierarchy, setSelectedHierarchy] = useState(null);
  const [editLevelNames, setEditLevelNames] = useState([]);
  const [createHierarchyName, setCreateHierarchyName] = useState('');
  const [createDimension, setCreateDimension] = useState('Account');
  const [createNumLevels, setCreateNumLevels] = useState(5);
  const [createLevelMenuIndex, setCreateLevelMenuIndex] = useState(null);
  const [createLevels, setCreateLevels] = useState([
    { id: 0, level: 0, name: '', isEditable: true },
    { id: 1, level: 1, name: '', isEditable: true },
    { id: 2, level: 2, name: '', isEditable: true },
    { id: 3, level: 3, name: '', isEditable: true },
    { id: 4, level: 4, name: '', isEditable: true },
  ]);

  const dimensions = ['Account', 'Product'];

  const [hierarchies, setHierarchies] = useState([
    {
      id: 'acc-1',
      dimension: 'Account',
      hierarchyName: 'AccountSales',
      levelNames: ['HQ', 'Regional', 'Country'],
      levelStructure: '3 Levels (HQ-->Regional-->Country)',
      dataStatus: 'Data Requested',
      createdOn: 'Mar 23, 2026'
    },
    {
      id: 'prod-1',
      dimension: 'Product',
      hierarchyName: 'ProductCatalog',
      levelNames: ['Category', 'Family', 'SKU'],
      levelStructure: '3 Levels (Category-->Family-->SKU)',
      dataStatus: 'Data Requested',
      createdOn: 'Mar 30, 2026'
    }
  ]);

  const filteredHierarchies = useMemo(
    () => hierarchies.filter((hierarchy) => hierarchy.dimension === selectedDimension),
    [hierarchies, selectedDimension]
  );
  const createCloseTimeoutRef = useRef(null);
  const editCloseTimeoutRef = useRef(null);

  const resetCreateForm = () => {
    setCreateHierarchyName('');
    setCreateDimension(selectedDimension);
    setCreateNumLevels(5);
    setCreateLevelMenuIndex(null);
    setCreateLevels([
      { id: 0, level: 0, name: '', isEditable: true },
      { id: 1, level: 1, name: '', isEditable: true },
      { id: 2, level: 2, name: '', isEditable: true },
      { id: 3, level: 3, name: '', isEditable: true },
      { id: 4, level: 4, name: '', isEditable: true },
    ]);
  };

  const openCreatePanel = () => {
    if (createCloseTimeoutRef.current) {
      clearTimeout(createCloseTimeoutRef.current);
      createCloseTimeoutRef.current = null;
    }
    if (editCloseTimeoutRef.current) {
      clearTimeout(editCloseTimeoutRef.current);
      editCloseTimeoutRef.current = null;
    }
    setEditPanelOpen(false);
    setIsEditPanelClosing(false);
    setSelectedHierarchy(null);
    setIsCreatePanelClosing(false);
    setCreatePanelOpen(true);
    resetCreateForm();
  };

  const closeCreatePanel = () => {
    setIsCreatePanelClosing(true);
    createCloseTimeoutRef.current = setTimeout(() => {
      setCreatePanelOpen(false);
      setIsCreatePanelClosing(false);
      resetCreateForm();
      createCloseTimeoutRef.current = null;
    }, CREATE_PANEL_ANIMATION_MS);
  };

  const openEditPanel = (hierarchy) => {
    if (createCloseTimeoutRef.current) {
      clearTimeout(createCloseTimeoutRef.current);
      createCloseTimeoutRef.current = null;
    }
    if (editCloseTimeoutRef.current) {
      clearTimeout(editCloseTimeoutRef.current);
      editCloseTimeoutRef.current = null;
    }
    setCreatePanelOpen(false);
    setIsCreatePanelClosing(false);
    setEditPanelOpen(true);
    setIsEditPanelClosing(false);
    setSelectedHierarchy(hierarchy);
    setEditLevelNames(
      hierarchy.levelNames && hierarchy.levelNames.length > 0
        ? hierarchy.levelNames
        : ['Enter Name', 'Enter Name', 'Enter Name', 'Enter Name', 'Enter Name']
    );
  };

  const closeEditPanel = () => {
    setIsEditPanelClosing(true);
    editCloseTimeoutRef.current = setTimeout(() => {
      setEditPanelOpen(false);
      setIsEditPanelClosing(false);
      setSelectedHierarchy(null);
      setEditLevelNames([]);
      editCloseTimeoutRef.current = null;
    }, CREATE_PANEL_ANIMATION_MS);
  };

  const toggleCreateLevelMenu = (index) => {
    setCreateLevelMenuIndex(createLevelMenuIndex === index ? null : index);
  };

  const handleCreateLevelNameChange = (index, value) => {
    setCreateLevels((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], name: value };
      return updated;
    });
  };

  const handleAddCreateLevel = (index) => {
    const newLevels = [...createLevels];
    const maxId = Math.max(...newLevels.map((level) => level.id));
    const newLevel = {
      id: maxId + 1,
      level: newLevels[index].level + 1,
      name: '',
      isEditable: true
    };

    newLevels.splice(index + 1, 0, newLevel);

    for (let i = index + 2; i < newLevels.length; i += 1) {
      newLevels[i].level = i;
    }

    setCreateLevels(newLevels);
    setCreateNumLevels(newLevels.length);
    setCreateLevelMenuIndex(null);
  };

  const handleDeleteCreateLevel = (index) => {
    if (createLevels.length > 1) {
      const newLevels = createLevels.filter((_, levelIndex) => levelIndex !== index);
      const updatedLevels = newLevels.map((level, levelIndex) => ({
        ...level,
        level: levelIndex
      }));
      setCreateLevels(updatedLevels);
      setCreateNumLevels(updatedLevels.length);
    }

    setCreateLevelMenuIndex(null);
  };

  const handleSaveCreateHierarchy = () => {
    const trimmedHierarchyName = createHierarchyName.trim();
    if (!trimmedHierarchyName) return;

    // Collect level names from the inputs
    const levelNames = createLevels.map((level) => {
      const trimmedName = level.name.trim();
      return trimmedName || 'Enter Name';
    });

    // Build level structure string
    const levelStructure = `${createLevels.length} Levels (${levelNames.join('-->')})`;

    const newHierarchy = {
      id: `new-${Date.now()}`,
      dimension: createDimension,
      hierarchyName: trimmedHierarchyName,
      levelNames: levelNames,
      levelStructure: levelStructure,
      dataStatus: 'Not Synced',
      createdOn: 'May 14, 2026'
    };

    setHierarchies([newHierarchy, ...hierarchies]);
    setSelectedDimension(createDimension);
    closeCreatePanel();
  };

  const toggleMenu = (hierarchyId) => {
    setOpenMenuId(openMenuId === hierarchyId ? null : hierarchyId);
  };

  const handleMenuAction = (action, hierarchy) => {
    setOpenMenuId(null);

    if (action === 'edit') {
      openEditPanel(hierarchy);
      return;
    }

    if (action === 'duplicate') {
      const clonedHierarchy = {
        ...hierarchy,
        id: `clone-${Date.now()}`,
        hierarchyName: `Clone of ${hierarchy.hierarchyName}`,
        dataStatus: 'Not Synced',
        createdOn: 'May 14, 2026'
      };
      setHierarchies([clonedHierarchy, ...hierarchies]);
      return;
    }

    if (action === 'delete') {
      setHierarchies(hierarchies.filter((item) => item.id !== hierarchy.id));
    }
  };

  const handleEditLevelNameChange = (index, value) => {
    setEditLevelNames((prev) => prev.map((name, i) => (i === index ? value : name)));
  };

  const handleSaveEditedHierarchy = () => {
    if (!selectedHierarchy) return;

    const normalizedLevelNames = editLevelNames.map((name) => name.trim() || 'Enter Name');
    const updatedLevelStructure = `${normalizedLevelNames.length} Levels (${normalizedLevelNames.join('-->')})`;

    setHierarchies((prev) => prev.map((hierarchy) => (
      hierarchy.id === selectedHierarchy.id
        ? {
          ...hierarchy,
          levelNames: normalizedLevelNames,
          levelStructure: updatedLevelStructure
        }
        : hierarchy
    )));

    setSelectedHierarchy((prev) => (
      prev
        ? { ...prev, levelNames: normalizedLevelNames, levelStructure: updatedLevelStructure }
        : prev
    ));
    closeEditPanel();
  };

  const handleGoToHierarchySetup = () => {
    onClose();
    if (onGoToHierarchySetup) {
      onGoToHierarchySetup();
    }
  };

  useEffect(() => {
    return () => {
      if (createCloseTimeoutRef.current) {
        clearTimeout(createCloseTimeoutRef.current);
      }
      if (editCloseTimeoutRef.current) {
        clearTimeout(editCloseTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-hierarchies-2" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-simple">
          <h2 className="modal-title">Manage Hierarchies 2</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        <div className="modal-body-simple manage-hierarchies-2-body">
          <div className="manage-hierarchies-2-panel manage-hierarchies-2-panel-left">
            <p className="manage-hierarchies-2-panel-title">Dimensions</p>
            <div className="manage-hierarchies-2-dimension-list">
              {dimensions.map((dimension) => (
                <button
                  key={dimension}
                  type="button"
                  className={`manage-hierarchies-2-dimension-item ${selectedDimension === dimension ? 'active' : ''}`}
                  onClick={() => setSelectedDimension(dimension)}
                >
                  {dimension}
                </button>
              ))}
            </div>
            <div className="manage-hierarchies-2-info-box">
              <p className="manage-hierarchies-2-info-title">Need advanced setup?</p>
              <p className="manage-hierarchies-2-info-text">
                Go to Hierarchy Setup to import hierarchy structures, manage detailed mappings, and configure advanced options.
              </p>
              <button
                type="button"
                className="step-button step-button-outlined"
                onClick={handleGoToHierarchySetup}
              >
                Go to Hierarchy Setup
              </button>
            </div>
          </div>

          <div className="manage-hierarchies-2-panel manage-hierarchies-2-panel-right">
            <div className="manage-hierarchies-2-panel-header">
              {createPanelOpen ? (
                <>
                  <div className="manage-hierarchies-2-create-header-left">
                    <button
                      type="button"
                      className="manage-hierarchies-2-back-button"
                      onClick={closeCreatePanel}
                    >
                      ← Back
                    </button>
                    <p className="manage-hierarchies-2-panel-title">Create New Hierarchy</p>
                  </div>
                  <div className="edit-panel-header-actions">
                    <button type="button" className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeCreatePanel}>
                      Cancel
                    </button>
                    <button type="button" className="edit-panel-text-button edit-panel-text-button-save" onClick={handleSaveCreateHierarchy}>
                      Save
                    </button>
                  </div>
                </>
              ) : editPanelOpen ? (
                <>
                  <div className="manage-hierarchies-2-create-header-left">
                    <button
                      type="button"
                      className="manage-hierarchies-2-back-button"
                      onClick={closeEditPanel}
                    >
                      ← Back
                    </button>
                    <p className="manage-hierarchies-2-panel-title">Edit Hierarchy</p>
                  </div>
                  <div className="edit-panel-header-actions">
                    <button type="button" className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeEditPanel}>
                      Cancel
                    </button>
                    <button type="button" className="edit-panel-text-button edit-panel-text-button-save" onClick={handleSaveEditedHierarchy}>
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="manage-hierarchies-2-panel-title">
                    Available Hierarchies ({filteredHierarchies.length})
                  </p>
                  <button type="button" className="hierarchies-create-button" onClick={openCreatePanel}>
                    Create New
                  </button>
                </>
              )}
            </div>

            <div className="measures-info-bar" style={{ margin: '0 0 8px' }}>
              <span className="measures-info-bar-text">Need more context on these hierarchies?</span>
              <button className="measures-info-bar-link" onClick={handleGoToHierarchySetup}>
                Go to Setup for more details
              </button>
            </div>

            <div className="manage-hierarchies-2-content-stage">
              <div className="manage-hierarchies-2-table-container">
                <table className="manage-hierarchies-2-table">
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
                    {filteredHierarchies.map((hierarchy) => (
                      <tr key={hierarchy.id}>
                        <td>
                          <button
                            type="button"
                            className="manage-hierarchies-2-link manage-hierarchies-2-link-button"
                            onClick={() => openEditPanel(hierarchy)}
                          >
                            {hierarchy.hierarchyName}
                          </button>
                        </td>
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
                            <button
                              type="button"
                              className="table-row-dropdown"
                              onClick={() => toggleMenu(hierarchy.id)}
                            >
                              <img src={imgDownIcon} alt="Actions" />
                            </button>
                            {openMenuId === hierarchy.id && (
                              <div className="dropdown-menu">
                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleMenuAction('edit', hierarchy)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleMenuAction('duplicate', hierarchy)}
                                >
                                  Clone
                                </button>
                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleMenuAction('sync', hierarchy)}
                                >
                                  Sync Now
                                </button>
                                <div className="dropdown-menu-divider"></div>
                                <button
                                  type="button"
                                  className="dropdown-menu-item dropdown-menu-item-danger"
                                  onClick={() => handleMenuAction('delete', hierarchy)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {createPanelOpen && (
                <div className={`edit-panel-body manage-hierarchies-2-create-body ${isCreatePanelClosing ? 'slide-out' : 'slide-in'}`}>
                  <div className="clone-form-section">
                    <label className="clone-form-label">
                      * New Hierarchy Name
                    </label>
                    <input
                      type="text"
                      className="clone-form-input"
                      value={createHierarchyName}
                      onChange={(e) => setCreateHierarchyName(e.target.value)}
                      placeholder="Enter Hierarchy Name"
                    />
                  </div>

                  <div className="clone-form-section">
                    <label className="clone-form-label">
                      Dimension
                    </label>
                    <select
                      className="clone-form-input clone-form-select"
                      value={createDimension}
                      onChange={(e) => setCreateDimension(e.target.value)}
                    >
                      {dimensions.map((dimension) => (
                        <option key={dimension} value={dimension}>{dimension}</option>
                      ))}
                    </select>
                  </div>

                  <div className="clone-form-section">
                    <div className="clone-form-label-row">
                      <label className="clone-form-label">
                        Enter Number of Levels for your hierarchy
                      </label>
                      <button type="button" className="clone-info-icon">ⓘ</button>
                    </div>
                    <div className="clone-level-control">
                      <button
                        type="button"
                        className="clone-level-button"
                        onClick={() => {
                          if (createLevels.length > 1) {
                            const newLevels = createLevels.slice(0, -1);
                            setCreateLevels(newLevels);
                            setCreateNumLevels(newLevels.length);
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
                          const newLevels = [...createLevels];
                          const maxId = Math.max(...newLevels.map((level) => level.id));
                          newLevels.push({
                            id: maxId + 1,
                            level: newLevels.length,
                            name: '',
                            isEditable: true
                          });
                          setCreateLevels(newLevels);
                          setCreateNumLevels(newLevels.length);
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
                        const isLastLevel = index === createLevels.length - 1;
                        const indentClass = levelData.level > 0 ? `clone-table-row-indent-${levelData.level}` : '';

                        return (
                          <div key={levelData.id} className={`clone-table-row ${indentClass}`}>
                            <div className="clone-table-cell">
                              {isLastLevel ? (
                                <button type="button" className="clone-chevron-empty"></button>
                              ) : (
                                <button type="button" className="clone-chevron">›</button>
                              )}
                              <span className="clone-level-text">{createDimension} L{levelData.level}</span>
                            </div>
                            <div className="clone-table-cell">
                              <input
                                type="text"
                                className="clone-name-input"
                                placeholder="Enter Name"
                                value={levelData.name}
                                onChange={(e) => handleCreateLevelNameChange(index, e.target.value)}
                              />
                            </div>
                            <div className="clone-table-cell clone-table-cell-actions">
                              <div className="clone-level-dropdown-wrapper">
                                <button
                                  type="button"
                                  className="clone-level-dropdown-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCreateLevelMenu(index);
                                  }}
                                >
                                  <img src={imgDownIcon} alt="Actions" />
                                </button>
                                {createLevelMenuIndex === index && (
                                  <div className="clone-level-dropdown-menu">
                                    <button
                                      type="button"
                                      className="clone-level-dropdown-item"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddCreateLevel(index);
                                      }}
                                    >
                                      Add Level
                                    </button>
                                    <button
                                      type="button"
                                      className="clone-level-dropdown-item"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCreateLevel(index);
                                      }}
                                    >
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
              )}
              {editPanelOpen && (
                <div className={`edit-panel-body manage-hierarchies-2-edit-body ${isEditPanelClosing ? 'slide-out' : 'slide-in'}`}>
                  <div className="edit-panel-section-title">
                    <p>{selectedHierarchy?.hierarchyName || 'Hierarchy'}</p>
                  </div>

                  <div className="edit-panel-notification">
                    <div className="notification-icon">ⓘ</div>
                    <p className="notification-text">
                      You can only edit the level names but not no.of levels
                    </p>
                  </div>

                  <div className="edit-panel-tree">
                    <div className="tree-header">
                      <div className="tree-header-cell">Hierarchy Level</div>
                      <div className="tree-header-cell">Name</div>
                    </div>

                    {editLevelNames.map((levelName, index) => {
                      const rowClass = index > 0 ? `tree-row tree-row-level-${index}` : 'tree-row';
                      const isLastLevel = index === editLevelNames.length - 1;

                      return (
                        <div key={`${selectedHierarchy?.id || 'hierarchy'}-level-${index}`} className={rowClass}>
                          <div className="tree-cell">
                            <button type="button" className={`tree-chevron ${isLastLevel ? 'tree-chevron-empty' : ''}`}>›</button>
                            <span className="tree-node-link">{selectedHierarchy?.dimension || 'Account'} L{index}</span>
                          </div>
                          <div className="tree-cell">
                            <input
                              type="text"
                              className="tree-input"
                              value={levelName}
                              onChange={(e) => handleEditLevelNameChange(index, e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="modal-done-button" 
            onClick={onClose}
            disabled={createPanelOpen || editPanelOpen}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
