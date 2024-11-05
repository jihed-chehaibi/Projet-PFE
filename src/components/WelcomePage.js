import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './welcome-styles.css';
import Navbar from './NavBar/Navbar';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleRoomSearch = () => {
    navigate('/SearchRoom'); 
  };

  const handleRoommateSearch = () => {
    navigate('/FindRoommate'); 
  };

  return (
    <div>
      <Navbar />
      <div className="background" >
        <div className="welcome-container">
          <h1 className='titre'>Welcome to <span className="buddy-finder">BuddyFinder</span></h1>
          <p className='text'>Looking for the perfect room buddy?</p>
          <p className='text'>Join our community and find your perfect match now through our platform</p>
          <div className="button-row">
            <button className="custom-button1" onClick={handleRoomSearch}>
              <FontAwesomeIcon icon={faHome} size='2x' />
              <span>Looking for A room</span>
            </button>
            <span className="button-separator"></span>
            <button className="custom-button2" onClick={handleRoommateSearch}>
              <FontAwesomeIcon icon={faUsers} size='2x' />
              <span>Seeking room companion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
