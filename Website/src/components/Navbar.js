import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={isOpen ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
        <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
        <li><Link to="/sentiment-analysis" onClick={toggleMenu}>Sentiment Analysis</Link></li>
        <li><Link to="/papers" onClick={toggleMenu}>Papers</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
