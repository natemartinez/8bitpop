import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import SocialMedia from './widgets/SocialMedia';
import '../style.css';
import axios from 'axios';

function Menu({state, onMenuCollapse, onLogout}) {
  const SERVER = import.meta.env.VITE_SERVER;

  const [bookIcon, setBookIcon] = useState(null);
  const [communityIcon, setCommunityIcon] = useState(null);
  const [mainReview, setMainReview] = useState(null);
  const [menuBtn, setMenuBtn] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch menu items
  async function getMenuItems() {
    try {
      const response = await axios.get(SERVER + '/api/gallery');
      const gallery = response.data;
      const newData = gallery.filter(data => data.page === 'menu');
      setMenuBtn(newData[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const collapseMenu = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onMenuCollapse(newCollapsedState);
  }

  const logOut = () => {
    setCurrentUser(null);
    onLogout(); // Call the logout function from Main component
    // Navigate to home page without any state
    navigate('/', { replace: true });
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  useEffect(() => {
    // Update currentUser when state changes (when user logs in/out)
    if (state !== null && state !== undefined) {
      setCurrentUser(state);
    } else {
      setCurrentUser(null);
    }
  }, [state]);

  return (
    <>
      <div className={`menu-bar-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='d-flex'>
          <button id='close-menu' onClick={collapseMenu}>
            {menuBtn !== null ? (
              <img src={menuBtn.link} alt="menu button" />
            ) : ''}
          </button>
          <h4 className={`${isCollapsed ? 'inactive' : ''}`} id='close' >Close</h4>    
        </div>
        <div className='profile'>
          <img className='profile-pic' alt="Profile"></img>
          {!isCollapsed && <h3 className='greeting'>
            {!currentUser ? 'Welcome!' : currentUser.username}
          </h3>}
          <div>
          </div>
        </div>
        <div className={`menu-links ${isCollapsed ? 'hide-links' : ''}`}>
          {!currentUser ? (
            <div className='menu-btns'>
              <Link id='login-btn' to="/login">
                <Button>Log In</Button>
              </Link>
              <Link id='register-btn' to="/new-user">
                <Button>New User</Button>
              </Link>
            </div>
          ) : (
            <div className='menu-btns'>
              <Button id='logout-btn' onClick={logOut}>Log Out</Button>
            </div>
          )}

          <div className='page-links'>
            <div className='link-wrapper d-flex justify-content-center'>
              <Link to="/">Home</Link>
            </div>
            <div className='link-wrapper d-flex justify-content-center'>
              <Link to="/pages/build">Build</Link>
            </div>
            <div className='link-wrapper d-flex justify-content-center'>
              <Link to="/pages/community">Community</Link>
            </div>
            <div className='link-wrapper d-flex justify-content-center'>
              <Link to="/pages/profile">Profile</Link>
            </div>          
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
        <SocialMedia isCollapsed={isCollapsed} />
      </div> 
    </>
  );
}

export default Menu;
