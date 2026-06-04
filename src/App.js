import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
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

const workspaces = {
  'sales-volume': {
    key: 'salesVolume',
    title: 'Sales Volume Planning',
    description: 'Manage sales volume forecasts, planning steps, and setup in a dedicated workspace.',
    isCommercial: false
  },
  'commercial-manufacturing': {
    key: 'salesVolumeAaf',
    title: 'Commercial Planning for Manufacturing',
    description: 'Configure forecasts, dimensions, and workflows for manufacturing commercial plans.',
    isCommercial: true
  }
};

function WorkspaceLayout({ page }) {
  const navigate = useNavigate();
  const { workspace } = useParams();
  const workspaceConfig = workspaces[workspace];

  if (!workspaceConfig) {
    return <div>Workspace not found</div>;
  }

  const isCommercialFlow = workspaceConfig.isCommercial;
  const ActiveLeftSidebar = isCommercialFlow ? CommercialLeftSidebar : LeftSidebar;
  const ActiveHeroContainer = isCommercialFlow ? CommercialHeroContainer : HeroContainer;
  const ActiveMainContent = isCommercialFlow ? CommercialMainContent : MainContent;
  const ActiveRightColumn = isCommercialFlow ? CommercialRightColumn : RightColumn;
  const ActivePlanningViewPage = isCommercialFlow ? CommercialPlanningViewPage : PlanningViewPage;
  const ActiveHierarchySetupPage = isCommercialFlow ? CommercialHierarchySetupPage : HierarchySetupPage;
  const ActiveMeasuresPage = isCommercialFlow ? CommercialMeasuresPage : MeasuresPage;
  const ActivePlanningGridConfig = isCommercialFlow ? CommercialPlanningGridConfig : PlanningGridConfig;

  const handleNavigateToPlanningView = () => navigate(`/${workspace}/planning`);
  const handleNavigateToSetup = () => navigate(`/${workspace}/setup`);
  const handleNavigateToGridConfig = () => navigate(`/${workspace}/grid-config`);
  const handleNavigateToMeasuresPage = () => navigate(`/${workspace}/measures`);
  const handleNavigateToHierarchySetup = () => navigate(`/${workspace}/hierarchy-setup`);

  return (
    <div className="app-container">
      <GlobalHeader />
      <div className="main-layout">
        {page !== 'measures' && page !== 'planning' && page !== 'gridconfig' && (
          <ActiveLeftSidebar
            currentPage={page}
            onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
            onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
            onNavigateToPlanningView={handleNavigateToPlanningView}
          />
        )}
        {page === 'setup' ? (
          <div className="content-wrapper">
            <ActiveHeroContainer
              title={workspaceConfig.title}
              description={workspaceConfig.description}
            />
            <div className="content-body-wrapper">
              <div className="main-content-column">
                <ActiveMainContent
                  planningName={workspaceConfig.title}
                  onNavigateToPlanningView={handleNavigateToPlanningView}
                  onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
                  onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
                />
              </div>
              <ActiveRightColumn planningName={workspaceConfig.title} />
            </div>
          </div>
        ) : page === 'planning' ? (
          <div className="content-wrapper" style={{ marginLeft: '0', width: '100%' }}>
            <ActivePlanningViewPage
              onNavigateBack={handleNavigateToSetup}
              onNavigateToGridConfig={handleNavigateToGridConfig}
              onNavigateToMeasuresPage={handleNavigateToMeasuresPage}
              onNavigateToHierarchySetup={handleNavigateToHierarchySetup}
            />
          </div>
        ) : page === 'hierarchySetup' ? (
          <div className="content-wrapper" style={{ marginLeft: '225px', width: 'calc(100% - 225px)' }}>
            <ActiveHierarchySetupPage />
          </div>
        ) : page === 'measures' ? (
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
              onBack={() => navigate(`/${workspace}/planning`)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/sales-volume/setup" replace />} />
        <Route path="/:workspace/setup" element={<WorkspaceLayout page="setup" />} />
        <Route path="/:workspace/planning" element={<WorkspaceLayout page="planning" />} />
        <Route path="/:workspace/grid-config" element={<WorkspaceLayout page="gridconfig" />} />
        <Route path="/:workspace/hierarchy-setup" element={<WorkspaceLayout page="hierarchySetup" />} />
        <Route path="/:workspace/measures" element={<WorkspaceLayout page="measures" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
