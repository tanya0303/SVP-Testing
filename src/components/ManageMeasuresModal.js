import React, { useState } from 'react';
import Toast from './Toast';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";

const imgSparkleIcon = "data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2695 15.4912L16.0808 17.5755C14.8224 18.2027 13.8045 19.2172 13.1753 20.4715L11.084 24.6463C10.7879 25.2427 9.93041 25.2427 9.6343 24.6463L7.54304 20.4715C6.91381 19.2172 5.89594 18.2027 4.63748 17.5755L0.448789 15.4912C-0.149596 15.196 -0.149596 14.3414 0.448789 14.0463L4.63748 11.9619C5.89594 11.3348 6.91381 10.3203 7.54304 9.06597L9.6343 4.89114C9.93041 4.29473 10.7879 4.29473 11.084 4.89114L13.1753 9.06597C13.8045 10.3203 14.8224 11.3348 16.0808 11.9619L20.2695 14.0463C20.8679 14.3414 20.8679 15.196 20.2695 15.4912ZM29.4057 24.7754L27.6105 23.8777C27.0677 23.6133 26.6358 23.1706 26.3644 22.6357L25.4637 20.8465C25.3404 20.5883 24.9702 20.5883 24.8407 20.8465L23.94 22.6357C23.6748 23.1768 23.2306 23.6072 22.6939 23.8777L20.8987 24.7754C20.6397 24.8984 20.6397 25.2673 20.8987 25.3964L22.6939 26.2941C23.2368 26.5585 23.6686 27.0012 23.94 27.5361L24.8407 29.3253C24.9641 29.5835 25.3342 29.5835 25.4637 29.3253L26.3644 27.5361C26.6297 26.995 27.0738 26.5646 27.6105 26.2941L29.4057 25.3964C29.6648 25.2734 29.6648 24.9045 29.4057 24.7754ZM29.4057 4.12257L27.6105 3.22489C27.0677 2.96051 26.6358 2.51781 26.3644 1.98289L25.4637 0.193678C25.3404 -0.0645593 24.9702 -0.0645593 24.8407 0.193678L23.94 1.98289C23.6748 2.52396 23.2306 2.95436 22.6939 3.22489L20.8987 4.12257C20.6397 4.24554 20.6397 4.61445 20.8987 4.74357L22.6939 5.64125C23.2368 5.90564 23.6686 6.34833 23.94 6.88325L24.8407 8.67247C24.9641 8.93071 25.3342 8.93071 25.4637 8.67247L26.3644 6.88325C26.6297 6.34218 27.0738 5.91179 27.6105 5.64125L29.4057 4.74357C29.6648 4.6206 29.6648 4.25169 29.4057 4.12257Z' fill='%230250D9'/%3E%3C/svg%3E";

const imgSendIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 10L18 2L10 18L8 11L2 10Z' fill='%230176d3' stroke='%230176d3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function ManageMeasuresModal({
  isOpen,
  onClose,
  onGoToSetupDetails,
  sourceDmoInputs: externalSourceDmoInputs,
  onSourceDmoInputsChange
}) {
  const agenticMeasureCreateEnabled = false;
  const measureBulkActionsEnabled = false;
  const measureSubsetsTabEnabled = false;
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [clonePanelOpen, setClonePanelOpen] = useState(false);
  const [deletePanelOpen, setDeletePanelOpen] = useState(false);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [sourceSearchTerm, setSourceSearchTerm] = useState('');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [hoveredSubsetIndex, setHoveredSubsetIndex] = useState(null);
  const [selectedSubsets, setSelectedSubsets] = useState([]);
  const [subsetSearchTerm, setSubsetSearchTerm] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [generatedMeasure, setGeneratedMeasure] = useState(null);
  const [showFormFromChat, setShowFormFromChat] = useState(false);
  const [assignSubsetPanelOpen, setAssignSubsetPanelOpen] = useState(false);
  const [selectedSubsetsForAssignment, setSelectedSubsetsForAssignment] = useState([]);
  const [showSubsetDropdown, setShowSubsetDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDescription, setToastDescription] = useState('');
  const [localSourceDmoInputs, setLocalSourceDmoInputs] = useState({});
  const [measureCodeInputs, setMeasureCodeInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [aggregationFilter, setAggregationFilter] = useState('all');
  const sourceDmoInputs = externalSourceDmoInputs ?? localSourceDmoInputs;

  const updateSourceDmoInputs = (updater) => {
    const nextValue = typeof updater === 'function' ? updater(sourceDmoInputs) : updater;
    if (typeof onSourceDmoInputsChange === 'function') {
      onSourceDmoInputsChange(nextValue);
    } else {
      setLocalSourceDmoInputs(nextValue);
    }
  };

  if (!isOpen) return null;
  
  const showSuccessToast = (message, description = '') => {
    setToastMessage(message);
    setToastDescription(description);
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const handleGoToSetupDetails = () => {
    onClose();
    if (typeof onGoToSetupDetails === 'function') {
      onGoToSetupDetails();
    }
  };

  // Available source names
  const sourceNames = [
    'SalesAgreement',
    'OpportunityLineItem',
    'Trade Promotion',
    'Account Budget',
    'Deduction',
    'Opportunity',
    'Territory',
    'Goal',
    'Account',
    'Contact',
    'Campaign',
    'Lead'
  ];

  // Available measure subsets
  const availableSubsets = [
    'SalesAgreement',
    'Baseline',
    'Promotions',
    'Trade',
    'Revenue',
    'Budget',
    'Fund',
    'Deductions',
    'Forecast',
    'Pipeline',
    'Quota',
    'Performance',
    'Marketing',
    'Campaigns',
    'ROI',
    'Analytics',
    'Sales',
    'Net Value',
    'Finance',
    'Planning',
    'Allocation',
    'Adjustments',
    'Future',
    'Opportunities',
    'Weighted',
    'Goals',
    'Targets',
    'Attainment',
    'Win Rate',
    'Success',
    'Metrics',
    'KPI'
  ];

  const filteredSources = sourceNames.filter(source =>
    source.toLowerCase().includes(sourceSearchTerm.toLowerCase())
  );

  const toggleSubset = (subset) => {
    setSelectedSubsets(prev => 
      prev.includes(subset) 
        ? prev.filter(s => s !== subset)
        : [...prev, subset]
    );
  };

  // Filter subsets based on search and toggle
  const filteredSubsets = availableSubsets.filter(subset => {
    const matchesSearch = subset.toLowerCase().includes(subsetSearchTerm.toLowerCase());
    const matchesToggle = !showSelectedOnly || selectedSubsets.includes(subset);
    return matchesSearch && matchesToggle;
  });

  // Sample measures data - exact values from Figma
  const measures = [
    { subsets: ['SalesAgreement', 'Revenue', 'Q1 Sales', 'Annual'], name: 'Sales Agreement Quantity', unit: 'volume', dataType: 'Number', aggregation: 'Sum', sourceName: 'SalesAgreement', selected: false },
    { subsets: ['Baseline', 'Forecast', 'Actuals'], name: 'Baseline Volume', unit: 'volume', dataType: 'Number', aggregation: 'Sum', sourceName: 'OpportunityLineItem', selected: false },
    { subsets: ['Promotions', 'Marketing', 'Campaigns'], name: 'Promotional Lift', unit: 'volume', dataType: 'Number', aggregation: 'Sum', sourceName: 'Trade Promotion', selected: false },
    { subsets: ['Trade', 'ROI', 'Performance', 'Analytics'], name: 'Trade ROI', unit: '%', dataType: 'Percent', aggregation: 'Average', sourceName: 'Trade Promotion', selected: false },
    { subsets: ['Revenue', 'Sales', 'Net Value'], name: 'Net Sales Value (NSV)', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', sourceName: 'OpportunityLineItem', selected: false },
    { subsets: ['Budget', 'Finance', 'Planning'], name: 'Remaining Budget', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', sourceName: 'Account Budget', selected: false },
    { subsets: ['Fund', 'Allocation', 'Budget', 'Trade'], name: 'Fund Allocation', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', sourceName: 'Trade Promotion', selected: false },
    { subsets: ['Deductions', 'Adjustments'], name: 'Deduction Amount', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', sourceName: 'Deduction', selected: false },
    { subsets: ['Forecast', 'Pipeline', 'Future'], name: 'Forecasted Quantity', unit: 'volume', dataType: 'Number', aggregation: 'Sum', sourceName: 'Opportunity', selected: false },
    { subsets: ['Pipeline', 'Opportunities', 'Weighted'], name: 'Weighted Pipeline', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', sourceName: 'Opportunity', selected: false },
    { subsets: ['Quota', 'Goals', 'Targets', 'Attainment'], name: 'Quota Attainment %', unit: '%', dataType: 'Percent', aggregation: 'Average', sourceName: 'Territory', selected: false },
    { subsets: ['Performance', 'Win Rate', 'Success'], name: 'Win Rate', unit: '%', dataType: 'Percent', aggregation: 'Average', sourceName: 'Opportunity', selected: false },
    { subsets: ['Performance', 'Metrics', 'KPI'], name: 'Performance', unit: 'score', dataType: 'Number', aggregation: 'Average', sourceName: 'Goal', selected: false },
  ];

  const categoryOptions = [...new Set(measures.map(measure => measure.subsets[0]))].sort();
  const typeOptions = [...new Set(measures.map(measure => measure.type || 'Read'))].sort();
  const aggregationOptions = [...new Set(measures.map(measure => measure.aggregation))].sort();

  const filteredMeasures = measures
    .map((measure, index) => ({ measure, index }))
    .filter(({ measure, index }) => {
      const currentType = measure.type || 'Read';
      const currentSourceDmo = (sourceDmoInputs[index] || '').trim();
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        measure.name.toLowerCase().includes(normalizedSearch) ||
        measure.subsets[0].toLowerCase().includes(normalizedSearch) ||
        currentType.toLowerCase().includes(normalizedSearch) ||
        measure.aggregation.toLowerCase().includes(normalizedSearch);

      const matchesCategory = categoryFilter === 'all' || measure.subsets[0] === categoryFilter;
      const matchesType = typeFilter === 'all' || currentType === typeFilter;
      const matchesAggregation = aggregationFilter === 'all' || measure.aggregation === aggregationFilter;
      return matchesSearch && matchesCategory && matchesType && matchesAggregation;
    });
  const getCategoryClassName = (category) => {
    const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `measure-category-badge measure-category-${normalizedCategory}`;
  };

  const dmoStatusCounts = measures.reduce(
    (counts, measure, index) => {
      const selectedDmo = (sourceDmoInputs[index] || '').trim();
      if (selectedDmo) {
        counts.completed += 1;
      } else {
        counts.missing += 1;
      }
      return counts;
    },
    { missing: 0, completed: 0 }
  );

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleMenuAction = (action, measure) => {
    console.log(`Action: ${action}, Measure: ${measure.name}`);
    setOpenMenuIndex(null);
    
    if (action === 'edit') {
      setSelectedMeasure(measure);
      setEditPanelOpen(true);
      setClonePanelOpen(false);
      setDeletePanelOpen(false);
    } else if (action === 'clone') {
      setSelectedMeasure(measure);
      setClonePanelOpen(true);
      setEditPanelOpen(false);
      setDeletePanelOpen(false);
    } else if (action === 'delete') {
      setSelectedMeasure(measure);
      setDeletePanelOpen(true);
      setEditPanelOpen(false);
      setClonePanelOpen(false);
    } else if (action === 'sync') {
      // Sync action - no panel needed
      console.log('Syncing measure to Data Cloud...');
    }
  };

  const closeEditPanel = () => {
    setEditPanelOpen(false);
    setSelectedMeasure(null);
  };

  const closeClonePanel = () => {
    setClonePanelOpen(false);
    setSelectedMeasure(null);
  };

  const closeDeletePanel = () => {
    setDeletePanelOpen(false);
    setSelectedMeasure(null);
  };

  const openCreatePanel = () => {
    setCreatePanelOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
  };

  const closeCreatePanel = () => {
    setCreatePanelOpen(false);
  };

  const openAssignSubsetPanel = () => {
    setAssignSubsetPanelOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
    setCreatePanelOpen(false);
    setAiChatOpen(false);
    setSelectedSubsetsForAssignment([]);
  };

  const closeAssignSubsetPanel = () => {
    setAssignSubsetPanelOpen(false);
    setSelectedSubsetsForAssignment([]);
  };

  const toggleSubsetForAssignment = (subsetName) => {
    setSelectedSubsetsForAssignment(prev => 
      prev.includes(subsetName)
        ? prev.filter(s => s !== subsetName)
        : [...prev, subsetName]
    );
  };

  const handleAssignToSubsets = () => {
    // Logic to assign selected measures to selected subsets
    console.log('Assigning measures to subsets:', selectedSubsetsForAssignment);
    closeAssignSubsetPanel();
  };

  const openAiChat = () => {
    setAiChatOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
    setCreatePanelOpen(false);
    setShowFormFromChat(false);
    
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'ai',
          content: 'Hi! I\'m here to help you create measures. Tell me what you want to monitor, and I\'ll help set up the measure with the right formula and configuration.'
        }
      ]);
    }
  };

  const closeAiChat = () => {
    setAiChatOpen(false);
    setShowFormFromChat(false);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      processAiResponse(userMessage);
    }, 1000);
  };

  const processAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let measureData = null;

    if ((lowerInput.includes('assign') && lowerInput.includes('source')) || (lowerInput.includes('help') && lowerInput.includes('dmo'))) {
      response = `I can help match Source DMOs to your measures!

Analysis criteria:
• Measure names (Revenue/Sales → OpportunityLineItem)
• Formula fields (OpportunityQuantity → Opportunity)
• Subsets (Budget → Account Budget)

Would you like me to review your measures and suggest the right Source DMOs?`;
      // This would be a bulk action, not a single measure
    } else if (lowerInput.includes('revenue') || lowerInput.includes('sales') || lowerInput.includes('nsv')) {
      response = `Created: Net Sales Value (NSV)

Source DMO: OpportunityLineItem

Why this source:
The formula uses OpportunityQuantity and UnitPrice, which are fields on OpportunityLineItem.

Configuration:
• Format: Currency
• Aggregation: Sum
• Purpose: Financial reporting

Click "View Measure" below to review and customize.`;
      measureData = {
        name: 'Net Sales Value (NSV)',
        type: 'Calculated',
        description: 'Track total revenue from sales agreements',
        valueType: 'Currency',
        roundingPrecision: '2',
        aggregationRule: 'Sum',
        formula: 'OpportunityQuantity * UnitPrice * 0.8',
        measureCode: 'NSV_001',
        sourceDMO: 'OpportunityLineItem',
        subsets: ['Revenue', 'Sales', 'Net Value']
      };
    } else if (lowerInput.includes('roi') || lowerInput.includes('return')) {
      response = `Created: Trade ROI

Source DMO: Trade Promotion

Why this source:
ROI needs both revenue and cost data, which are tracked in Trade Promotion.

Configuration:
• Format: Percent
• Aggregation: Average
• Purpose: Campaign profitability

Click "View Measure" below to review and customize.`;
      measureData = {
        name: 'Trade ROI',
        type: 'Calculated',
        description: 'Measure return on investment for trade promotions',
        valueType: 'Percent',
        roundingPrecision: '2',
        aggregationRule: 'Average',
        formula: '(Revenue - Cost) / Cost * 100',
        measureCode: 'ROI_001',
        sourceDMO: 'Trade Promotion',
        subsets: ['Trade', 'ROI', 'Performance']
      };
    } else if (lowerInput.includes('quota') || lowerInput.includes('attainment')) {
      response = `Created: Quota Attainment %

Source DMO: Territory

Why this source:
The formula uses QuotaTarget, which is a field on Territory objects.

Configuration:
• Format: Percent
• Aggregation: Average
• Purpose: Team performance tracking

Click "View Measure" below to review and customize.`;
      measureData = {
        name: 'Quota Attainment %',
        type: 'Calculated',
        description: 'Track quota attainment for sales teams',
        valueType: 'Percent',
        roundingPrecision: '2',
        aggregationRule: 'Average',
        formula: '(ActualSales / QuotaTarget) * 100',
        measureCode: 'QUOTA_001',
        sourceDMO: 'Territory',
        subsets: ['Quota', 'Goals', 'Targets', 'Attainment']
      };
    } else if (lowerInput.includes('volume') || lowerInput.includes('quantity')) {
      response = `Created: Sales Volume

Source DMO: SalesAgreement

Why this source:
The formula combines SalesAgreementQuantity and OpportunityQuantity. SalesAgreement is the primary source for committed volumes.

Configuration:
• Format: Volume
• Aggregation: Sum
• Purpose: Total quantity reporting

Click "View Measure" below to review and customize.`;
      measureData = {
        name: 'Sales Volume',
        type: 'Calculated',
        description: 'Track total sales volume across products',
        valueType: 'Volume',
        roundingPrecision: '0',
        aggregationRule: 'Sum',
        formula: 'SalesAgreementQuantity + OpportunityQuantity',
        measureCode: 'VOL_001',
        sourceDMO: 'SalesAgreement',
        subsets: ['Volume', 'Sales', 'Quantity']
      };
    } else {
      response = `Welcome! I can help you create custom measures.

What metric would you like to track?
• Revenue or sales performance
• ROI or profitability
• Quota attainment
• Volume or quantity

I'll intelligently assign the appropriate Source DMO based on your needs.`;
    }

    setTimeout(() => {
      setIsAiTyping(false);
      setChatMessages(prev => [
        ...prev,
        { role: 'ai', content: response, measureData }
      ]);
      if (measureData) {
        setGeneratedMeasure(measureData);
      }
    }, 1500);
  };

  const handleStarterPrompt = (prompt) => {
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsAiTyping(true);
    setTimeout(() => processAiResponse(prompt), 1000);
  };

  const handleViewMeasure = (measureData) => {
    setGeneratedMeasure(measureData);
    setShowFormFromChat(true);
    setCreatePanelOpen(true);
    setAiChatOpen(false);
    setSelectedSubsets(measureData.subsets || []);
  };

  const handleBackToChat = () => {
    setShowFormFromChat(false);
    setCreatePanelOpen(false);
    setAiChatOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-container modal-measures ${(clonePanelOpen || deletePanelOpen || assignSubsetPanelOpen || aiChatOpen) ? 'with-panel' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header modal-header-simple">
          <h2 className="modal-title">Review Available Measures</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-simple measures-content-wrapper">
          <div className="measures-main-content">
            {/* Header Info and Buttons */}
            <div className="measures-header">
            <div className="measures-info">
            </div>
            <div className="measures-button-group">
              {agenticMeasureCreateEnabled && (
                <button className="measures-sparkle-button" onClick={openAiChat}>
                  <img src={imgSparkleIcon} alt="Agentic Measure Create" />
                </button>
              )}
              {measureBulkActionsEnabled && (
                <button className="measures-sync-button">Sync with Data Cloud</button>
              )}
              {measureBulkActionsEnabled && (
                <button className="measures-assign-subset-button" onClick={openAssignSubsetPanel}>Assign to Subset</button>
              )}
            </div>
          </div>

          <div className="measures-info-bar">
            <span className="measures-info-bar-text">Need more context on these measures?</span>
            <button className="measures-info-bar-link" onClick={handleGoToSetupDetails}>
              Go to Setup for more details
            </button>
          </div>

          {/* Filters Section */}
          <div className="measures-filters">
            <div className="filter-field">
              <label className="filter-label">Search</label>
              <div className="filter-search">
                <img src={imgSearchIcon} alt="Search" />
                <input
                  type="text"
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="filter-field">
              <label className="filter-label">Type</label>
              <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label className="filter-label">Aggregation</label>
              <select className="filter-select" value={aggregationFilter} onChange={(e) => setAggregationFilter(e.target.value)}>
                <option value="all">All Aggregations</option>
                {aggregationOptions.map((aggregation) => (
                  <option key={aggregation} value={aggregation}>
                    {aggregation}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label className="filter-label">Category</label>
              <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All Categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-field" style={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
              <label className="filter-label" style={{ visibility: 'hidden' }}>Create</label>
              <button className="measures-create-button" onClick={openCreatePanel}>Create New</button>
            </div>
          </div>

          <div className="measures-dmo-summary">
            <span className="measures-dmo-summary-label">DMO Status:</span>
            <span>{dmoStatusCounts.missing} missing</span>
            <span>•</span>
            <span>{dmoStatusCounts.completed} completed</span>
          </div>

          {/* Measures Table */}
          <div className="measures-table-container">
            <table className="measures-table">
              <thead>
                <tr>
                  <th className="table-cell-checkbox">
                    <input type="checkbox" />
                  </th>
                  <th>Measure Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Aggregation</th>
                  <th>Category</th>
                  <th>Disaggregation</th>
                  <th>Source DMO</th>
                  <th>Measure Code</th>
                  <th className="table-cell-actions"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMeasures.map(({ measure, index }) => (
                  <tr 
                    key={index}
                    className={(editPanelOpen || clonePanelOpen || deletePanelOpen || createPanelOpen) && selectedMeasure?.name === measure.name ? 'row-selected' : ''}
                  >
                    <td className="table-cell-checkbox">
                      <input type="checkbox" defaultChecked={measure.selected} />
                    </td>
                    <td style={{ cursor: 'pointer', color: '#0176d3' }} onClick={() => handleMenuAction('edit', measure)}>{measure.name}</td>
                    <td>{measure.description}</td>
                    <td>{measure.type || 'Read'}</td>
                    <td>{measure.aggregation}</td>
                    <td>
                      <span className={getCategoryClassName(measure.subsets[0])}>{measure.subsets[0]}</span>
                    </td>
                    <td>{measure.disaggregation || 'Proportional'}</td>
                    <td>
                      <select
                        className="edit-form-select"
                        value={sourceDmoInputs[index] || ''}
                        style={
                          !(sourceDmoInputs[index] || '').trim()
                            ? {
                                borderColor: '#fe9339',
                                boxShadow: 'inset 0 0 0 1px #fe9339'
                              }
                            : undefined
                        }
                        onChange={(e) =>
                          updateSourceDmoInputs(prev => ({
                            ...prev,
                            [index]: e.target.value
                          }))
                        }
                      >
                        <option value="">Select source DMO</option>
                        {sourceNames.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="edit-form-input"
                        placeholder="add measure code"
                        value={measureCodeInputs[index] || ''}
                        onChange={(e) =>
                          setMeasureCodeInputs(prev => ({
                            ...prev,
                            [index]: e.target.value
                          }))
                        }
                      />
                    </td>
                    <td className="table-cell-actions">
                      <div className="dropdown-wrapper">
                        <button 
                          className="table-row-dropdown" 
                          onClick={() => toggleMenu(index)}
                        >
                          <img src={imgDownIcon} alt="Actions" />
                        </button>
                        {openMenuIndex === index && (
                          <div className="dropdown-menu">
                            <button 
                              className="dropdown-menu-item" 
                              onClick={() => handleMenuAction('edit', measure)}
                            >
                              Edit
                            </button>
                            <button 
                              className="dropdown-menu-item" 
                              onClick={() => handleMenuAction('clone', measure)}
                            >
                              Clone
                            </button>
                            <button 
                              className="dropdown-menu-item" 
                              onClick={() => handleMenuAction('sync', measure)}
                            >
                              Sync to Data Cloud
                            </button>
                            <div className="dropdown-menu-divider"></div>
                            <button 
                              className="dropdown-menu-item dropdown-menu-item-danger" 
                              onClick={() => handleMenuAction('delete', measure)}
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

          {/* Modal Footer */}
          <div className="modal-footer modal-footer-bleed">
            <button 
              className="modal-done-button" 
              onClick={onClose}
              disabled={editPanelOpen || clonePanelOpen || deletePanelOpen || createPanelOpen || assignSubsetPanelOpen}
            >
              Done
            </button>
          </div>
        </div>

        {/* Edit Measure Panel */}
        {editPanelOpen && selectedMeasure && (
          <div className="edit-panel edit-panel-full-width">
            <div className="edit-panel-header">
              <button className="ai-breadcrumb" onClick={closeEditPanel}>
                ← Back to list
              </button>
              <h3 className="edit-panel-title">Edit Measure</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeEditPanel}>
                  Cancel
                </button>
                <button className="edit-panel-text-button edit-panel-text-button-save">
                  Save
                </button>
              </div>
            </div>
            
            <div className="edit-panel-body">
              <>
              {/* Information Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Information</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Name</label>
                  <input 
                    type="text" 
                    className="edit-form-input" 
                    defaultValue={selectedMeasure.name}
                  />
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Type</label>
                  <select className="edit-form-select">
                    <option value="Calculated">Calculated</option>
                    <option value="Direct">Direct</option>
                  </select>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Description</label>
                  <textarea 
                    className="edit-form-textarea" 
                    placeholder="Enter description..."
                    rows="3"
                  />
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Value Type</label>
                  <select className="edit-form-select" defaultValue={selectedMeasure.unit}>
                    <option value="Volume">Volume</option>
                    <option value="Currency">Currency</option>
                    <option value="Percent">Percent</option>
                    <option value="Score">Score</option>
                  </select>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Rounding Precision</label>
                  <select className="edit-form-select">
                    <option value="2">2 Decimal</option>
                    <option value="0">0 Decimal</option>
                    <option value="1">1 Decimal</option>
                    <option value="3">3 Decimal</option>
                    <option value="4">4 Decimal</option>
                  </select>
                </div>
              </div>

              {/* Aggregation / Disaggregation Settings Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Aggregation / Disaggregation Settings</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Aggregation Rule</label>
                  <select className="edit-form-select" defaultValue={selectedMeasure.aggregation}>
                    <option value="Sum">Sum</option>
                    <option value="Average">Average</option>
                    <option value="Count">Count</option>
                    <option value="Min">Min</option>
                    <option value="Max">Max</option>
                  </select>
                </div>
              </div>

              {/* Settings Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Settings</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Calculated Expression</label>
                  <div className="formula-builder">
                    <div className="formula-inputs">
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Search measures"
                        />
                      </div>
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Select function"
                        />
                      </div>
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Select operator"
                        />
                      </div>
                    </div>
                    <textarea 
                      className="edit-form-textarea formula-textarea" 
                      placeholder="Enter formula..."
                      rows="4"
                    />
                    <button className="check-syntax-button">Check Syntax</button>
                  </div>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Code</label>
                  <input 
                    type="text" 
                    className="edit-form-input" 
                    placeholder="Enter measure code..."
                  />
                </div>

                <div className="edit-form-field">
                  <label className="writeback-checkbox-label">
                    <input 
                      type="checkbox" 
                      className="writeback-checkbox"
                    />
                    <span>Writeback enabled</span>
                  </label>
                </div>
              </div>
              </>

              {/* Measure Subsets Tab Content */}
              {measureSubsetsTabEnabled && (
                <div className="subsets-tab-content">
                  <div className="subsets-tab-header">
                    <p className="subsets-tab-description">
                      Select the subsets this measure should be part of
                    </p>
                    <div className="subsets-controls">
                      <div className="subsets-search">
                        <img src={imgSearchIcon} alt="Search" />
                        <input 
                          type="text" 
                          placeholder="Search subsets..."
                          value={subsetSearchTerm}
                          onChange={(e) => setSubsetSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="subsets-toggle">
                        <label className="toggle-label">
                          <input 
                            type="checkbox" 
                            className="toggle-checkbox"
                            checked={showSelectedOnly}
                            onChange={(e) => setShowSelectedOnly(e.target.checked)}
                          />
                          <span className="toggle-text">Show selected only</span>
                        </label>
                      </div>
                    </div>
                    <p className="subsets-selected-count">
                      {selectedSubsets.length} selected
                    </p>
                  </div>
                  <div className="subsets-list">
                    {filteredSubsets.map((subset, idx) => (
                      <div key={idx} className="subset-item">
                        <label className="subset-checkbox-label">
                          <input 
                            type="checkbox" 
                            className="subset-checkbox"
                            checked={selectedSubsets.includes(subset)}
                            onChange={() => toggleSubset(subset)}
                          />
                          <span className="subset-name">{subset}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clone Measure Panel */}
        {clonePanelOpen && selectedMeasure && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Clone Measure</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeClonePanel}>
                  Cancel
                </button>
                <button className="edit-panel-text-button edit-panel-text-button-save">
                  Save
                </button>
              </div>
            </div>
            
            <div className="edit-panel-body">
              <>
              {/* Information Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Information</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Name</label>
                  <input 
                    type="text" 
                    className="edit-form-input" 
                    defaultValue={`${selectedMeasure.name} (Copy)`}
                  />
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Type</label>
                  <select className="edit-form-select">
                    <option value="Calculated">Calculated</option>
                    <option value="Direct">Direct</option>
                  </select>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Description</label>
                  <textarea 
                    className="edit-form-textarea" 
                    placeholder="Enter description..."
                    rows="3"
                  />
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Value Type</label>
                  <select className="edit-form-select" defaultValue={selectedMeasure.unit}>
                    <option value="Volume">Volume</option>
                    <option value="Currency">Currency</option>
                    <option value="Percent">Percent</option>
                    <option value="Score">Score</option>
                  </select>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Rounding Precision</label>
                  <select className="edit-form-select">
                    <option value="2">2 Decimal</option>
                    <option value="0">0 Decimal</option>
                    <option value="1">1 Decimal</option>
                    <option value="3">3 Decimal</option>
                    <option value="4">4 Decimal</option>
                  </select>
                </div>
              </div>

              {/* Aggregation / Disaggregation Settings Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Aggregation / Disaggregation Settings</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Aggregation Rule</label>
                  <select className="edit-form-select" defaultValue={selectedMeasure.aggregation}>
                    <option value="Sum">Sum</option>
                    <option value="Average">Average</option>
                    <option value="Count">Count</option>
                    <option value="Min">Min</option>
                    <option value="Max">Max</option>
                  </select>
                </div>
              </div>

              {/* Settings Section */}
              <div className="measure-section">
                <h4 className="measure-section-title">Settings</h4>
                
                <div className="edit-form-field">
                  <label className="edit-form-label">* Calculated Expression</label>
                  <div className="formula-builder">
                    <div className="formula-inputs">
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Search measures"
                        />
                      </div>
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Select function"
                        />
                      </div>
                      <div className="source-search-wrapper">
                        <input 
                          type="text" 
                          className="edit-form-input formula-input" 
                          placeholder="Select operator"
                        />
                      </div>
                    </div>
                    <textarea 
                      className="edit-form-textarea formula-textarea" 
                      placeholder="Enter formula..."
                      rows="4"
                    />
                    <button className="check-syntax-button">Check Syntax</button>
                  </div>
                </div>

                <div className="edit-form-field">
                  <label className="edit-form-label">* Measure Code</label>
                  <input 
                    type="text" 
                    className="edit-form-input" 
                    placeholder="Enter measure code..."
                  />
                </div>

                <div className="edit-form-field">
                  <label className="writeback-checkbox-label">
                    <input 
                      type="checkbox" 
                      className="writeback-checkbox"
                    />
                    <span>Writeback enabled</span>
                  </label>
                </div>
              </div>
              </>

              {/* Measure Subsets Tab Content */}
              {measureSubsetsTabEnabled && (
                <div className="subsets-tab-content">
                  <div className="subsets-tab-header">
                    <p className="subsets-tab-description">
                      Select the subsets this measure should be part of
                    </p>
                    <div className="subsets-controls">
                      <div className="subsets-search">
                        <img src={imgSearchIcon} alt="Search" />
                        <input 
                          type="text" 
                          placeholder="Search subsets..."
                          value={subsetSearchTerm}
                          onChange={(e) => setSubsetSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="subsets-toggle">
                        <label className="toggle-label">
                          <input 
                            type="checkbox" 
                            className="toggle-checkbox"
                            checked={showSelectedOnly}
                            onChange={(e) => setShowSelectedOnly(e.target.checked)}
                          />
                          <span className="toggle-text">Show selected only</span>
                        </label>
                      </div>
                    </div>
                    <p className="subsets-selected-count">
                      {selectedSubsets.length} selected
                    </p>
                  </div>
                  <div className="subsets-list">
                    {filteredSubsets.map((subset, idx) => (
                      <div key={idx} className="subset-item">
                        <label className="subset-checkbox-label">
                          <input 
                            type="checkbox" 
                            className="subset-checkbox"
                            checked={selectedSubsets.includes(subset)}
                            onChange={() => toggleSubset(subset)}
                          />
                          <span className="subset-name">{subset}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Measure Panel */}
        {deletePanelOpen && selectedMeasure && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Delete Measure</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeDeletePanel}>
                  Cancel
                </button>
                <button className="edit-panel-text-button edit-panel-text-button-danger">
                  Delete
                </button>
              </div>
            </div>
            <div className="edit-panel-body">
              <div className="delete-warning">
                <p>Are you sure you want to delete this measure?</p>
                <div className="delete-measure-details">
                  <div className="delete-detail-row">
                    <span className="delete-detail-label">Measure Name:</span>
                    <span className="delete-detail-value">{selectedMeasure.name}</span>
                  </div>
                  <div className="delete-detail-row">
                    <span className="delete-detail-label">Unit:</span>
                    <span className="delete-detail-value">{selectedMeasure.unit}</span>
                  </div>
                  <div className="delete-detail-row">
                    <span className="delete-detail-label">Data Type:</span>
                    <span className="delete-detail-value">{selectedMeasure.dataType}</span>
                  </div>
                  <div className="delete-detail-row">
                    <span className="delete-detail-label">Source:</span>
                    <span className="delete-detail-value">{selectedMeasure.sourceName}</span>
                  </div>
                </div>
                <p className="delete-warning-text">This action cannot be undone.</p>
              </div>
            </div>
          </div>
        )}

        {/* Create New Measure Panel */}
        {createPanelOpen && (
          <div className="edit-panel edit-panel-full-width">
            <div className="edit-panel-header">
              {showFormFromChat && (
                <button className="ai-breadcrumb" onClick={handleBackToChat}>
                  ← Back to AI Chat
                </button>
              )}
              {!showFormFromChat && (
                <button className="ai-breadcrumb" onClick={closeCreatePanel}>
                  ← Back to list
                </button>
              )}
              {!showFormFromChat && (
                <h3 className="edit-panel-title">Create New Measure</h3>
              )}
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeCreatePanel}>
                  Cancel
                </button>
                <button className="edit-panel-text-button edit-panel-text-button-save" onClick={() => {
                  closeCreatePanel();
                  showSuccessToast('Measure created successfully');
                }}>
                  Save
                </button>
              </div>
            </div>
            
            <div className="edit-panel-body">
              <>
                  {/* Information Section */}
                  <div className="measure-section">
                    <h4 className="measure-section-title">Information</h4>
                    
                    <div className="edit-form-field">
                      <label className="edit-form-label">* Measure Name</label>
                      <input 
                        type="text" 
                        className="edit-form-input" 
                        placeholder="Enter measure name..."
                        defaultValue={generatedMeasure?.name || ''}
                      />
                    </div>

                    <div className="edit-form-field">
                      <label className="edit-form-label">* Measure Type</label>
                      <select className="edit-form-select" defaultValue={generatedMeasure?.type || 'Calculated'}>
                        <option value="Calculated">Calculated</option>
                        <option value="Direct">Direct</option>
                      </select>
                    </div>

                    <div className="edit-form-field">
                      <label className="edit-form-label">* Description</label>
                      <textarea 
                        className="edit-form-textarea" 
                        placeholder="Enter description..."
                        rows="3"
                        defaultValue={generatedMeasure?.description || ''}
                      />
                    </div>

                    <div className="edit-form-field">
                      <label className="edit-form-label">* Value Type</label>
                      <select className="edit-form-select" defaultValue={generatedMeasure?.valueType || ''}>
                        <option value="">Select value type...</option>
                        <option value="Volume">Volume</option>
                        <option value="Currency">Currency</option>
                        <option value="Percent">Percent</option>
                        <option value="Score">Score</option>
                      </select>
                    </div>

                    <div className="edit-form-field">
                      <label className="edit-form-label">* Rounding Precision</label>
                      <select className="edit-form-select" defaultValue={generatedMeasure?.roundingPrecision || '2'}>
                        <option value="2">2 Decimal</option>
                        <option value="0">0 Decimal</option>
                        <option value="1">1 Decimal</option>
                        <option value="3">3 Decimal</option>
                        <option value="4">4 Decimal</option>
                      </select>
                    </div>
                  </div>

                  {/* Aggregation / Disaggregation Settings Section */}
                  <div className="measure-section">
                    <h4 className="measure-section-title">Aggregation / Disaggregation Settings</h4>
                    
                    <div className="edit-form-field">
                      <label className="edit-form-label">* Aggregation Rule</label>
                      <select className="edit-form-select" defaultValue={generatedMeasure?.aggregationRule || ''}>
                        <option value="">Select</option>
                        <option value="Sum">Sum</option>
                        <option value="Average">Average</option>
                        <option value="Count">Count</option>
                        <option value="Min">Min</option>
                        <option value="Max">Max</option>
                      </select>
                    </div>
                  </div>

                  {/* Settings Section */}
                  <div className="measure-section">
                    <h4 className="measure-section-title">Settings</h4>
                    
                    <div className="edit-form-field">
                      <label className="edit-form-label">* Calculated Expression</label>
                      <div className="formula-builder">
                        <div className="formula-inputs">
                          <div className="source-search-wrapper">
                            <input 
                              type="text" 
                              className="edit-form-input formula-input" 
                              placeholder="Search measures"
                            />
                          </div>
                          <div className="source-search-wrapper">
                            <input 
                              type="text" 
                              className="edit-form-input formula-input" 
                              placeholder="Select function"
                            />
                          </div>
                          <div className="source-search-wrapper">
                            <input 
                              type="text" 
                              className="edit-form-input formula-input" 
                              placeholder="Select operator"
                            />
                          </div>
                        </div>
                        <textarea 
                          className="edit-form-textarea formula-textarea" 
                          placeholder="Enter formula..."
                          rows="4"
                          defaultValue={generatedMeasure?.formula || ''}
                        />
                        <button className="check-syntax-button">Check Syntax</button>
                      </div>
                    </div>

                    <div className="edit-form-field">
                      <label className="edit-form-label">* Measure Code</label>
                      <input 
                        type="text" 
                        className="edit-form-input" 
                        placeholder="Enter measure code..."
                        defaultValue={generatedMeasure?.measureCode || ''}
                      />
                    </div>

                    <div className="edit-form-field">
                      <label className="writeback-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="writeback-checkbox"
                        />
                        <span>Writeback enabled</span>
                      </label>
                    </div>
                  </div>
                </>

              {/* Measure Subsets Tab Content */}
              {measureSubsetsTabEnabled && (
                <div className="subsets-tab-content">
                  <div className="subsets-tab-header">
                    <p className="subsets-tab-description">
                      Select the subsets this measure should be part of
                    </p>
                    <div className="subsets-controls">
                      <div className="subsets-search">
                        <img src={imgSearchIcon} alt="Search" />
                        <input 
                          type="text" 
                          placeholder="Search subsets..."
                          value={subsetSearchTerm}
                          onChange={(e) => setSubsetSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="subsets-toggle">
                        <label className="toggle-label">
                          <input 
                            type="checkbox" 
                            className="toggle-checkbox"
                            checked={showSelectedOnly}
                            onChange={(e) => setShowSelectedOnly(e.target.checked)}
                          />
                          <span className="toggle-text">Show selected only</span>
                        </label>
                      </div>
                    </div>
                    <p className="subsets-selected-count">
                      {selectedSubsets.length} selected
                    </p>
                  </div>
                  <div className="subsets-list">
                    {filteredSubsets.map((subset, idx) => (
                      <div key={idx} className="subset-item">
                        <label className="subset-checkbox-label">
                          <input 
                            type="checkbox" 
                            className="subset-checkbox"
                            checked={selectedSubsets.includes(subset)}
                            onChange={() => toggleSubset(subset)}
                          />
                          <span className="subset-name">{subset}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Chat Panel */}
        {agenticMeasureCreateEnabled && aiChatOpen && (
          <div className="edit-panel ai-chat-panel">
            <div className="edit-panel-header ai-chat-header">
              <h3 className="ai-chat-title">Agentforce</h3>
              <button className="ai-chat-close" onClick={closeAiChat}>
                <img src={imgCloseIcon} alt="Close" />
              </button>
            </div>

            <div className="edit-panel-body ai-chat-body">
              <div className="ai-chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`ai-chat-message ${message.role}`}>
                    {message.role === 'ai' ? (
                      <div className="ai-message-bubble">
                        <p className="ai-message-content">{message.content}</p>
                        {message.measureData && (
                          <button 
                            className="ai-view-button"
                            onClick={() => handleViewMeasure(message.measureData)}
                          >
                            View
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="user-message-bubble">
                        <p className="ai-message-content">{message.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {chatMessages.length === 1 && (
                  <div className="ai-starter-prompts">
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('Create a revenue measure to track Net Sales Value for financial reporting')}
                    >
                      Create a revenue measure to track Net Sales Value for financial reporting
                    </button>
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('Help me assign Source DMOs to my sales and revenue measures')}
                    >
                      Help me assign Source DMOs to my sales and revenue measures
                    </button>
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('Create quota attainment measure for sales team performance')}
                    >
                      Create quota attainment measure for sales team performance
                    </button>
                  </div>
                )}

                {isAiTyping && (
                  <div className="ai-chat-message ai">
                    <div className="ai-message-bubble">
                      <div className="ai-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ai-chat-input-container">
                <input
                  type="text"
                  className="ai-chat-input"
                  placeholder="Describe what you want to measure..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="ai-send-button" onClick={handleSendMessage}>
                  <img src={imgSendIcon} alt="Send" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign to Subset Panel */}
        {measureBulkActionsEnabled && assignSubsetPanelOpen && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Assign to Measure Subset</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-text-button-cancel" onClick={closeAssignSubsetPanel}>
                  Cancel
                </button>
                <button 
                  className="edit-panel-text-button edit-panel-text-button-save" 
                  onClick={handleAssignToSubsets}
                  disabled={measures.filter(m => m.selected).length === 0}
                  style={{ 
                    opacity: measures.filter(m => m.selected).length === 0 ? 0.5 : 1,
                    cursor: measures.filter(m => m.selected).length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="edit-panel-body">
              <div className="edit-form-group">
                <label className="edit-form-label">Select Measure Subsets</label>
                <p className="edit-form-description">Choose one or more subsets to assign the selected measures to</p>
                
                <div className="source-search-wrapper" style={{ marginTop: '12px' }}>
                  <input
                    type="text"
                    className="edit-form-input"
                    placeholder="Search and select subsets..."
                    value={subsetSearchTerm}
                    onChange={(e) => setSubsetSearchTerm(e.target.value)}
                    onFocus={() => setShowSubsetDropdown(true)}
                    onBlur={() => setTimeout(() => setShowSubsetDropdown(false), 200)}
                    style={{
                      backgroundImage: `url("${imgSearchIcon}")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px',
                      paddingRight: '36px'
                    }}
                  />
                  {showSubsetDropdown && (
                    <div className="source-dropdown">
                      {availableSubsets
                        .filter(subset => subset.toLowerCase().includes(subsetSearchTerm.toLowerCase()))
                        .map((subset, idx) => (
                          <div
                            key={idx}
                            className="source-dropdown-item"
                            onClick={() => {
                              toggleSubsetForAssignment(subset);
                              setSubsetSearchTerm('');
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedSubsetsForAssignment.includes(subset)}
                              onChange={() => {}}
                              style={{ pointerEvents: 'none' }}
                            />
                            {subset}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {selectedSubsetsForAssignment.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedSubsetsForAssignment.map((subset, idx) => (
                      <div key={idx} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 8px',
                        backgroundColor: '#e8f4ff',
                        border: '1px solid #0176d3',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#0176d3'
                      }}>
                        {subset}
                        <button
                          onClick={() => toggleSubsetForAssignment(subset)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#0176d3',
                            cursor: 'pointer',
                            padding: '0',
                            fontSize: '16px',
                            lineHeight: '1'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast 
          message={toastMessage}
          description={toastDescription}
          onClose={closeToast}
        />
      )}
    </div>
  );
}
