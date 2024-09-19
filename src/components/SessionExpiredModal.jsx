import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // Import logout action

const SessionExpiredModal = ({ 
  onClose, 
  message = "Your session has expired. Please log in again.",  // Default message
  title = "Session Expired",                                  // Default title
  buttonLabel = "Log In",                                     // Default button label
  redirectPath = "/login",                                    // Default redirect path
  clearSession = true                                         // Whether to clear the session or not
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginRedirect = () => {
    if (clearSession) {
      dispatch(logout()); // Log out the user and clear session if needed
    }
    navigate(redirectPath); // Redirect to the provided path
    onClose(); // Close the modal if needed
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


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../features/auth/authSlice'; // Import logout action

// const SessionExpiredModal = ({ onClose }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLoginRedirect = () => {
//     dispatch(logout()); // Log out the user and clear session
//     navigate('/login'); // Redirect to the login page
//     onClose(); // Close the modal if needed
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h2>Session Expired</h2>
//         <p>Your session has expired. Please log in again.</p>
//         <button onClick={handleLoginRedirect} className="btn btn-primary">Log In</button>
//       </div>
//     </div>
//   );
// };

// export default SessionExpiredModal;

