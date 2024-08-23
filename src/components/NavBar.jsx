import React, {useState} from "react";
import Logo from "../assets/donuts_logo.png"


const NavBar = () => {
    // State to track if the mobile menu is open
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Toggle function to change the menu state
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="container mx-auto p-4 ">
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
            </ul>
            <div className="button buy-btn">
              <a href="#buy" className="  text-white py-2 px-4 rounded">
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
                <a href="#buy" className="button block  text-white py-2 px-4 rounded text-center">
                  Buy Now
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default NavBar;

// const NavBar = () => {

//     return (
//         <div className="container flex">
//             <div className="menu-toggle">
//                 <button id="burguer-btn" aria-pressed="true">
//                     <span className="stripes">
//                         <span className="stripe"></span>
//                         <span className="stripe"></span>
//                         <span className="stripe"></span>
//                     </span>
//                 </button>
//             </div>
//             <div className="w-36">HERE GOES THE LOGO</div>
//       <nav className=" flex  justify-between p-5 ml-5 ">
        
//         <div className="menu-container justify-between items-center">
//            <ul className="menu flex space-x-8 mr-8">
//            <li className="menu-item"><a href=""> Menu </a></li>
//            <li className="menu-item" ><a href="#stores"> Stores </a></li>
//            <li className="menu-item"><a href="#featured"> Featured </a></li>
//            <li className="menu-item"><a href="#footer" className="">About</a></li>
//            </ul>
//         </div>
//         <div className="button buy-btn">
//             <a href=""> Buy Now </a> 
//         </div>
        
//       </nav>
//       </div>
//     );
//   };

// export default NavBar;