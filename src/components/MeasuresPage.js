import React, { useState } from 'react';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";
const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";
const imgChevronDown = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgSparkIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 1.5l1 2.2 2.2 1-2.2 1-1 2.3-1-2.3-2.2-1 2.2-1 1-2.2z' fill='%230176d3'/%3E%3C/svg%3E";

export default function MeasuresPage({ onNavigateToPlanConfig, onNavigateToHierarchySetup }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [measureTypeFilter, setMeasureTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCreateMeasureType, setSelectedCreateMeasureType] = useState(null);
  const [newMeasureFormValues, setNewMeasureFormValues] = useState({
    measureName: '',
    description: '',
    valueType: 'Volume',
    roundingPrecision: '',
    aggregationRule: '',
    calculatedExpression: '',
    measureCode: '',
    writebackEnabled: false,
  });

  const availableMeasureTypes = [
    { id: 'Read only', icon: '🧾', title: 'Read only' },
    { id: 'Editable', icon: '✎', title: 'Editable' },
    { id: 'Calculated', icon: '+', title: 'Calculated' },
  ];

  const [measures] = useState([
    { id: 1, name: 'Planned Volume', description: 'Planned Volume', measureType: 'Read', sourceDmo: 'Plan_Volume', measureCode: 'BASL1', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume' },
    { id: 2, name: 'Previous Year Volume', description: 'Previous Year Volume', measureType: 'Read', sourceDmo: 'Prev_Plan_Volume', measureCode: 'BASL2', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume' },
    { id: 3, name: 'Forecasted Volume', description: 'Forecasted Volume', measureType: 'Calculated', sourceDmo: 'Forecasted_Vol', measureCode: 'BASL3', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume' },
    { id: 4, name: 'Target Volume', description: 'Target Volume', measureType: 'Calculated', sourceDmo: 'Targ_Vol', measureCode: 'BASL4', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume' },
    { id: 5, name: 'Revenue', description: 'Revenue', measureType: 'Read', sourceDmo: 'Rev', measureCode: 'BASL5', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials' },
    { id: 6, name: 'Promo Spend %', description: 'Promo Spend %', measureType: 'Calculated', sourceDmo: 'Prom_Spend', measureCode: 'BASL6', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials' },
    { id: 7, name: 'Market Share %', description: 'Market Share %', measureType: 'Calculated', sourceDmo: 'Mar_share', measureCode: 'BASL7', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Market/Execution' },
    { id: 8, name: 'Days of Inventory', description: 'Days of Inventory', measureType: 'Calculated', sourceDmo: 'DOI', measureCode: 'BASL8', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Market/Execution' },
    { id: 9, name: 'Trade ROI', description: 'Trade ROI', measureType: 'Calculated', sourceDmo: 'TROI', measureCode: 'BASL9', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Operations' },
    { id: 10, name: 'Baseline Volume', description: 'Baseline Volume', measureType: 'Calculated', sourceDmo: 'Base_Vol', measureCode: 'BASL11', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume' },
  ]);

  const measureTypeOptions = [...new Set(measures.map((m) => m.measureType))];
  const categoryOptions = [...new Set(measures.map((m) => m.category))];

  const filteredMeasures = measures.filter((measure) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      measure.name.toLowerCase().includes(normalizedSearch) ||
      measure.description.toLowerCase().includes(normalizedSearch);

    const matchesMeasureType = measureTypeFilter === 'all' || measure.measureType === measureTypeFilter;
    const matchesCategory = categoryFilter === 'all' || measure.category === categoryFilter;
    return matchesSearch && matchesMeasureType && matchesCategory;
  });

  const handleOpenCreateModal = () => {
    setSelectedCreateMeasureType(null);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedCreateMeasureType(null);
    setNewMeasureFormValues({
      measureName: '',
      description: '',
      valueType: 'Volume',
      roundingPrecision: '',
      aggregationRule: '',
      calculatedExpression: '',
      measureCode: '',
      writebackEnabled: false,
    });
  };

  const handleSaveCreateModal = () => {
    handleCloseCreateModal();
  };

  const getCategoryClassName = (category) => {
    const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `measure-category-badge measure-category-${normalizedCategory}`;
  };

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
            <span>Account Planning &amp; Forec...</span>
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
          <div className="hierarchy-setup-nav-item hierarchy-setup-nav-selected">
            <span className="hierarchy-setup-nav-indent" />
            <span>Measures</span>
          </div>
          <div className="hierarchy-setup-nav-item">
            <span className="hierarchy-setup-nav-indent" />
            <button
              type="button"
              className="side-nav-link-button"
              onClick={onNavigateToPlanConfig}
            >
              Plan Configuration
            </button>
          </div>
        </div>
      </aside>

      <div className="measures-page-content">
        <div className="planning-view-page">
          <div className="planning-view-header">
            <div className="planning-view-title-section">
              <h1 className="planning-view-title">Measures</h1>
              <p className="planning-view-subtitle">{measures.length} Measures</p>
            </div>
            <div className="planning-view-actions">
              <button className="planning-view-button planning-view-button-primary" onClick={handleOpenCreateModal}>
                + Create new
              </button>
            </div>
          </div>

          <div className="planning-view-card">
            <div className="planning-view-card-header">
              <div className="planning-view-filters-row">
                <div className="planning-view-search">
                  <img src={imgSearchIcon} alt="Search" />
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <select className="planning-view-filter-select" value={measureTypeFilter} onChange={(e) => setMeasureTypeFilter(e.target.value)}>
                  <option value="all">Measure Type</option>
                  {measureTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <select className="planning-view-filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="all">Category</option>
                  {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>

            <div className="planning-view-table-container">
              <table className="planning-view-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" aria-label="Select all measures" />
                    </th>
                    <th>Measure Name</th>
                    <th>Description</th>
                    <th>Measure Type</th>
                    <th>Source DMO</th>
                    <th>Measure Code</th>
                    <th>Aggregati...</th>
                    <th>Disaggr...</th>
                    <th>Category</th>
                    <th className="table-cell-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeasures.map((measure) => (
                    <tr key={measure.id}>
                      <td>
                        <input type="checkbox" aria-label={`Select ${measure.name}`} />
                      </td>
                      <td style={{ color: '#0176d3', cursor: 'pointer' }}>{measure.name}</td>
                      <td>{measure.description}</td>
                      <td>{measure.measureType}</td>
                      <td>{measure.sourceDmo}</td>
                      <td>{measure.measureCode}</td>
                      <td>{measure.aggregation}</td>
                      <td>{measure.disaggregation}</td>
                      <td>
                        <span className={getCategoryClassName(measure.category)}>{measure.category}</span>
                      </td>
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

      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={handleCloseCreateModal}>
          <div
            className="modal-container measures-create-modal measures-create-modal-form"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Create New Measure</h2>
              <button className="modal-close-button" onClick={handleCloseCreateModal}>×</button>
            </div>
            <div className="modal-body measures-create-modal-body measures-create-modal-body-form">
              <div className="modal-content measures-create-modal-content">
                <div className="edit-form-field planning-grid-create-type-field">
                  <label className="edit-form-label">Select type of measure you want to create</label>
                </div>
                <div className="planning-grid-measure-type-cards">
                  {availableMeasureTypes.map((typeOption) => (
                    <button
                      key={typeOption.id}
                      type="button"
                      className={`planning-grid-measure-type-card ${selectedCreateMeasureType === typeOption.id ? 'active' : ''}`}
                      onClick={() => setSelectedCreateMeasureType(typeOption.id)}
                    >
                      <span className="planning-grid-measure-type-icon">{typeOption.icon}</span>
                      <div className="planning-grid-measure-type-content">
                        <div className="planning-grid-measure-type-title">{typeOption.title}</div>
                        <div className="planning-grid-measure-type-description">
                          This is a new potential customer not a part of the system yet
                        </div>
                      </div>
                      {selectedCreateMeasureType === typeOption.id && (
                        <span className="planning-grid-measure-type-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>

                {selectedCreateMeasureType ? (
                  <div className="measures-create-form">
                    <div className="measure-section">
                      <h4 className="measure-section-title">Information</h4>
                      <div className="measures-create-form-grid">
                        <div className="edit-form-field measures-create-field-full">
                          <label className="edit-form-label">* Measure Name</label>
                          <input
                            type="text"
                            className="edit-form-input"
                            value={newMeasureFormValues.measureName}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, measureName: e.target.value }))}
                            placeholder="Enter measure name..."
                          />
                        </div>

                        <div className="edit-form-field measures-create-field-full">
                          <label className="edit-form-label">* Measure Type</label>
                          <div className="measures-create-readonly-value">{selectedCreateMeasureType || ''}</div>
                        </div>

                        <div className="edit-form-field measures-create-field-full">
                          <label className="edit-form-label">* Description</label>
                          <textarea
                            className="edit-form-textarea"
                            rows="3"
                            value={newMeasureFormValues.description}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter description..."
                          />
                        </div>

                        <div className="edit-form-field">
                          <label className="edit-form-label">* Value Type</label>
                          <select
                            className="edit-form-select"
                            value={newMeasureFormValues.valueType}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, valueType: e.target.value }))}
                          >
                            <option value="Volume">Volume</option>
                            <option value="Currency">Currency</option>
                            <option value="Percent">Percent</option>
                            <option value="Score">Score</option>
                          </select>
                        </div>

                        <div className="edit-form-field">
                          <label className="edit-form-label">* Rounding Precision</label>
                          <select
                            className="edit-form-select"
                            value={newMeasureFormValues.roundingPrecision}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, roundingPrecision: e.target.value }))}
                          >
                            <option value="">Select</option>
                            <option value="0">0 Decimal</option>
                            <option value="1">1 Decimal</option>
                            <option value="2">2 Decimal</option>
                            <option value="3">3 Decimal</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="measure-section">
                      <h4 className="measure-section-title">Aggregation / Disaggregation Settings</h4>
                      <div className="measures-create-form-grid">
                        <div className="edit-form-field measures-create-field-half">
                          <label className="edit-form-label">* Aggregation Rule</label>
                          <select
                            className="edit-form-select"
                            value={newMeasureFormValues.aggregationRule}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, aggregationRule: e.target.value }))}
                          >
                            <option value="">Select</option>
                            <option value="SUM">SUM</option>
                            <option value="AVG">AVG</option>
                            <option value="COUNT">COUNT</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="measure-section">
                      <h4 className="measure-section-title">Settings</h4>
                      <div className="measures-create-form-grid">
                        {selectedCreateMeasureType === 'Calculated' && (
                          <div className="edit-form-field measures-create-field-full">
                            <label className="edit-form-label">* Calculated Expression</label>
                            <div className="formula-builder">
                              <div className="formula-inputs">
                                <div className="source-search-wrapper">
                                  <input type="text" className="edit-form-input formula-input" placeholder="Search measures" />
                                </div>
                                <div className="source-search-wrapper">
                                  <input type="text" className="edit-form-input formula-input" placeholder="Select function" />
                                </div>
                                <div className="source-search-wrapper">
                                  <input type="text" className="edit-form-input formula-input" placeholder="Select operator" />
                                </div>
                              </div>
                              <textarea
                                className="edit-form-textarea formula-textarea"
                                placeholder="Enter formula..."
                                rows="4"
                                value={newMeasureFormValues.calculatedExpression}
                                onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, calculatedExpression: e.target.value }))}
                              />
                              <button type="button" className="check-syntax-button">Check Syntax</button>
                            </div>
                          </div>
                        )}

                        <div className="edit-form-field measures-create-field-half">
                          <label className="edit-form-label">* Measure Code</label>
                          <input
                            type="text"
                            className="edit-form-input"
                            value={newMeasureFormValues.measureCode}
                            onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, measureCode: e.target.value }))}
                            placeholder="Enter measure code..."
                          />
                        </div>

                        {selectedCreateMeasureType === 'Editable' && (
                          <div className="edit-form-field measures-create-field-half">
                            <label className="writeback-checkbox-label">
                              <input
                                type="checkbox"
                                className="writeback-checkbox"
                                checked={newMeasureFormValues.writebackEnabled}
                                onChange={(e) => setNewMeasureFormValues((prev) => ({ ...prev, writebackEnabled: e.target.checked }))}
                              />
                              <span>Writeback enabled</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="planning-grid-create-measure-placeholder">
                    Select a measure type to continue.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer-buttons measures-create-modal-footer">
              <button className="modal-cancel-button" onClick={handleCloseCreateModal}>Cancel</button>
              <button
                className="modal-save-button"
                onClick={handleSaveCreateModal}
                disabled={!selectedCreateMeasureType}
                style={{ opacity: selectedCreateMeasureType ? 1 : 0.5, cursor: selectedCreateMeasureType ? 'pointer' : 'not-allowed' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
