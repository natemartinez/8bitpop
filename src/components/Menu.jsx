import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Menu() {
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
      const response = await axios.get('http://localhost:3001/api/gallery');
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
    <Button onClick={() => logOut()}>Log Out</Button>
   )
  };



  useEffect(() => {
    getMenuItems();
    // Check if user data is stored in localStorage, if it doesn't exist, set currentUser to null
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null); 
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
        <div className='profile'>
          <img className='profile-pic' alt="Profile"></img>
          {!isCollapsed && <h3 className='greeting'>
            {!currentUser ? 'Welcome!' : currentUser.username}
          </h3>}
          <div>
            <button id='menu-btn' onClick={collapseMenu}>
              {menuBtn !== null ? (
                <img src={menuBtn.link} alt="menu button" />
              ) : ''}
            </button>
          </div>
        </div>

        <div className={`menu-links ${isCollapsed ? 'hide-links' : ''}`}>
          {!currentUser ? (
            <div>
             <Link id='login' to="/login">
               <Button>Log In</Button>
             </Link>
             <Link id='login' to="/new-user">
               <Button>New User</Button>
             </Link>
            </div>
          ) : <LogOutButton />}

          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/">Home</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/pages/learn">Learn</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center'>
            <Link to="/pages/community">Community</Link>
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
