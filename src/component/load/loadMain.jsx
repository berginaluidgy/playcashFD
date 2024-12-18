import React from "react";
import "./loadMain.css"; // Importation du fichier CSS

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Patienter SVP</p>
    </div>
  );
};

export default Loader;
