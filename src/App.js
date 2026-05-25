import React, { useState } from 'react';
import './App.css';
import GlobalHeader from './components/GlobalHeader';
import LeftSidebar from './components/LeftSidebar';
import HeroContainer from './components/HeroContainer';
import MainContent from './components/MainContent';
import RightColumn from './components/RightColumn';
import PlanningViewPage from './components/PlanningViewPage';
import PlanningGridConfig from './components/PlanningGridConfig';
import HierarchySetupPage from './components/HierarchySetupPage';
import MeasuresPage from './components/MeasuresPage';
import CommercialLeftSidebar from './components/CommercialLeftSidebar';
import CommercialHeroContainer from './components/CommercialHeroContainer';
import CommercialMainContent from './components/CommercialMainContent';
import CommercialRightColumn from './components/CommercialRightColumn';
import CommercialPlanningViewPage from './components/CommercialPlanningViewPage';
import CommercialPlanningGridConfig from './components/CommercialPlanningGridConfig';
import CommercialHierarchySetupPage from './components/CommercialHierarchySetupPage';
import CommercialMeasuresPage from './components/CommercialMeasuresPage';

function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'setup', 'planning', 'gridconfig', or 'hierarchySetup'

  const workspaces = {
    commercial: {
      title: 'Commercial Planning for Manufacturing',
      description: 'Configure forecasts, dimensions, and workflows for manufacturing commercial plans.'
    },
    salesVolume: {
      title: 'Sales Volume Planning',
      description: 'Manage sales volume forecasts, planning steps, and setup in a dedicated workspace.'
    },
    salesVolumeAaf: {
      title: 'Commercial Planning for Manufacturing',
      description: 'Configure forecasts, dimensions, and workflows for manufacturing commercial plans.'
    }
  };

  const handleWorkspaceSelect = (workspaceKey) => {
    setSelectedWorkspace(workspaceKey);
    setCurrentPage('setup');
  };

  const handleNavigateToPlanningView = () => {
    setCurrentPage('planning');
  };

  const handleNavigateToSetup = () => {
    setCurrentPage('setup');
  };

  const handleNavigateToGridConfig = () => {
    setCurrentPage('gridconfig');
  };

  const handleNavigateToMeasuresPage = () => {
    setCurrentPage('measures');
  };

  const handleNavigateToHierarchySetup = () => {
    setCurrentPage('hierarchySetup');
  };

  const activeWorkspace = selectedWorkspace ? workspaces[selectedWorkspace] : null;
  const isCommercialFlow = selectedWorkspace === 'salesVolumeAaf';
  const ActiveLeftSidebar = isCommercialFlow ? CommercialLeftSidebar : LeftSidebar;
  const ActiveHeroContainer = isCommercialFlow ? CommercialHeroContainer : HeroContainer;
  const ActiveMainContent = isCommercialFlow ? CommercialMainContent : MainContent;
  const ActiveRightColumn = isCommercialFlow ? CommercialRightColumn : RightColumn;
  const ActivePlanningViewPage = isCommercialFlow ? CommercialPlanningViewPage : PlanningViewPage;
  const ActiveHierarchySetupPage = isCommercialFlow ? CommercialHierarchySetupPage : HierarchySetupPage;
  const ActiveMeasuresPage = isCommercialFlow ? CommercialMeasuresPage : MeasuresPage;
  const ActivePlanningGridConfig = isCommercialFlow ? CommercialPlanningGridConfig : PlanningGridConfig;

  if (currentPage === 'landing') {
    return (
      <div className="landing-page">
        <div className="landing-content">
          <h1 className="landing-title">Choose a Planning Workspace</h1>
          <p className="landing-subtitle">Select a card to open the planning experience.</p>
          <div className="landing-cards">
            <button
              className="landing-card"
              onClick={() => handleWorkspaceSelect('salesVolume')}
              type="button"
            >
              <h2>Sales Volume Planning</h2>
              <p>Open a duplicated planning page dedicated to Sales Volume Planning.</p>
            </button>
            <button
              className="landing-card"
              onClick={() => handleWorkspaceSelect('salesVolumeAaf')}
              type="button"
            >
              <h2>Commercial Planning for Manufacturing</h2>
              <p>Open a duplicated planning page dedicated to Commercial Planning for Manufacturing.</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <GlobalHeader />
      <div className="main-layout">
        {currentPage !== 'measures' && currentPage !== 'planning' && currentPage !== 'gridconfig' && (
          <ActiveLeftSidebar
            currentPage={currentPage}
            onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
            onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
            onNavigateToPlanningView={handleNavigateToPlanningView}
          />
        )}
        {currentPage === 'setup' ? (
          <div className="content-wrapper">
            <ActiveHeroContainer
              title={activeWorkspace?.title}
              description={activeWorkspace?.description}
            />
            <div className="content-body-wrapper">
              <div className="main-content-column">
                <ActiveMainContent
                  planningName={activeWorkspace?.title}
                  onNavigateToPlanningView={handleNavigateToPlanningView}
                  onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
                  onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
                />
              </div>
              <ActiveRightColumn planningName={activeWorkspace?.title} />
            </div>
          </div>
        ) : currentPage === 'planning' ? (
          <div className="content-wrapper" style={{ marginLeft: '0', width: '100%' }}>
            <ActivePlanningViewPage
              onNavigateBack={handleNavigateToSetup}
              onNavigateToGridConfig={handleNavigateToGridConfig}
              onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
              onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
            />
          </div>
        ) : currentPage === 'hierarchySetup' ? (
          <div className="content-wrapper" style={{ marginLeft: '225px', width: 'calc(100% - 225px)' }}>
            <ActiveHierarchySetupPage />
          </div>
        ) : currentPage === 'measures' ? (
          <div className="content-wrapper" style={{ marginLeft: '0', width: '100%' }}>
            <ActiveMeasuresPage
              onNavigateToPlanConfig={handleNavigateToPlanningView}
              onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
            />
          </div>
        ) : (
          <div
            className="content-wrapper grid-config-content-wrapper"
            style={{ marginLeft: '0', width: '100vw', maxWidth: '100vw' }}
          >
            <ActivePlanningGridConfig
              onBack={() => setCurrentPage('planning')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
