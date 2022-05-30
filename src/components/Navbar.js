import React from 'react';
import logo from '../assets/Logotype_White_Web.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';
import profilePlaceholder from '../assets/profile-placeholder.jpg';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { displayName, email, photoURL } = currentUser;

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/library">Blindside Library</Link>
        </div>
        <div className="navbar-profile">
          <img src={photoURL ? photoURL : profilePlaceholder} alt="profile" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
