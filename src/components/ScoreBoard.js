import React from "react";

const ScoreBoard = ({ currentScore }) => {
  return (
    <div className="score-board">
      <h4>SCORE:-{currentScore}</h4>
    </div>
  );
};

export default ScoreBoard;
