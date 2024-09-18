import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; 
import { clearCart } from '../features/auth/cart/cartSlice';
import { FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Logo from '../assets/donuts_logo.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // Getting the user and authentication state from Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Correctly using logout action here
    dispatch(clearCart()); // Clear the cart after logout
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <div className="w-36 ml-5">
          <Link to="/">
          <img src={Logo} alt="Donuts Logo" className="w-36" /> 
          </Link>
        </div>
      
        {/* Hamburger Menu Button (Visible on small screens) */}
        <div className="md:hidden">
          <button
            id="burger-btn"
            aria-pressed={isMenuOpen}
            onClick={toggleMenu}
            className="focus:outline-none text-gray-800"
          >
            <span className="stripes">
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </span>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 mr-8">
            <li className="menu-item">
              <Link to="/menu" className="text-gray-800 hover:text-gray-400">
                Menu
              </Link>
            </li>
            <li className="menu-item">
              <HashLink smooth to="/#stores" className="text-gray-800 hover:text-gray-400">
                Stores
              </HashLink>
            </li>
            <li className="menu-item">
              <HashLink smooth to="/#featured" className="text-gray-800 hover:text-gray-400">
                Featured
              </HashLink>
            </li>
            <li className="menu-item">
              <Link to="/about" className="text-gray-800 hover:text-gray-400">
                About
              </Link>
            </li>

            {/* Conditional rendering for login/logout */}
            {user ? (
              <li className="menu-item flex items-center space-x-2">
                <span>Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="focus:outline-none text-gray-800 hover:text-red-600"
                  title="Log out"
                >
                  <FaSignOutAlt />
                </button>
              </li>
            ) : (
              <li className="menu-item">
                <Link to="/login" className="text-gray-800 hover:text-gray-400">
                  Login
                </Link>
              </li>
            )}
          </ul>

           {/* Conditionally hide the "Buy Now" button if on the shopping cart page */}
           {location.pathname !== '/cart' && (
            <div className="button buy-btn">
              <Link to="/cart" className="text-white py-2 px-4 rounded">
                Buy Now
              </Link>
            </div>
          )}
        </nav>
      </div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <ul className="text-gray-800">
            <li>
              <Link to="/menu" className="block hover:text-gray-400">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/stores" className="block hover:text-gray-400">
                Stores
              </Link>
            </li>
            <li>
              <Link to="/featured" className="block hover:text-gray-400">
                Featured
              </Link>
            </li>
            <li>
              <Link to="/about" className="block hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block hover:text-gray-400">
                <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>


    );
  };
  
  export default NavBar;
