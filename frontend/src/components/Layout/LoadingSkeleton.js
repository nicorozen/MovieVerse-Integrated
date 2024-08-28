import React from 'react';

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="loading-box">
        <div className="loading-content">
        </div>

        <div className="loading-bar"></div>
        <div className="loading-line"></div>
        <div className="loading-line"></div>
        <div className="loading-line"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
