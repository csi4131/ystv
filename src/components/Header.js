import React from 'react';
import './Header.css'; // Import the CSS file for Header component

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">
        <h1 className="logo-text">LGflix</h1>
        </a>
        
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item active">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Browse
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              My List
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
