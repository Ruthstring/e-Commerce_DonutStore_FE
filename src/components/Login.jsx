import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LoginDonut from "../assets/LoginDonut.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the location user came from, default to homepage if none
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      // Redirect to home page if login is successful
      navigate(from);
    }
  }, [token, navigate, from]);

  return (
    <div className="login-container md:mt-10">
      <div className="donut-container hidden md:block">
        <img
          src={LoginDonut} // Update path to your image
          alt="donut"
          className="donut-image"
        />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="button btn-login"> 
            Login
          </button>
        </form>
        <p className="register-link mt-5">
          Not a member yet?{' '}
          <Link to="/register" className="login-text ">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../features/auth/authSlice';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate, Link,  useLocation } from 'react-router-dom';
// import LoginDonut from "../assets/LoginDonut.png"

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
//   const { token, user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get the location user came from, default to homepage if none
//   const from = location.state?.from || '/';

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   useEffect(() => {
//     if (token) {
//       // Redirect to home page if login is successful
//       navigate(from);//redirect to the original destination
//     }
//   }, [token, navigate,from]);

//   return (
//     <div className="login-container md:mt-20">
      
//       <div className="donut-container hidden md:block">
//         <img
//           src={LoginDonut} // Update path to your image
//           alt="donut"
//           className="donut-image"
//         />
//       </div>
//       <div className="login-form">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//           {loading && <p>Loading...</p>}
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <button type="submit" className=" button">
//             Login
//           </button>
//         </form>
//         <p className="register-link mt-5">
//           Not a member yet?{' '}
//           <Link to="/register" className="login-text ">
//             Register for free
//           </Link>
//         </p>
//       </div>
//     </div>
//   );



  // return (
  //   <div className="login-container">
  //     <div className="donut-container">
  //       <img
  //         src={LoginDonut} // make sure to place your image in this path
  //         alt="donut"
  //         className="donut-image"
  //       />
  //     </div>
  //     <div className="login-form">
  //       <h2>Sign Up</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div className="input-group">
  //           <label htmlFor="email">Email</label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div className="input-group">
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type={showPassword ? 'text' : 'password'}
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //           <button
  //             type="button"
  //             className="password-toggle"
  //             onClick={() => setShowPassword((prev) => !prev)}
  //           >
  //             {showPassword ? <FaEyeSlash /> : <FaEye />}
  //           </button>
  //         </div>
  //         {loading && <p>Loading...</p>}
  //         {error && <p style={{ color: 'red' }}>{error}</p>}
  //         <div className="input-group">
  //           <input type="checkbox" required /> I read and agree to{' '}
  //           <a href="#">Terms & Conditions</a>
  //         </div>
  //         <button type="submit" className="submit-btn">
  //           Create Account
  //         </button>
  //       </form>
  //       <p className="login-link">
  //         Already have an account?{' '}
  //         <Link to="/login" className="login-text">
  //           Sign In
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );
