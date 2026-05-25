import React, { useMemo, useState } from 'react';

const imgSuccessIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' fill='%2306914d'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";

const dimensions = [
  { id: 'account', name: 'Account', count: 1 },
  { id: 'product', name: 'Product', count: 1 },
];

const initialHierarchyData = {
  account: [
    {
      id: 'acc-1',
      hierarchyName: 'AccountSales',
      levelStructure: '3 Levels (HQ-->Regional-->Country)',
      dataStatus: 'Data Ingestion Complete',
      createdOn: 'Mar 23 2026',
    },
  ],
  product: [
    {
      id: 'prod-1',
      hierarchyName: 'ProductCatalog',
      levelStructure: '3 Levels (Category-->Family-->SKU)',
      dataStatus: 'Data Ingestion Complete',
      createdOn: 'Apr 10 2026',
    },
  ],
};

export default function HierarchySetupPage() {
  const [selectedDimension, setSelectedDimension] = useState('account');
  const [hierarchyData, setHierarchyData] = useState(initialHierarchyData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const rows = useMemo(() => hierarchyData[selectedDimension] || [], [hierarchyData, selectedDimension]);
  const selectedDimensionMeta = useMemo(
    () => dimensions.find((dimension) => dimension.id === selectedDimension),
    [selectedDimension]
  );

  const resetCreateForm = () => {
    setCreateHierarchyName('');
    setCreateDimension(selectedDimension === 'account' ? 'Account' : 'Product');
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

  const openCreateModal = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateLevelMenuIndex(null);
  };

  const updateLevelName = (index, value) => {
    setCreateLevels((prev) => prev.map((level, levelIndex) => (
      levelIndex === index ? { ...level, name: value } : level
    )));
  };

  const addLevel = () => {
    setCreateLevels((prev) => {
      const maxId = Math.max(...prev.map((level) => level.id));
      const nextLevels = [
        ...prev,
        { id: maxId + 1, level: prev.length, name: '' },
      ];
      setCreateNumLevels(nextLevels.length);
      return nextLevels;
    });
  };

  const removeLevel = () => {
    setCreateLevels((prev) => {
      if (prev.length <= 1) return prev;
      const nextLevels = prev.slice(0, -1).map((level, index) => ({ ...level, level: index }));
      setCreateNumLevels(nextLevels.length);
      return nextLevels;
    });
  };

  const handleAddCreateLevel = (index) => {
    const newLevels = [...createLevels];
    const maxId = Math.max(...newLevels.map((level) => level.id));
    const newLevel = {
      id: maxId + 1,
      level: newLevels[index].level + 1,
      name: ''
    };

    newLevels.splice(index + 1, 0, newLevel);
    const normalizedLevels = newLevels.map((level, levelIndex) => ({ ...level, level: levelIndex }));
    setCreateLevels(normalizedLevels);
    setCreateNumLevels(normalizedLevels.length);
    setCreateLevelMenuIndex(null);
  };

  const handleDeleteCreateLevel = (index) => {
    if (createLevels.length <= 1) return;
    const newLevels = createLevels
      .filter((_, levelIndex) => levelIndex !== index)
      .map((level, levelIndex) => ({ ...level, level: levelIndex }));
    setCreateLevels(newLevels);
    setCreateNumLevels(newLevels.length);
    setCreateLevelMenuIndex(null);
  };

  const handleSaveCreateHierarchy = () => {
    const name = createHierarchyName.trim();
    if (!name) return;

    const key = createDimension.toLowerCase();
    const newRow = {
      id: `new-${Date.now()}`,
      hierarchyName: name,
      levelStructure: `${createLevels.length} Levels (${createLevels
        .map((level) => level.name.trim())
        .filter(Boolean)
        .join('-->') || 'Custom'})`,
      dataStatus: 'Data Ingestion Complete',
      createdOn: 'May 18 2026',
    };

    setHierarchyData((prev) => ({
      ...prev,
      [key]: [newRow, ...(prev[key] || [])],
    }));
    setSelectedDimension(key);
    closeCreateModal();
  };

  return (
    <div className="hierarchy-setup-page">
      <div className="planning-view-title-section" style={{ marginBottom: '10px' }}>
        <h1 className="planning-view-title">Dimensions &amp; Hierarchies</h1>
      </div>

      <div className="hierarchy-setup-master-container">
        <div className="hierarchy-setup-toolbar">
          <div className="hierarchy-setup-header-actions">
            <button type="button" className="hierarchies-sync-button">Sync to Data Cloud</button>
            <button type="button" className="hierarchies-create-button" onClick={openCreateModal}>
              + Create hierarchy
            </button>
          </div>
        </div>

        <div className="hierarchy-setup-content">
          <aside className="hierarchy-setup-dimensions-panel">
            <p className="hierarchy-setup-panel-label">Dimensions</p>
            {dimensions.map((dimension) => (
              <button
                key={dimension.id}
                type="button"
                className={`hierarchy-setup-dimension-item ${selectedDimension === dimension.id ? 'active' : ''}`}
                onClick={() => setSelectedDimension(dimension.id)}
              >
                {dimension.name} ({dimension.count} hierarchy)
              </button>
            ))}
          </aside>

          <section className="hierarchy-setup-table-panel">
            <div className="hierarchy-setup-table-headline">
              Hierarchy Structures ({selectedDimensionMeta?.count || 0})
            </div>
            <table className="hierarchy-setup-table">
              <thead>
                <tr>
                  <th>Hierarchy Name</th>
                  <th>Level Structure</th>
                  <th>Data Status</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <button type="button" className="hierarchy-setup-link">{row.hierarchyName}</button>
                    </td>
                    <td>{row.levelStructure}</td>
                    <td>
                      <span className="hierarchy-setup-status">
                        <img src={imgSuccessIcon} alt="" />
                        {row.dataStatus}
                      </span>
                    </td>
                    <td>{row.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={closeCreateModal}>
          <div className="modal-container hierarchy-create-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header modal-header-simple">
              <div className="modal-header-content">
                <h2 className="modal-title">Create New Hierarchy</h2>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-content hierarchy-create-modal-body">
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
                    <button type="button" className="clone-level-button" onClick={removeLevel}>−</button>
                    <span className="clone-level-value">{createNumLevels}</span>
                    <button type="button" className="clone-level-button" onClick={addLevel}>+</button>
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
                      return (
                        <div key={levelData.id} className={`clone-table-row ${indentClass}`}>
                          <div className="clone-table-cell">
                            <button type="button" className={index === createLevels.length - 1 ? 'clone-chevron-empty' : 'clone-chevron'}>
                              ›
                            </button>
                            <span className="clone-level-text">{createDimension} L{levelData.level}</span>
                          </div>
                          <div className="clone-table-cell">
                            <input
                              type="text"
                              className="clone-name-input"
                              placeholder="Enter Name"
                              value={levelData.name}
                              onChange={(e) => updateLevelName(index, e.target.value)}
                            />
                          </div>
                          <div className="clone-table-cell clone-table-cell-actions">
                            <div className="clone-level-dropdown-wrapper">
                              <button
                                type="button"
                                className="clone-level-dropdown-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCreateLevelMenuIndex(createLevelMenuIndex === index ? null : index);
                                }}
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

            <div className="modal-footer">
              <button type="button" className="modal-cancel-button" onClick={closeCreateModal}>
                Cancel
              </button>
              <button type="button" className="modal-save-button" onClick={handleSaveCreateHierarchy}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
