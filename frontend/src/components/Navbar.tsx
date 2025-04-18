import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Brand / logo on the left */}
      <Link className="navbar-brand" to="/">
        Entertainment Agency
      </Link>

      {/* Links pushed to the far right */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link${location.pathname === '/' ? ' active-link' : ''}`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link${location.pathname.startsWith('/entertainers') ? ' active-link' : ''}`}
            to="/entertainers"
          >
            Entertainers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
