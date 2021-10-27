import React from "react";
import ScoreBoard from "./ScoreBoard";

const Footer = ({ currentScore }) => {
  return (
    <footer className="footer">
      <p>Made with 😍 by Eswar Krishna Maganti. </p>
      <ScoreBoard currentScore={currentScore} />
    </footer>
  );
};

export default Footer;
