import React from 'react';
import './Loader.css'; 

interface LoaderProps {
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullPage = true }) => {
  return (
    <div className={fullPage ? "loader-container" : "loader-small"}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
