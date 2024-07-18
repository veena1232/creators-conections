import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Login from './Login';
import Registration from './Registration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';


function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState({ creator: false, business: false });
  
    useEffect(() => {
      // Load authentication state from local storage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user?.username);
        setUserType(user?.userType);
        setIsAuthenticated(true);
      }
    }, []);
  
    const handleSignUpClick = () => {
      setShowModal(true);
      setIsLogin(false);
    };
  
    const handleLoginClick = () => {
      setShowModal(true);
      setIsLogin(true);
    };
  
    const handleClose = () => {
      setShowModal(false);
    };
  
    const handleAuthSuccess = (user) => {
      setUsername(user?.username);
      setUserType(user?.userType);
      setIsAuthenticated(true);
      setShowModal(false);
      // Save authentication state to local storage
      localStorage.setItem('user', JSON.stringify(user));
    };
  
    const handleLogout = () => {
      setUsername('');
      setUserType({ creator: false, business: false });
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    };

  
    return (
      <nav className="navbar">
        <ul className="navbar-list ml-20px">
          <li className="navbar-item">
            <Link to="/">
              <FontAwesomeIcon className='mr-20px' icon={faHandshake} /> Home
            </Link>
          </li>
          <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
          <li className="navbar-item"><Link to="/success-stories">Success Stories</Link></li>
          <li className="navbar-item"><Link to="/contact">Contact</Link></li>
        </ul>
        <ul className="navbar-list">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <FontAwesomeIcon icon={faUser} /> {username}
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <button onClick={handleSignUpClick} className="login-button">Sign Up</button>
            </li>
          )}
        </ul>
        <Modal show={showModal} handleClose={handleClose}>
          {isLogin ? <Login onSuccess={handleAuthSuccess} handleClose={handleClose} /> : <Registration onSuccess={handleAuthSuccess} handleClose={handleClose}/>}
          {isLogin ? (
            <p>New user? <span onClick={() => setIsLogin(false)} className="toggle-link">Register here</span></p>
          ) : (
            <p>Already registered? <span onClick={() => setIsLogin(true)} className="toggle-link">Login here</span></p>
          )}
        </Modal>
      </nav>
    );
  }
  
  export default Navbar;
