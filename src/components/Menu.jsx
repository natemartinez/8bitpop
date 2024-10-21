import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Menu() {
  const [bookIcon, setBookIcon] = useState(null);
  const [communityIcon, setCommunityIcon] = useState(null);
   

  return (
    <>
     <div className='menu-bar-wrapper'>
      <div className='menu-bar'>
        <div className='profile'>
           <img className='profile-pic'></img>
           <h3 className='greeting'></h3>
        </div>

        <div className='menu-links'>
          <Link id='login' to="/login"><Button>Log In</Button></Link>
          <div className='link-wrapper d-flex justify-content-center' >
           <Link>Home</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center' >         
           <Link>Learn</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center' >
           <Link>Community</Link>
          </div>
          <div className='ad-space-wrapper'>
            <div className='ad-space'>
              <h2>Ad Space</h2>
            </div>            
          </div>

        </div>
        
      </div>
     </div>
    </>
  );
}

export default Menu;
