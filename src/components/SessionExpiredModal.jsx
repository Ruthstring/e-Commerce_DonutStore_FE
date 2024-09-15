import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirects to login page
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button onClick={handleLoginRedirect} className="btn btn-primary">Log In</button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;