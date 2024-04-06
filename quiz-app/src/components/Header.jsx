import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import usericon from '../images/user-regular.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faQ } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Header() {
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const isEnableLogin = storedUser?.name ? true : false;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [isOpen, setIsOpen] = useState(false);
  // console.log('updatedUser',storedUser._id);


  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = () => {
    const updatedUser = JSON.parse(sessionStorage.getItem('user'));
    setIsLoggedIn(!!updatedUser);
  };

  const handleUserClick = () => {
    navigate('/user');
  };

  const handleLoginRegisterClick = () => {
    navigate('/register');
  };
  const backToHome = () => {
    navigate('/');
  };

  const renderLoginRegisterLink = () => {
    if (isLoggedIn) {
      return null; // Hide the link if the user is logged in
    } else {
      return (
        <li>
          <button className='btn btn-outline-success text-light border border-5' onClick={handleLoginRegisterClick}>
            <a>Login/Register</a>
          </button>
        </li>
      );
    }
  };

  const handleQuizLink = () => {
    if (isLoggedIn) {
      navigate('/main');
    } else {
      alert("Login First");
    }
  };

  const logout = () => {
    sessionStorage.clear(); 
    localStorage.setItem('logout', Date.now()); // Notify other tabs
    alert("Logout Successfully");
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="quiz-header">
      <span className="logout-message"></span>
      <div className="container-header">
        <h5 className="logo" onClick={backToHome} ><FontAwesomeIcon icon={faQ} />uizify</h5>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li className='li' onClick={handleQuizLink}>Quiz</li>
            <li><a href="/contact">Contact</a></li>
            <li></li>

            {isEnableLogin ? <li><button className='btn btn-outline-success text-light' onClick={handleUserClick}>{storedUser.name}
              <FontAwesomeIcon className='ml-2' icon={faUser} /> </button>
            </li> : null}
            {!isEnableLogin ? renderLoginRegisterLink() : null}
            {isEnableLogin ? <li><button className='logout-btn btn btn-outline-success text-light' onClick={logout}>Logout<FontAwesomeIcon className='ml-2' icon={faRightFromBracket} /></button></li>
              : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
