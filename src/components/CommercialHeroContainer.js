import React from 'react';

const imgProgressRing = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23e5e5e5' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='10' stroke='%230176d3' stroke-width='2' stroke-dasharray='15.7 47.1' transform='rotate(-90 12 12)'/%3E%3C/svg%3E";

const imgManufacturingIcon = "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='36' height='36' rx='8' fill='%23e5e5e5'/%3E%3Cpath d='M18 8v20M8 18h20' stroke='%23666' stroke-width='2'/%3E%3C/svg%3E";

const imgRefreshIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 8c0 3-2.5 5.5-5.5 5.5S2.5 11 2.5 8s2.5-5.5 5.5-5.5c1.5 0 2.8.6 3.8 1.5' stroke='%230176d3' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M13.5 4v4h-4' stroke='%230176d3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgDownIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

function FaveMenu() {
  return (
    <div className="fave-menu">
      <div className="fave-menu-container">
        <div className="fave-menu-icon">
          <img alt="" src={imgDownIcon} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

function Manufacturing() {
  return (
    <div className="manufacturing-icon">
      <img alt="Manufacturing" src={imgManufacturingIcon} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default function HeroContainer({
  title = 'Commercial Planning for Manufacturing',
  description = 'Configure forecasts, dimensions, and workflows for manufacturing commercial plans.'
}) {
  return (
    <div className="hero-container">
      <div className="hero-top-bar" />
      <div className="hero-content">
        <div className="breadcrumb">
          <p className="breadcrumb-text">Salesforce Go &gt;</p>
          <div className="breadcrumb-current">
            <p>{title}</p>
          </div>
        </div>
        <div className="icon-title-actions">
          <div className="icon-title">
            <Manufacturing />
            <div className="title-text">
              <p>{title}</p>
            </div>
          </div>
          <FaveMenu />
        </div>
        <div className="description-text">
          <p>{description}</p>
        </div>
        <div className="progress-refresh">
          <div className="progress-section">
            <div className="progress-ring">
              <img alt="" src={imgProgressRing} style={{ width: '100%', height: '100%' }} />
            </div>
            <p className="progress-text">
              <span className="progress-text-bold">3 of 6 </span>
              <span className="progress-text-light"> Steps Completed</span>
            </p>
          </div>
          <div className="refresh-button">
            <img alt="" src={imgRefreshIcon} className="icon-small" />
            <p className="refresh-button-text">Refresh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
