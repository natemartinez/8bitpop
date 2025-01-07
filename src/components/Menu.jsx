import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Menu() {
  const [bookIcon, setBookIcon] = useState(null);
  const [communityIcon, setCommunityIcon] = useState(null);
  const [mainReview, setMainReview] = useState(null);
  const [menuBtn, setMenuBtn] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Function to fetch menu items
  async function getMenuItems() {
    try {
      const response = await axios.get('http://localhost:3001/api/gallery');
      const gallery = response.data;
      const newData = gallery.filter(data => data.page === 'menu');
      setMenuBtn(newData[0]);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to toggle collapse
  function collapseMenu() {
    setIsCollapsed(prevState => !prevState);
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <>
      <div className={`menu-bar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='profile'>
          <img className='profile-pic' alt="Profile"></img>
          {!isCollapsed && <h3 className='greeting'>Welcome</h3>}
          <div>
            <button id='menu-btn' onClick={collapseMenu}>
              {menuBtn !== null ? (
                <img src={menuBtn.link} alt="menu button" />
              ) : ''}
            </button>
          </div>
        </div>

        <div className={`menu-links ${isCollapsed ? 'hide-links' : ''}`}>
          <Link id='login' to="/login">
            <Button>Log In</Button>
          </Link>
          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/">Home</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/learn">Learn</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/community">Community</Link>
          </div>
          <div className='featured-review-wrapper d-flex justify-content-center'>
            {mainReview !== null ? (
              <div className='featured-review'>
                <h2>{mainReview.title}</h2>
                <h2>Review Grade</h2>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
