import React from 'react';

const imgEacImage = "data:image/svg+xml,%3Csvg width='439' height='148' viewBox='0 0 439 148' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='439' height='148' rx='8' fill='%23e5e5e5'/%3E%3Crect x='16' y='16' width='407' height='116' fill='%23f3f3f3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='SF Pro Display' font-size='16' fill='%23666'%3EVideo Preview%3C/text%3E%3C/svg%3E";

const imgTourIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 2l2 4 4 .5-3 3 .5 4L8 12l-3.5 1.5L5 9.5 2 6.5l4-.5 2-4z' fill='%230176d3'/%3E%3C/svg%3E";

const imgTrailheadIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6h8M6 2l4 4-4 4' stroke='%230b5cab' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function RightColumn({
  planningName = 'Commercial Planning and Forecasting'
}) {
  return (
    <div className="right-column">
      <div className="right-column-title">
        <p>{planningName}</p>
      </div>

      {/* See How It Works Card */}
      <div className="resource-card">
        <div className="resource-card-content">
          <div className="resource-card-screen">
            <img 
              alt="See How It Works" 
              className="resource-card-image" 
              src={imgEacImage}
            />
            <div className="resource-card-gradient" />
          </div>
          <div className="resource-card-title-section">
            <div className="resource-card-title-with-icon">
              <div className="resource-card-title">
                <p>See How It Works</p>
              </div>
              <div className="resource-card-icon">
                <img alt="" src={imgTourIcon} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
          <p className="resource-card-description">
            Take a look at how you can plan, track, predict, and grow your Manufacturing business with Commercial Planning for Manufacturing
          </p>
        </div>
      </div>

      {/* See the Latest Updates Card */}
      <div className="resource-card">
        <div className="resource-card-content">
          <div className="resource-card-title-section">
            <div className="resource-card-title resource-card-title-black">
              <p>See the Latest Updates</p>
            </div>
          </div>
          <div className="resource-card-features">
            <div className="resource-card-feature-list">
              <div className="resource-card-feature-item">
                <div className="resource-card-feature-title">
                  <p>What's New in {planningName}</p>
                </div>
                <div className="resource-card-feature-description">
                  <p>Stay up-to-date with the latest improvements in {planningName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning on Trailhead Card */}
      <div className="resource-card">
        <div className="resource-card-content">
          <div className="resource-card-title-section">
            <div className="resource-card-title resource-card-title-black">
              <p>Learning on Trailhead</p>
            </div>
          </div>
          <div className="resource-card-links">
            <div className="resource-card-link">
              <div className="resource-card-link-text">
                <p>{planningName} Basics</p>
              </div>
              <div className="resource-card-link-icon">
                <img alt="" src={imgTrailheadIcon} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
