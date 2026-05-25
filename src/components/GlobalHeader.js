import React from 'react';

const imgSalesforceLogo = "data:image/svg+xml,%3Csvg width='40' height='28' viewBox='0 0 40 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 14c0-3.3 2.7-6 6-6 1.7 0 3.2.7 4.2 1.9.8-.3 1.7-.5 2.6-.5 3.9 0 7 3.1 7 7 0 .3 0 .6-.1.9 2.4.5 4.2 2.6 4.2 5.1 0 2.9-2.4 5.3-5.3 5.3H11.3C7.9 27.7 5 24.8 5 21.3c0-2.9 2-5.4 4.7-6.1C9.3 14.8 9 14.4 9 14c0-.6.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1h-6c-.3 0-.5.2-.5.5s.2.5.5.5h14c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2c-.6 0-1-.4-1-1s.4-1 1-1h2c1.4 0 2.5 1.1 2.5 2.5 0 1.2-.8 2.2-2 2.4.1.5.1 1 .1 1.5 0 4.7-3.8 8.5-8.5 8.5H11.3C6.9 27.7 3 23.8 3 19.3c0-3.7 2.5-6.8 5.9-7.7C8.3 10.4 8 9.2 8 8c0-3.9 3.1-7 7-7 3.1 0 5.7 2 6.6 4.8 1-.5 2.2-.8 3.4-.8 4.4 0 8 3.6 8 8 0 4.4-3.6 8-8 8h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c3.3 0 6-2.7 6-6s-2.7-6-6-6c-1.1 0-2.1.3-3 .8-.4.2-.9.1-1.2-.2C19 5.1 17.1 4 15 4c-2.8 0-5 2.2-5 5 0 1 .3 2 .8 2.8.3.5.2 1.1-.2 1.4-.5.3-1.1.2-1.4-.2-.7-1.1-1.2-2.4-1.2-3.8z' fill='%2300A1E0'/%3E%3C/svg%3E";

const imgDownIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23706e6b' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23706e6b' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgUserAvatar = "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e5e5e5'/%3E%3Ccircle cx='16' cy='13' r='5' fill='%23666'/%3E%3Cpath d='M6 27c0-5.5 4.5-10 10-10s10 4.5 10 10' fill='%23666'/%3E%3C/svg%3E";

const imgNotificationIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 2c-2.2 0-4 1.8-4 4v4l-2 2v1h12v-1l-2-2V6c0-2.2-1.8-4-4-4zM8 16c0 1.1.9 2 2 2s2-.9 2-2' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgHelpIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 14v.5M10 7c-1.1 0-2 .9-2 2h1.5c0-.3.2-.5.5-.5s.5.2.5.5c0 1-1.5 1-1.5 2.5h1.5c0-1 1.5-1 1.5-2.5 0-1.1-.9-2-2-2z' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

export default function GlobalHeader() {
  return (
    <div className="global-header">
      {/* Top Bar */}
      <div className="header-top-bar">
        {/* Left Side - Logo and Setup */}
        <div className="header-left">
          <div className="salesforce-logo">
            <img src={imgSalesforceLogo} alt="Salesforce" />
          </div>
          <h1 className="header-title">Setup</h1>
          
          {/* Tabs */}
          <div className="header-tabs">
            <div className="header-tab header-tab-active">
              <span>Home</span>
              <img src={imgDownIcon} alt="" className="tab-icon" />
            </div>
            <div className="header-tab">
              <div className="tab-placeholder" />
              <img src={imgDownIcon} alt="" className="tab-icon" />
            </div>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="header-right">
          <div className="header-icon-group">
            <div className="icon-placeholder" />
            <img src={imgNotificationIcon} alt="Notifications" className="header-icon" />
            <img src={imgHelpIcon} alt="Help" className="header-icon" />
            <div className="icon-placeholder-small" />
            <div className="icon-placeholder-small" />
            <img src={imgUserAvatar} alt="User" className="header-avatar" />
          </div>
        </div>
      </div>

      {/* Bottom Bar - Search */}
      <div className="header-bottom-bar">
        <div className="global-search">
          <div className="search-dropdown">
            <span>All</span>
            <img src={imgDownIcon} alt="" className="dropdown-icon" />
          </div>
          <div className="search-input-wrapper">
            <img src={imgSearchIcon} alt="Search" className="search-icon-inline" />
            <input 
              type="text" 
              placeholder="Search Salesforce" 
              className="search-input"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
