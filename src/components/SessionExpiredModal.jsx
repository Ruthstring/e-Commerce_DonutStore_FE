import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // Import logout action

const SessionExpiredModal = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    dispatch(logout()); // Log out the user and clear session
    navigate('/login'); // Redirect to the login page
    onClose(); // Close the modal if needed
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

