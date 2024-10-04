import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; 

const SessionExpiredModal = ({ 
  onClose, 
  message = "Your session has expired. Please log in again.",  
  title = "Session Expired",                                 
  buttonLabel = "Log In",                                    
  redirectPath = "/login",                                    
  clearSession = true                                         
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    if (clearSession) {
      dispatch(logout()); 
    }
    navigate(redirectPath); 
    onClose(); 
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="text-orange-700">{title}</h2>
        <p>{message}</p>
        <button onClick={handleLoginRedirect} className="button mt-5">{buttonLabel}</button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
