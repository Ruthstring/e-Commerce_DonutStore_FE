import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white  p-10 flex flex-col md:flex-row text-left">
      {/* First Section */}
      <div className="flex-1 mb-8 md:mb-0">
        <h1 className="footer-title mt-7 text-3xl md:text-5xl md:ml-10 lilitafont">What's next?</h1>
      </div>

      {/* Second Section */}
      <div className="flex-1 mb-8 md:mb-0">
        <h1 className='font-bold text-lg' >About me</h1>
        <p className="mt-2">This App was built at the beginning<br /> of my Web Dev journey.</p>
        <p>Working with passion. Learning fast.</p>
        <p className="mt-12 mb-4">&copy; 2024 My Website. All rights reserved.</p>
      </div>

      {/* Third Section */}
      <div className="flex-1">
        <h1 className='font-bold text-lg'>Contact</h1>
        <p>Do you want to know more?</p>
        <div className="flex space-x-4 mt-6 mb-8">
          <a 
            href="https://www.linkedin.com/in/ruth-cu%C3%A9llar/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition transform hover:scale-125"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-white" />
          </a>
          <a 
            href="https://github.com/Ruthstring" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition transform hover:scale-125"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl text-white" />
          </a>
        </div>
      </div>
    </footer>
  );

};

export default Footer;
