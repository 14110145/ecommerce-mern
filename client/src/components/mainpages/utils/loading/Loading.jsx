import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-page">
      <svg className="loading-circle">
        <circle cx="70" cy="70" r="70"></circle>
      </svg>
    </div>
  );
};

export default Loading;
