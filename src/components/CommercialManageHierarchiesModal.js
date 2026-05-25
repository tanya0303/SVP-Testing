import React, { useState } from 'react';
import Toast from './Toast';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";

const imgSuccessIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' fill='%2306914d'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgSparkleIcon = "data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2695 15.4912L16.0808 17.5755C14.8224 18.2027 13.8045 19.2172 13.1753 20.4715L11.084 24.6463C10.7879 25.2427 9.93041 25.2427 9.6343 24.6463L7.54304 20.4715C6.91381 19.2172 5.89594 18.2027 4.63748 17.5755L0.448789 15.4912C-0.149596 15.196 -0.149596 14.3414 0.448789 14.0463L4.63748 11.9619C5.89594 11.3348 6.91381 10.3203 7.54304 9.06597L9.6343 4.89114C9.93041 4.29473 10.7879 4.29473 11.084 4.89114L13.1753 9.06597C13.8045 10.3203 14.8224 11.3348 16.0808 11.9619L20.2695 14.0463C20.8679 14.3414 20.8679 15.196 20.2695 15.4912ZM29.4057 24.7754L27.6105 23.8777C27.0677 23.6133 26.6358 23.1706 26.3644 22.6357L25.4637 20.8465C25.3404 20.5883 24.9702 20.5883 24.8407 20.8465L23.94 22.6357C23.6748 23.1768 23.2306 23.6072 22.6939 23.8777L20.8987 24.7754C20.6397 24.8984 20.6397 25.2673 20.8987 25.3964L22.6939 26.2941C23.2368 26.5585 23.6686 27.0012 23.94 27.5361L24.8407 29.3253C24.9641 29.5835 25.3342 29.5835 25.4637 29.3253L26.3644 27.5361C26.6297 26.995 27.0738 26.5646 27.6105 26.2941L29.4057 25.3964C29.6648 25.2734 29.6648 24.9045 29.4057 24.7754ZM29.4057 4.12257L27.6105 3.22489C27.0677 2.96051 26.6358 2.51781 26.3644 1.98289L25.4637 0.193678C25.3404 -0.0645593 24.9702 -0.0645593 24.8407 0.193678L23.94 1.98289C23.6748 2.52396 23.2306 2.95436 22.6939 3.22489L20.8987 4.12257C20.6397 4.24554 20.6397 4.61445 20.8987 4.74357L22.6939 5.64125C23.2368 5.90564 23.6686 6.34833 23.94 6.88325L24.8407 8.67247C24.9641 8.93071 25.3342 8.93071 25.4637 8.67247L26.3644 6.88325C26.6297 6.34218 27.0738 5.91179 27.6105 5.64125L29.4057 4.74357C29.6648 4.6206 29.6648 4.25169 29.4057 4.12257Z' fill='%230250D9'/%3E%3C/svg%3E";

const imgSendIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 10L18 2L10 18L8 11L2 10Z' fill='%230176d3' stroke='%230176d3' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function ManageHierarchiesModal({ isOpen, onClose }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [clonePanelOpen, setClonePanelOpen] = useState(false);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [selectedHierarchy, setSelectedHierarchy] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDescription, setToastDescription] = useState('');
  const [cloneHierarchyName, setCloneHierarchyName] = useState('');
  const [cloneNumLevels, setCloneNumLevels] = useState(5);
  const [cloneLevelMenuIndex, setCloneLevelMenuIndex] = useState(null);
  const [cloneLevels, setCloneLevels] = useState([
    { id: 0, level: 0, name: 'Parent Account', isEditable: false },
    { id: 1, level: 1, name: 'Account', isEditable: false },
    { id: 2, level: 2, name: '', isEditable: true },
    { id: 3, level: 3, name: '', isEditable: true },
    { id: 4, level: 4, name: '', isEditable: true },
  ]);
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
  const [showDimensionPopover, setShowDimensionPopover] = useState(false);
  const [newDimensionName, setNewDimensionName] = useState('');
  const [newDimensionDMO, setNewDimensionDMO] = useState('');
  const [customDimensions, setCustomDimensions] = useState([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [generatedHierarchy, setGeneratedHierarchy] = useState(null);
  const [showFormFromChat, setShowFormFromChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const showAgenticCreate = false;
  const isSidePanelOpen = editPanelOpen || clonePanelOpen || createPanelOpen || aiChatOpen;

  const normalizeDimensionKey = (rawDimension) => {
    if (!rawDimension) return rawDimension;
    const cleaned = rawDimension.trim().toLowerCase();

    if (cleaned === 'account' || cleaned === 'accounts') return 'Accounts';
    if (cleaned === 'product' || cleaned === 'products') return 'Products';

    return rawDimension;
  };
  
  // Sample hierarchy data - exact values from Figma (now as state)
  const [hierarchies, setHierarchies] = useState([
    { name: 'AccountSales', dimension: 'Accounts', levelStructure: '3 Levels (HQ-->Regional-->Country)', dataStatus: 'Data Requested', lastSync: '12/05/2026, 10:30 AM', createdOn: 'Mar 23, 2026', selected: false, isActive: true },
    { name: 'ProductCatalog', dimension: 'Products', levelStructure: '3 Levels (Category-->Family-->SKU)', dataStatus: 'Data Requested', lastSync: '12/05/2026, 8:00 AM', createdOn: 'Mar 30, 2026', selected: false, isActive: false },
  ]);

  const filteredHierarchies = hierarchies.filter((hierarchy) => {
    if (hierarchy.name === 'New Hierarchy') return false;
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      hierarchy.name.toLowerCase().includes(query) ||
      hierarchy.dimension.toLowerCase().includes(query) ||
      hierarchy.levelStructure.toLowerCase().includes(query) ||
      hierarchy.dataStatus.toLowerCase().includes(query) ||
      hierarchy.createdOn.toLowerCase().includes(query)
    );
  });

  const groupedHierarchies = filteredHierarchies.reduce((groups, hierarchy) => {
    const normalizedDimension = normalizeDimensionKey(hierarchy.dimension);
    if (!groups[normalizedDimension]) {
      groups[normalizedDimension] = [];
    }
    groups[normalizedDimension].push(hierarchy);
    return groups;
  }, {});

  if (!isOpen) return null;

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleMenuAction = (action, hierarchy) => {
    console.log(`Action: ${action}, Hierarchy: ${hierarchy.name}`);
    setOpenMenuIndex(null);
    
    if (action === 'edit') {
      setSelectedHierarchy(hierarchy);
      setEditPanelOpen(true);
      setClonePanelOpen(false);
    } else if (action === 'duplicate') {
      setSelectedHierarchy(hierarchy);
      setCloneHierarchyName(`Clone of ${hierarchy.name}`);
      setCloneLevels([
        { id: 0, level: 0, name: 'Parent Account', isEditable: false },
        { id: 1, level: 1, name: 'Account', isEditable: false },
        { id: 2, level: 2, name: '', isEditable: true },
        { id: 3, level: 3, name: '', isEditable: true },
        { id: 4, level: 4, name: '', isEditable: true },
      ]);
      setCloneNumLevels(5);
      setClonePanelOpen(true);
      setEditPanelOpen(false);
    }
  };

  const showSuccessToast = (message, description = '') => {
    setToastMessage(message);
    setToastDescription(description);
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  const closeEditPanel = () => {
    setEditPanelOpen(false);
    setSelectedHierarchy(null);
  };

  const closeClonePanel = () => {
    setClonePanelOpen(false);
    setSelectedHierarchy(null);
    setCloneHierarchyName('');
    setCloneNumLevels(5);
    setCloneLevelMenuIndex(null);
    setCloneLevels([
      { id: 0, level: 0, name: 'Parent Account', isEditable: false },
      { id: 1, level: 1, name: 'Account', isEditable: false },
      { id: 2, level: 2, name: '', isEditable: true },
      { id: 3, level: 3, name: '', isEditable: true },
      { id: 4, level: 4, name: '', isEditable: true },
    ]);
  };

  const openCreatePanel = () => {
    setCreatePanelOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setCreateHierarchyName('');
    setCreateDimension('Account');
    setCreateLevels([
      { id: 0, level: 0, name: '', isEditable: true },
      { id: 1, level: 1, name: '', isEditable: true },
      { id: 2, level: 2, name: '', isEditable: true },
      { id: 3, level: 3, name: '', isEditable: true },
      { id: 4, level: 4, name: '', isEditable: true },
    ]);
    setCreateNumLevels(5);
  };

  const closeCreatePanel = () => {
    setCreatePanelOpen(false);
    setCreateHierarchyName('');
    setCreateDimension('Account');
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

  const handleGoToSetupDetails = () => {
    onClose();
  };

  const toggleCloneLevelMenu = (index) => {
    setCloneLevelMenuIndex(cloneLevelMenuIndex === index ? null : index);
  };

  const handleAddLevel = (index) => {
    const newLevels = [...cloneLevels];
    const maxId = Math.max(...newLevels.map(l => l.id));
    const newLevel = {
      id: maxId + 1,
      level: newLevels[index].level + 1,
      name: '',
      isEditable: true
    };
    // Insert the new level right after the clicked row
    newLevels.splice(index + 1, 0, newLevel);
    
    // Update level numbers for all levels after the inserted one
    for (let i = index + 2; i < newLevels.length; i++) {
      newLevels[i].level = i;
    }
    
    setCloneLevels(newLevels);
    setCloneNumLevels(newLevels.length);
    setCloneLevelMenuIndex(null);
  };

  const handleDeleteLevel = (index) => {
    if (cloneLevels.length > 1) {
      const newLevels = cloneLevels.filter((_, i) => i !== index);
      
      // Update level numbers for all remaining levels
      const updatedLevels = newLevels.map((level, i) => ({
        ...level,
        level: i
      }));
      
      setCloneLevels(updatedLevels);
      setCloneNumLevels(updatedLevels.length);
    }
    setCloneLevelMenuIndex(null);
  };

  const toggleCreateLevelMenu = (index) => {
    setCreateLevelMenuIndex(createLevelMenuIndex === index ? null : index);
  };

  const handleAddCreateLevel = (index) => {
    const newLevels = [...createLevels];
    const maxId = Math.max(...newLevels.map(l => l.id));
    const newLevel = {
      id: maxId + 1,
      level: newLevels[index].level + 1,
      name: '',
      isEditable: true
    };
    newLevels.splice(index + 1, 0, newLevel);
    
    for (let i = index + 2; i < newLevels.length; i++) {
      newLevels[i].level = i;
    }
    
    setCreateLevels(newLevels);
    setCreateNumLevels(newLevels.length);
    setCreateLevelMenuIndex(null);
  };

  const handleDeleteCreateLevel = (index) => {
    if (createLevels.length > 1) {
      const newLevels = createLevels.filter((_, i) => i !== index);
      
      const updatedLevels = newLevels.map((level, i) => ({
        ...level,
        level: i
      }));
      
      setCreateLevels(updatedLevels);
      setCreateNumLevels(updatedLevels.length);
    }
    setCreateLevelMenuIndex(null);
  };

  const openAgenticCreate = () => {
    setAiChatOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setCreatePanelOpen(false);
    setShowFormFromChat(false);
    
    // Add welcome message if chat is empty
    if (chatMessages.length === 0) {
      setChatMessages([{
        role: 'ai',
        content: "Hi! I'm your AI assistant for managing hierarchies. How can I help you today?",
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const closeAiChat = () => {
    setAiChatOpen(false);
    setChatMessages([]);
    setGeneratedHierarchy(null);
    setShowFormFromChat(false);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiTyping(true);

    // Mock AI response with delay
    setTimeout(() => {
      processAiResponse(chatInput);
      setIsAiTyping(false);
    }, 1500);
  };

  const processAiResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let aiResponse = '';
    let hierarchyData = null;
    let followUpPrompts = [];

    // Extract intent signals
    const isCreating = input.includes('create') || input.includes('new') || input.includes('build') || input.includes('set up') || input.includes('setup');
    const isCloning = input.includes('clone') || input.includes('copy') || input.includes('duplicate');
    const isEditing = input.includes('edit') || input.includes('modify') || input.includes('change') || input.includes('add') || input.includes('update');
    
    // Detect domain/purpose signals
    const isForecasting = input.includes('forecast') || input.includes('fy 27') || input.includes('fy27') || input.includes('fy 28') || input.includes('fy28') || input.includes('next year');
    const isReporting = input.includes('report') || input.includes('executive') || input.includes('senior') || input.includes('leadership') || input.includes('monitor') || input.includes('track');
    const isGeographic = input.includes('region') || input.includes('international') || input.includes('country') || input.includes('territory') || input.includes('global');
    const isOrganizational = input.includes('department') || input.includes('division') || input.includes('team') || input.includes('corporate');
    const isProduct = input.includes('product') || input.includes('category') || input.includes('e-commerce') || input.includes('inventory') || input.includes('sku');
    const isAccount = input.includes('account') || input.includes('customer') || input.includes('client');

    // Detect intent
    if (isCreating) {
      // Create hierarchy flow - generate contextual names
      if (!isAccount && !isProduct && !input.includes('dimension')) {
        aiResponse = "I'd be happy to help you create a new hierarchy! What dimension would you like to create it for? (e.g., Accounts, Products, or a custom dimension)";
        followUpPrompts = [
          "Create an Account hierarchy for sales tracking",
          "Create a Product hierarchy for inventory",
          "Create a Time hierarchy for fiscal planning"
        ];
      } else {
        const dimension = isProduct ? 'Products' : 'Account';
        let hierarchyName = 'Regional Account Hierarchy';
        let levels = [];
        
        // Context-aware naming based on user's request
        if ((isAccount || isGeographic) && (isReporting || isGeographic)) {
          hierarchyName = 'Regional Account Hierarchy';
          levels = [
            { id: 0, level: 0, name: 'Enterprise', isEditable: true },
            { id: 1, level: 1, name: 'Strategic Accounts', isEditable: true },
            { id: 2, level: 2, name: 'Key Accounts', isEditable: true },
            { id: 3, level: 3, name: 'Named Accounts', isEditable: true },
            { id: 4, level: 4, name: 'Account', isEditable: true }
          ];
          aiResponse = `Created: Regional Account Hierarchy

Levels: Enterprise → Strategic Accounts → Key Accounts → Named Accounts → Account

Purpose: Monitor account performance by tier and priority for senior leadership.

Click "View Hierarchy" below to review and customize.`;
          
          // Intelligent follow-ups based on reporting intent
          if (isReporting) {
            followUpPrompts = [
              "Create a Product hierarchy for cross-sell analysis",
              "Set up a Time hierarchy for trend reporting",
              "Clone this for EMEA region only"
            ];
          } else {
            followUpPrompts = [
              "Create department-based Account hierarchy",
              "Add custom attributes to hierarchy levels",
              "Set up Product categories next"
            ];
          }
        } else if (isProduct) {
          hierarchyName = 'E-commerce Product Hierarchy';
          levels = [
            { id: 0, level: 0, name: 'Division', isEditable: true },
            { id: 1, level: 1, name: 'Category', isEditable: true },
            { id: 2, level: 2, name: 'Sub-Category', isEditable: true },
            { id: 3, level: 3, name: 'Product Family', isEditable: true },
            { id: 4, level: 4, name: 'Product', isEditable: true }
          ];
          aiResponse = `Created: E-commerce Product Hierarchy

Levels: Division → Category → Sub-Category → Product Family → Product

Purpose: Organize products for inventory and sales tracking.

Click "View Hierarchy" below to customize level names.`;
          
          // Intelligent follow-ups for product context
          if (input.includes('e-commerce') || input.includes('online')) {
            followUpPrompts = [
              "Create Customer segment hierarchy",
              "Set up Channel hierarchy (online/retail/wholesale)",
              "Add seasonality-based Product groupings"
            ];
          } else {
            followUpPrompts = [
              "Create Brand-based Product hierarchy",
              "Set up Supplier hierarchy",
              "Add warehouse location hierarchy"
            ];
          }
        } else {
          levels = [
            { id: 0, level: 0, name: `Parent ${dimension}`, isEditable: false },
            { id: 1, level: 1, name: dimension, isEditable: false },
            { id: 2, level: 2, name: 'Level 2', isEditable: true },
            { id: 3, level: 3, name: 'Level 3', isEditable: true },
            { id: 4, level: 4, name: 'Level 4', isEditable: true }
          ];
          aiResponse = `Created: ${dimension} Hierarchy

Levels: 5 levels configured

Click "View Hierarchy" below to customize level names and structure.`;
          followUpPrompts = [
            "Add descriptive names to each level",
            "Create a complementary hierarchy",
            "Set up data mapping rules"
          ];
        }
        
        hierarchyData = {
          type: 'create',
          name: hierarchyName,
          dimension: dimension,
          levels: levels,
          numLevels: 5
        };
      }
    } else if (isCloning) {
      // Clone hierarchy flow - context-aware
      let cloneName = 'Clone of FY 26 Accounts';
      let cloneLevels = [
        { id: 0, level: 0, name: 'Parent Account', isEditable: false },
        { id: 1, level: 1, name: 'Account', isEditable: false },
        { id: 2, level: 2, name: '', isEditable: true },
        { id: 3, level: 3, name: '', isEditable: true },
        { id: 4, level: 4, name: '', isEditable: true }
      ];
      
      if (isForecasting || input.includes('fy 27') || input.includes('fy27')) {
        cloneName = 'FY 27 Accounts Forecast';
        cloneLevels = [
          { id: 0, level: 0, name: 'Corporate', isEditable: true },
          { id: 1, level: 1, name: 'Division', isEditable: true },
          { id: 2, level: 2, name: 'Department', isEditable: true },
          { id: 3, level: 3, name: 'Team', isEditable: true },
          { id: 4, level: 4, name: 'Account', isEditable: true }
        ];
        aiResponse = `Created: FY 27 Accounts Forecast

Cloned from: FY 26 structure

Levels: Corporate → Division → Department → Team → Account

Purpose: Annual planning and forecasting.

Click "View Hierarchy" below to review.`;
        
        // Forward-looking follow-ups for forecasting
        followUpPrompts = [
          "Create FY 28 forecast structure",
          "Set up scenario planning hierarchies",
          "Clone Product hierarchy for FY 27"
        ];
      } else if (isGeographic) {
        aiResponse = `Cloned: FY 26 Accounts Hierarchy (Geographic)

Focus: Geographic regions

You can customize regions and level structure for your market.

Click "View Hierarchy" below to modify.`;
        followUpPrompts = [
          "Customize regions for your market",
          "Create APAC-specific hierarchy",
          "Set up country-level overrides"
        ];
      } else {
        aiResponse = `Cloned: FY 26 Accounts Hierarchy

Status: Ready for customization

You can modify the hierarchy name and level structure as needed.

Click "View Hierarchy" below to customize.`;
        followUpPrompts = [
          "Adjust hierarchy for different business unit",
          "Create version for what-if analysis",
          "Set up parallel hierarchy for comparison"
        ];
      }
      
      hierarchyData = {
        type: 'clone',
        name: cloneName,
        dimension: 'Account',
        levels: cloneLevels,
        numLevels: 5
      };
    } else if (isEditing) {
      // Edit hierarchy flow
      hierarchyData = {
        type: 'edit',
        name: 'FY 25 Accounts',
        dimension: 'Account'
      };
      
      if (isProduct) {
        aiResponse = `Ready to modify: Product Hierarchy

Changes: Add new category levels for e-commerce division

You can update the level structure and naming.

Click "View Hierarchy" below to make changes.`;
        followUpPrompts = [
          "Add seasonal product groupings",
          "Create promotion-based categories",
          "Set up brand consolidation levels"
        ];
      } else if (input.includes('level') || input.includes('add')) {
        aiResponse = `Ready to edit: FY 25 Accounts Hierarchy

Changes: Add or modify hierarchy levels

Current structure will be preserved unless you make changes.

Click "View Hierarchy" below to edit.`;
        followUpPrompts = [
          "Add sub-regional level for granularity",
          "Insert department level between division and team",
          "Create roll-up level for executive view"
        ];
      } else if (input.includes('rename') || input.includes('name')) {
        aiResponse = `Ready to rename: Hierarchy Levels

Changes: Update level names to match business terminology

Current structure will remain the same.

Click "View Hierarchy" below to rename.`;
        followUpPrompts = [
          "Standardize naming across all hierarchies",
          "Use industry-specific terminology",
          "Align names with data source labels"
        ];
      } else {
        aiResponse = `Ready to edit: FY 25 Accounts Hierarchy

Changes: Modify hierarchy structure

You can reorganize levels and consolidate as needed.

Click "View Hierarchy" below to edit.`;
        followUpPrompts = [
          "Reorganize hierarchy levels",
          "Consolidate redundant levels",
          "Preview impact on existing data"
        ];
      }
    } else {
      // Default response with context-aware suggestions
      aiResponse = `Welcome! I can help you with:

• Create new hierarchies
• Clone existing hierarchies
• Edit hierarchy levels and structure

What would you like to do?`;
      followUpPrompts = [
        "Create regional Account hierarchy for executive reporting",
        "Clone existing hierarchy for next fiscal year",
        "Modify Product hierarchy to add new categories"
      ];
    }

    const aiMessage = {
      role: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString(),
      hierarchyData: hierarchyData,
      followUpPrompts: followUpPrompts
    };

    setChatMessages(prev => [...prev, aiMessage]);
    if (hierarchyData) {
      setGeneratedHierarchy(hierarchyData);
    }
  };

  const handleStarterPrompt = (prompt) => {
    const userMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      processAiResponse(prompt);
      setIsAiTyping(false);
    }, 1500);
  };

  const handleViewHierarchy = (hierarchyData) => {
    setAiChatOpen(false);
    setShowFormFromChat(true);

    if (hierarchyData.type === 'create') {
      setCreateHierarchyName(hierarchyData.name);
      setCreateDimension(hierarchyData.dimension);
      setCreateLevels(hierarchyData.levels);
      setCreateNumLevels(hierarchyData.numLevels);
      setCreatePanelOpen(true);
    } else if (hierarchyData.type === 'clone') {
      setCloneHierarchyName(hierarchyData.name);
      setCloneLevels(hierarchyData.levels);
      setCloneNumLevels(hierarchyData.numLevels);
      setClonePanelOpen(true);
    } else if (hierarchyData.type === 'edit') {
      setSelectedHierarchy({ name: hierarchyData.name });
      setEditPanelOpen(true);
    }
  };

  const handleBackToChat = () => {
    setCreatePanelOpen(false);
    setClonePanelOpen(false);
    setEditPanelOpen(false);
    setShowFormFromChat(false);
    setAiChatOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-container modal-hierarchies ${(editPanelOpen || clonePanelOpen || createPanelOpen || aiChatOpen) ? 'with-panel' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header modal-header-simple">
          <h2 className="modal-title">Setup Hierarchies</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-simple">
          {/* Content Area: main content and side panel */}
          <div className={`hierarchies-content-wrapper ${isSidePanelOpen ? 'panel-open' : ''}`}>
            <div className="hierarchies-main-content">
              {/* Header Info */}
              <div className="hierarchies-header">
                <div className="hierarchies-button-group">
                  {showAgenticCreate && (
                    <button className="hierarchies-sparkle-button" onClick={openAgenticCreate}>
                      <img src={imgSparkleIcon} alt="Agentic Create" />
                    </button>
                  )}
                  <button className="hierarchies-sync-button">Sync to Data Cloud</button>
                  <button className="hierarchies-create-button" onClick={openCreatePanel}>Create New</button>
                </div>
              </div>

              <div className="measures-info-bar">
                <span className="measures-info-bar-text">Need more context on these hierarchies?</span>
                <button className="measures-info-bar-link" onClick={handleGoToSetupDetails}>
                  Go to Setup for more details
                </button>
              </div>

              {/* Search */}
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

              {/* Hierarchies Table */}
              <div className="hierarchies-table-container">
                <table className="hierarchies-table">
                  <thead>
                    <tr>
                      <th className="table-cell-checkbox">
                        <input type="checkbox" />
                      </th>
                      <th>Hierarchy Name</th>
                      <th>Level Structure</th>
                      <th>Data Status</th>
                      <th>Created On</th>
                      <th className="table-cell-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(groupedHierarchies).map(([dimension, dimensionHierarchies], groupIndex) => (
                      <React.Fragment key={dimension}>
                        <tr className="hierarchy-group-row">
                          <td colSpan="6">
                            <span className="hierarchy-group-title">
                              {dimension} ({dimensionHierarchies.length})
                            </span>
                          </td>
                        </tr>
                        {dimensionHierarchies.map((hierarchy, rowIndex) => {
                          const menuIndex = `${groupIndex}-${rowIndex}`;
                          return (
                            <tr
                              key={`${dimension}-${hierarchy.name}`}
                              className={(editPanelOpen || clonePanelOpen) && selectedHierarchy?.name === hierarchy.name ? 'row-selected' : ''}
                            >
                              <td className="table-cell-checkbox">
                                <input type="checkbox" defaultChecked={hierarchy.selected} />
                              </td>
                              <td style={{ cursor: 'pointer' }} onClick={() => handleMenuAction('edit', hierarchy)}>
                                <div className="hierarchy-name-cell">
                                  <span style={{ color: '#0176d3', textDecoration: 'none' }}>{hierarchy.name}</span>
                                  {hierarchy.isActive && (
                                    <span className="active-badge">Active</span>
                                  )}
                                </div>
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
                                    className="table-row-dropdown"
                                    onClick={() => toggleMenu(menuIndex)}
                                  >
                                    <img src={imgDownIcon} alt="Actions" />
                                  </button>
                                  {openMenuIndex === menuIndex && (
                                    <div className="dropdown-menu">
                                      <button
                                        className="dropdown-menu-item"
                                        onClick={() => handleMenuAction('edit', hierarchy)}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="dropdown-menu-item"
                                        onClick={() => handleMenuAction('duplicate', hierarchy)}
                                      >
                                        Clone
                                      </button>
                                      <button
                                        className="dropdown-menu-item"
                                        onClick={() => handleMenuAction('sync', hierarchy)}
                                      >
                                        Sync Now
                                      </button>
                                      <div className="dropdown-menu-divider"></div>
                                      <button
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
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Panel - appears to the right of the table */}
            {editPanelOpen && selectedHierarchy && (
              <div className="edit-panel">
                {/* Panel Header */}
                <div className="edit-panel-header">
                  {showFormFromChat && (
                    <button className="ai-breadcrumb" onClick={handleBackToChat}>
                      ← Back to AI Chat
                    </button>
                  )}
                  {!showFormFromChat && (
                    <h3 className="edit-panel-title">Edit Hierarchy</h3>
                  )}
                  <div className="edit-panel-header-actions">
                    <button className="edit-panel-icon-button edit-panel-icon-button-cancel" onClick={closeEditPanel}>
                      ✕
                    </button>
                    <button className="edit-panel-icon-button edit-panel-icon-button-save" onClick={() => {
                      closeEditPanel();
                      showSuccessToast('Hierarchy updated successfully');
                    }}>
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Panel Body */}
                <div className="edit-panel-body">
                  {/* Hierarchy Title */}
                  <div className="edit-panel-section-title">
                    <p>FY 25 Accounts</p>
                  </div>

                  {/* Info Notification */}
                  <div className="edit-panel-notification">
                    <div className="notification-icon">ⓘ</div>
                    <p className="notification-text">
                      You can only edit the level names but not no.of levels
                    </p>
                  </div>

                  {/* Tree Grid */}
                  <div className="edit-panel-tree">
                    <div className="tree-header">
                      <div className="tree-header-cell">Hierarchy Level</div>
                      <div className="tree-header-cell">Name</div>
                    </div>

                    {/* Tree Rows */}
                    <div className="tree-row">
                      <div className="tree-cell">
                        <button className="tree-chevron">›</button>
                        <span className="tree-node-link">Account L0</span>
                      </div>
                      <div className="tree-cell">
                        <input type="text" className="tree-input" defaultValue="Parent Account" />
                      </div>
                    </div>

                    <div className="tree-row tree-row-level-1">
                      <div className="tree-cell">
                        <button className="tree-chevron">›</button>
                        <span className="tree-node-link">Account L1</span>
                      </div>
                      <div className="tree-cell">
                        <input type="text" className="tree-input" defaultValue="Account" />
                      </div>
                    </div>

                    <div className="tree-row tree-row-level-2">
                      <div className="tree-cell">
                        <button className="tree-chevron">›</button>
                        <span className="tree-node-link">Account L2</span>
                      </div>
                      <div className="tree-cell">
                        <input type="text" className="tree-input" defaultValue="Enter Name" />
                      </div>
                    </div>

                    <div className="tree-row tree-row-level-3">
                      <div className="tree-cell">
                        <button className="tree-chevron">›</button>
                        <span className="tree-node-link">Account L3</span>
                      </div>
                      <div className="tree-cell">
                        <input type="text" className="tree-input" defaultValue="Enter Name" />
                      </div>
                    </div>

                    <div className="tree-row tree-row-level-4">
                      <div className="tree-cell">
                        <button className="tree-chevron tree-chevron-empty"></button>
                        <span className="tree-node-link">Account L4</span>
                      </div>
                      <div className="tree-cell">
                        <input type="text" className="tree-input" defaultValue="Enter Name" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clone Panel - appears to the right of the table */}
            {clonePanelOpen && selectedHierarchy && (
              <div className="edit-panel clone-panel">
                {/* Panel Header */}
                <div className="edit-panel-header">
                  {showFormFromChat && (
                    <button className="ai-breadcrumb" onClick={handleBackToChat}>
                      ← Back to AI Chat
                    </button>
                  )}
                  {!showFormFromChat && (
                    <h3 className="edit-panel-title">Clone Hierarchy</h3>
                  )}
                  <div className="edit-panel-header-actions">
                    <button className="edit-panel-icon-button edit-panel-icon-button-cancel" onClick={closeClonePanel}>
                      ✕
                    </button>
                    <button className="edit-panel-icon-button edit-panel-icon-button-save" onClick={() => {
                      // Create cloned hierarchy object
                      const clonedHierarchy = {
                        name: cloneHierarchyName || `Clone of ${selectedHierarchy.name}`,
                        dimension: selectedHierarchy.dimension,
                        dataStatus: 'Not Synced',
                        lastSync: 'Never',
                        selected: false,
                        isActive: false
                      };
                      
                      // Add to top of the list
                      setHierarchies([clonedHierarchy, ...hierarchies]);
                      
                      closeClonePanel();
                      showSuccessToast('Hierarchy cloned successfully');
                    }}>
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Panel Body */}
                <div className="edit-panel-body">
                  {/* New Hierarchy Name */}
                  <div className="clone-form-section">
                    <label className="clone-form-label">
                      * New Hierarchy Name
                    </label>
                    <input
                      type="text"
                      className="clone-form-input"
                      value={cloneHierarchyName}
                      onChange={(e) => setCloneHierarchyName(e.target.value)}
                      placeholder="Clone of FY 26 Accounts"
                    />
                  </div>

                  {/* Enter Number of Levels */}
                  <div className="clone-form-section">
                    <div className="clone-form-label-row">
                      <label className="clone-form-label">
                        Enter Number of Levels for your hierarchy
                      </label>
                      <button className="clone-info-icon">ⓘ</button>
                    </div>
                    <div className="clone-level-control">
                      <button 
                        className="clone-level-button"
                        onClick={() => {
                          if (cloneLevels.length > 1) {
                            const newLevels = cloneLevels.slice(0, -1);
                            setCloneLevels(newLevels);
                            setCloneNumLevels(newLevels.length);
                          }
                        }}
                      >
                        −
                      </button>
                      <span className="clone-level-value">{cloneNumLevels}</span>
                      <button 
                        className="clone-level-button"
                        onClick={() => {
                          const newLevels = [...cloneLevels];
                          const maxId = Math.max(...newLevels.map(l => l.id));
                          newLevels.push({
                            id: maxId + 1,
                            level: newLevels.length,
                            name: '',
                            isEditable: true
                          });
                          setCloneLevels(newLevels);
                          setCloneNumLevels(newLevels.length);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Hierarchy Level Table */}
                  <div className="clone-hierarchy-table">
                    <div className="clone-table-header">
                      <div className="clone-table-header-cell">Hierarchy Level</div>
                      <div className="clone-table-header-cell">Name</div>
                      <div className="clone-table-header-cell clone-table-header-actions"></div>
                    </div>
                    <div className="clone-table-body">
                      {cloneLevels.map((levelData, index) => {
                        const isLastLevel = index === cloneLevels.length - 1;
                        const indentClass = levelData.level > 0 ? `clone-table-row-indent-${levelData.level}` : '';
                        
                        return (
                          <div key={levelData.id} className={`clone-table-row ${indentClass}`}>
                            <div className="clone-table-cell">
                              {isLastLevel ? (
                                <button className="clone-chevron-empty"></button>
                              ) : (
                                <button className="clone-chevron">›</button>
                              )}
                              <span className="clone-level-text">{createDimension} L{levelData.level}</span>
                            </div>
                            <div className="clone-table-cell">
                              {levelData.isEditable ? (
                                <input 
                                  type="text" 
                                  className="clone-name-input" 
                                  placeholder="Enter Name"
                                  defaultValue={levelData.name}
                                />
                              ) : (
                                <span className="clone-name-text">{levelData.name}</span>
                              )}
                            </div>
                            <div className="clone-table-cell clone-table-cell-actions">
                              <div className="clone-level-dropdown-wrapper">
                                <button 
                                  className="clone-level-dropdown-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCloneLevelMenu(index);
                                  }}
                                >
                                  <img src={imgDownIcon} alt="Actions" />
                                </button>
                                {cloneLevelMenuIndex === index && (
                                  <div className="clone-level-dropdown-menu">
                                    <button 
                                      className="clone-level-dropdown-item"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddLevel(index);
                                      }}
                                    >
                                      Add Level
                                    </button>
                                    <button 
                                      className="clone-level-dropdown-item"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteLevel(index);
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
              </div>
            )}

            {/* Create Panel - appears to the right of the table */}
            {createPanelOpen && (
              <div className="edit-panel clone-panel">
                {/* Panel Header */}
                <div className="edit-panel-header">
                  {showFormFromChat && (
                    <button className="ai-breadcrumb" onClick={handleBackToChat}>
                      ← Back to AI Chat
                    </button>
                  )}
                  {!showFormFromChat && (
                    <h3 className="edit-panel-title">Create New Hierarchy</h3>
                  )}
                  <div className="edit-panel-header-actions">
                    <button className="edit-panel-icon-button edit-panel-icon-button-cancel" onClick={closeCreatePanel}>
                      ✕
                    </button>
                    <button className="edit-panel-icon-button edit-panel-icon-button-save" onClick={() => {
                      const trimmedHierarchyName = createHierarchyName.trim();
                      if (!trimmedHierarchyName) {
                        return;
                      }

                      // Create new hierarchy object
                      const newHierarchy = {
                        name: trimmedHierarchyName,
                        dimension: normalizeDimensionKey(createDimension),
                        dataStatus: 'Not Synced',
                        lastSync: 'Never',
                        createdOn: 'May 13, 2026',
                        levelStructure: `${createLevels.length} Levels (Custom)`,
                        selected: false,
                        isActive: false
                      };
                      
                      // Add to top of the list
                      setHierarchies([newHierarchy, ...hierarchies]);
                      
                      closeCreatePanel();
                      showSuccessToast('Hierarchy created successfully');
                    }}>
                      <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Panel Body */}
                <div className="edit-panel-body">
                  {/* New Hierarchy Name */}
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

                  {/* Dimension Dropdown */}
                  <div className="clone-form-section">
                    <div className="clone-form-label-row">
                      <label className="clone-form-label">
                        Dimension
                      </label>
                      <div className="dimension-create-wrapper">
                        <button 
                          className="dimension-link-button"
                          onClick={() => setShowDimensionPopover(!showDimensionPopover)}
                        >
                          Create New
                        </button>
                        {showDimensionPopover && (
                          <div className="dimension-popover">
                            <div className="dimension-popover-content">
                              <div className="dimension-popover-field">
                                <label className="dimension-popover-label">New Dimension Name</label>
                                <input
                                  type="text"
                                  className="dimension-popover-input"
                                  value={newDimensionName}
                                  onChange={(e) => setNewDimensionName(e.target.value)}
                                  placeholder="Enter dimension name"
                                />
                              </div>
                              <div className="dimension-popover-field">
                                <label className="dimension-popover-label">DMO</label>
                                <select
                                  className="dimension-popover-input dimension-popover-select"
                                  value={newDimensionDMO}
                                  onChange={(e) => setNewDimensionDMO(e.target.value)}
                                >
                                  <option value="">Select DMO</option>
                                  <option value="Account">Account</option>
                                  <option value="Contact">Contact</option>
                                  <option value="Location">Location</option>
                                  <option value="Opportunity">Opportunity</option>
                                  <option value="Product">Product</option>
                                  <option value="Territory">Territory</option>
                                </select>
                              </div>
                              <div className="dimension-popover-actions">
                                <button 
                                  className="dimension-popover-button dimension-popover-button-cancel"
                                  onClick={() => {
                                    setShowDimensionPopover(false);
                                    setNewDimensionName('');
                                    setNewDimensionDMO('');
                                  }}
                                >
                                  Cancel
                                </button>
                                <button 
                                  className="dimension-popover-button dimension-popover-button-save"
                                  onClick={() => {
                                    if (newDimensionName.trim()) {
                                      // Add the new dimension to the list
                                      setCustomDimensions([...customDimensions, newDimensionName.trim()]);
                                      // Set it as the selected dimension
                                      setCreateDimension(newDimensionName.trim());
                                    }
                                    setShowDimensionPopover(false);
                                    setNewDimensionName('');
                                    setNewDimensionDMO('');
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <select
                      className="clone-form-input clone-form-select"
                      value={createDimension}
                      onChange={(e) => setCreateDimension(e.target.value)}
                    >
                      <option value="Account">Account</option>
                      <option value="Products">Products</option>
                      {customDimensions.map((dimension, index) => (
                        <option key={index} value={dimension}>{dimension}</option>
                      ))}
                    </select>
                  </div>

                  {/* Enter Number of Levels */}
                  <div className="clone-form-section">
                    <div className="clone-form-label-row">
                      <label className="clone-form-label">
                        Enter Number of Levels for your hierarchy
                      </label>
                      <button className="clone-info-icon">ⓘ</button>
                    </div>
                    <div className="clone-level-control">
                      <button 
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
                        className="clone-level-button"
                        onClick={() => {
                          const newLevels = [...createLevels];
                          const maxId = Math.max(...newLevels.map(l => l.id));
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

                  {/* Hierarchy Level Table */}
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
                                <button className="clone-chevron-empty"></button>
                              ) : (
                                <button className="clone-chevron">›</button>
                              )}
                              <span className="clone-level-text">{createDimension} L{levelData.level}</span>
                            </div>
                            <div className="clone-table-cell">
                              <input 
                                type="text" 
                                className="clone-name-input" 
                                placeholder="Enter Name"
                                defaultValue={levelData.name}
                              />
                            </div>
                            <div className="clone-table-cell clone-table-cell-actions">
                              <div className="clone-level-dropdown-wrapper">
                                <button 
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
                                      className="clone-level-dropdown-item"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddCreateLevel(index);
                                      }}
                                    >
                                      Add Level
                                    </button>
                                    <button 
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
              </div>
            )}

            {/* AI Chat Panel - appears to the right of the table */}
            {aiChatOpen && (
              <div className="edit-panel ai-chat-panel">
                {/* Panel Header */}
                <div className="edit-panel-header ai-chat-header">
                  <h3 className="ai-chat-title">Agentforce</h3>
                  <button className="ai-chat-close" onClick={closeAiChat}>
                    <img src={imgCloseIcon} alt="Close" />
                  </button>
                </div>

                {/* Panel Body */}
                <div className="edit-panel-body ai-chat-body">
                  {/* Chat Messages */}
                  <div className="ai-chat-messages">
                    {chatMessages.map((message, index) => (
                      <React.Fragment key={index}>
                        <div className={`ai-chat-message ${message.role}`}>
                          <div className="ai-message-bubble">
                            <p className="ai-message-content">{message.content}</p>
                            {message.hierarchyData && (
                              <button 
                                className="ai-view-button"
                                onClick={() => handleViewHierarchy(message.hierarchyData)}
                              >
                                View Hierarchy
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Follow-up Prompts - shown after AI responses */}
                        {message.role === 'ai' && message.followUpPrompts && message.followUpPrompts.length > 0 && index === chatMessages.length - 1 && !isAiTyping && (
                          <div className="ai-starter-prompts">
                            {message.followUpPrompts.map((prompt, promptIndex) => (
                              <button 
                                key={promptIndex}
                                className="ai-starter-prompt"
                                onClick={() => handleStarterPrompt(prompt)}
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                    
                    {/* Initial Starter Prompts - shown after welcome message */}
                    {chatMessages.length === 1 && (
                      <div className="ai-starter-prompts">
                        <button 
                          className="ai-starter-prompt"
                          onClick={() => handleStarterPrompt("Create an Account hierarchy for senior leadership to monitor regional buisness")}
                        >
                          Create an Account hierarchy for senior leadership to monitor regional buisness
                        </button>
                        <button 
                          className="ai-starter-prompt"
                          onClick={() => handleStarterPrompt("Clone FY 26 Accounts hierarchy to create FY 27 forecast structure")}
                        >
                          Clone FY 26 Accounts hierarchy to create FY 27 forecast structure
                        </button>
                        <button 
                          className="ai-starter-prompt"
                          onClick={() => handleStarterPrompt("Modify Product hierarchy to add new category levels for e-commerce division")}
                        >
                          Modify Product hierarchy to add new category levels for e-commerce division
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

                  {/* Chat Input */}
                  <div className="ai-chat-input-container">
                    <input
                      type="text"
                      className="ai-chat-input"
                      placeholder="Describe what you need..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      className="ai-send-button"
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                    >
                      <img src={imgSendIcon} alt="Send" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="modal-done-button" onClick={onClose}>Done</button>
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
