import React, {useState} from "react";
import Logo from "../assets/donuts_logo.png"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; //access state to display name of the user if token, dispatch log out action
import { logout } from '../features/auth/authSlice'
import { FaSignOutAlt, FaShoppingCart } from 'react-icons/fa'

const NavBar = () => {
    // State to track if the mobile menu is open
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
     // Get the user from the Redux state
     const user = useSelector((state) => state.auth.user);
     const dispatch = useDispatch();
  
    // Toggle function to change the menu state
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

      // Handle logout
  const handleLogout = () => {
    dispatch(logout()); 
  };

  
    return (
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <div className="w-36 ml-5">
          <img src={Logo} alt="Donuts Logo" className="w-36" />
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

        {/* Desktop Menu (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 mr-8">
            <li className="menu-item">
              <a href="/menu" className="text-gray-800 hover:text-gray-400">
                Menu
              </a>
            </li>
            <li className="menu-item">
              <a href="#stores" className="text-gray-800 hover:text-gray-400">
                Stores
              </a>
            </li>
            <li className="menu-item">
              <a href="/" className="text-gray-800 hover:text-gray-400">
                Featured
              </a>
            </li>
            <li className="menu-item">
              <a href="#footer" className="text-gray-800 hover:text-gray-400">
                About
              </a>
            </li>

            {/* Conditional rendering for the login/logout */}
            {user ? (
              <li className="menu-item flex items-center space-x-2">
                <span>Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="focus:outline-none text-gray-800 hover:text-red-600"
                  title="Log out"
                >
                  <FaSignOutAlt /> {/* Logout icon */}
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

          <div className="button buy-btn">
            <a href="#buy" className="text-white py-2 px-4 rounded">
              Buy Now
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu (Visible only when toggled open on small screens) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <ul className="text-gray-800">
            <li>
              <a href="/menu" className="block hover:text-gray-400">
                Menu
              </a>
            </li>
            <li>
              <a href="#stores" className="block hover:text-gray-400">
                Stores
              </a>
            </li>
            <li>
              <a href="#featured" className="block hover:text-gray-400">
                Featured
              </a>
            </li>
            <li>
              <a href="#footer" className="block hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#buy" className="button block text-white py-2 px-4 rounded text-center">
                Buy Now
              </a>
            </li>
          </ul>
            {/* Link to the Shopping Cart */}
          <div className="flex items-center space-x-2">
            <Link to="/cart" className="text-gray-800 hover:text-gray-400">
              <FaShoppingCart /> 
            </Link>
          </div>

        </div>
      )}
    </div>
      // <div className="container mx-auto p-4 ">
      //   <div className="flex justify-between items-center">
      //     <div className="w-36 ml-5">
      //     <img src={Logo} alt="Donuts Logo" className="w-36" />
      //     </div>
  
      //     {/* Hamburger Menu Button (Visible on small screens) */}
      //     <div className="md:hidden">
      //       <button
      //         id="burger-btn"
      //         aria-pressed={isMenuOpen}
      //         onClick={toggleMenu}
      //         className="focus:outline-none text-gray-800"
      //       >
      //         <span className="stripes">
      //           <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
      //           <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
      //           <span className="block w-6 h-0.5 bg-gray-800"></span>
      //         </span>
      //       </button>
      //     </div>
  
      //     {/* Desktop Menu (Hidden on small screens) */}
      //     <nav className="hidden md:flex items-center space-x-8">
      //       <ul className="flex space-x-8 mr-8">
      //         <li className="menu-item">
      //           <a href="/menu" className="text-gray-800 hover:text-gray-400">
      //             Menu
      //           </a>
      //         </li>
      //         <li className="menu-item">
      //           <a href="#stores" className="text-gray-800 hover:text-gray-400">
      //             Stores
      //           </a>
      //         </li>
      //         <li className="menu-item">
      //           <a href="/" className="text-gray-800 hover:text-gray-400">
      //             Featured
      //           </a>
      //         </li>
      //         <li className="menu-item">
      //           <a href="#footer" className="text-gray-800 hover:text-gray-400">
      //             About
      //           </a>
      //         </li>
      //         { user ? (
      //           <li className="menu-item" > 
      //            Welcome, {user.username} </li>):(
      //             <li className="menu-item" >
      //             <Link to="/login" className="text-gray-800 hover:text-gray-400">
      //               Login
      //             </Link>
      //           </li>
  
      //           )}
              
      //       </ul>
      //       <div className="button buy-btn">
      //         <a href="#buy" className="  text-white py-2 px-4 rounded">
      //           Buy Now
      //         </a>
      //       </div>
      //     </nav>
      //   </div>
  
      //   {/* Mobile Menu (Visible only when toggled open on small screens) */}
      //   {isMenuOpen && (
      //     <div className="md:hidden mt-4 space-y-4">
      //       <ul className="text-gray-800">
      //         <li>
      //           <a href="/menu" className="block hover:text-gray-400">
      //             Menu
      //           </a>
      //         </li>
      //         <li>
      //           <a href="#stores" className="block hover:text-gray-400">
      //             Stores
      //           </a>
      //         </li>
      //         <li>
      //           <a href="#featured" className="block hover:text-gray-400">
      //             Featured
      //           </a>
      //         </li>
      //         <li>
      //           <a href="#footer" className="block hover:text-gray-400">
      //             About
      //           </a>
      //         </li>
      //         <li>
      //           <a href="#buy" className="button block  text-white py-2 px-4 rounded text-center">
      //             Buy Now
      //           </a>
      //         </li>
      //       </ul>
      //     </div>
      //   )}
      // </div>
    );
  };
  
  export default NavBar;
