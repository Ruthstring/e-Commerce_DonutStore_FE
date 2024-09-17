import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link,  useLocation } from 'react-router-dom';

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
      navigate(from);//redirect to the original destination
    }
  }, [token, navigate,from]);

  return (
    <div id="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not a member yet?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register for free
        </Link>
      </p>

    </div>
  );
};

export default Login;