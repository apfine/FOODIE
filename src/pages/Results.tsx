import React from "react";
import { useLocation } from "react-router-dom";

const Results: React.FC = () => {
  const location = useLocation();
  const resultImage = location.state?.resultImage;

  return (
    <div className="results-container">
      <h1>Results</h1>
      {resultImage ? (
        <img src={resultImage} alt="Prediction Result" className="result-image" />
      ) : (
        <p>No result to show!</p>
      )}
    </div>
  );
};

export default Results;
