import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer style={{backgroundColor: 'black'}} className="w-100 mt-auto p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h3 style={{color: 'white'}}>
          Made by members of this community like yourself!
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
