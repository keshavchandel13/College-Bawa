import React from "react";
import "../../styles/gloabalComponent/LoadingSpinner.css"; // Styling file

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
