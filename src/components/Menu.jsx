import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import SocialMedia from './widgets/SocialMedia';
import '../style.css';
import axios from 'axios';

function Menu() {

  const SERVER = import.meta.env.VITE_SERVER;

  const [bookIcon, setBookIcon] = useState(null);
  const [communityIcon, setCommunityIcon] = useState(null);
  const [mainReview, setMainReview] = useState(null);
  const [menuBtn, setMenuBtn] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const { state } = location;
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

  const collapseMenu = () =>{
    setIsCollapsed(prevState => !prevState);
  }
  const LogOutButton = () => {
      // controls state to reload page when user logs out
    const navigate = useNavigate();
    
    const logOut = () => {
      localStorage.removeItem('userData');
      setCurrentUser(null);
      navigate('/');
    }
    
    return (
     <Button id='logout-btn' onClick={() => logOut()}>Log Out</Button>
    )
  };

  useEffect(() => {
    getMenuItems();
    // Check if user data is stored in localStorage, if it doesn't exist, set currentUser to null
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing UserData', error)
      }
      
    } else {
      setCurrentUser(null);
      console.log('No user data') 
    }
  }, []);

  useEffect(() => {
   if (state) {
      setCurrentUser(state.userData);
      localStorage.setItem('userData', JSON.stringify(state.userData));
      console.log(localStorage.getItem('userData'));
    }
  },[state]);

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
          ) : <LogOutButton />}

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
        <SocialMedia/>
      </div> 
    </>
  );
}

export default Menu;
