import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDonut from "../assets/LoginDonut.png"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); 
  const [error, setError] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('User registered:', data);
      setIsRegistered(true); // Set the registration flag to true
      setError(null); // Clear any error messages
    } else {
      setError(data.message); 
      console.error('Error:', data.message);
    }
  };


  return (
    <div className="register-container">
      {/* <div className="donut-container">
        <img
          src={LoginDonut} // Update path to your image
          alt="donut"
          className="donut-image"
        />
      </div> */}
      <div className="register-form">
        <h2 className="lilitafont title">Register</h2>
        {isRegistered ? (
          <div>
            <p>Great! Registration completed.</p>
            <Link to="/login" className="login-text">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
             
              <label htmlFor="password">Password</label>
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
  </div>
              
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="button">
              Register
            </button> 
          </form>
        )}
      </div>
    </div>
  );
  // return (
  //   <div>
  //   <h2>Register</h2>
  //   {isRegistered ? (
  //     // Display success message and link to login if registration is successful
  //     <div>
  //       <p>Great! Registration completed.</p>
  //       <Link to="/login" className="text-blue-500 hover:underline">
  //         Back to Login
  //       </Link>
  //     </div>
  //   ) : (
  //     // Display registration form if the user hasn't registered yet
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Username</label>
  //         <input
  //           type="text"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Email</label>
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Password</label>
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
  //       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if registration fails */}
  //       <button type="submit">Register</button>
  //     </form>
  //   )}
  // </div>
  // );
};

export default Register;