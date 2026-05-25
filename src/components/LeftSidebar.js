import React from 'react';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='5.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M12 12l4 4' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgChevronRight = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 2l4 4-4 4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgChevronDown = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgSparkIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 1.5l1 2.2 2.2 1-2.2 1-1 2.3-1-2.3-2.2-1 2.2-1 1-2.2z' fill='%230176d3'/%3E%3C/svg%3E";

export default function LeftSidebar({
  currentPage,
  onNavigateToHierarchySetup,
  onNavigateToMeasuresPage,
  onNavigateToPlanningView
}) {
  if (currentPage === 'hierarchySetup') {
    return (
      <div className="left-sidebar hierarchy-setup-sidebar">
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
          <div className="hierarchy-setup-nav-item hierarchy-setup-nav-selected">
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
          <div className="hierarchy-setup-nav-item">
            <span className="hierarchy-setup-nav-indent" />
            <button
              type="button"
              className="side-nav-link-button"
              onClick={onNavigateToPlanningView}
            >
              Plan Configuration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="left-sidebar">
      {/* Search */}
      <div className="sidebar-search">
        <div className="search-field">
          <img src={imgSearchIcon} alt="Search" className="search-icon" />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="nav-item">
        <p>Setup Home</p>
      </div>

      <div className="nav-item nav-item-selected">
        <p>Salesforce Go</p>
      </div>

      <div className="nav-item">
        <p className="nav-section-header">ADMINISTRATION</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Users</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Data</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Email</p>
      </div>

      <div className="nav-item">
        <p className="nav-section-header">PLATFORM TOOLS</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Apps</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Feature Settings</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Slack</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Heroku</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>MuleSoft</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Einstein</p>
      </div>
    </div>
  );
}
