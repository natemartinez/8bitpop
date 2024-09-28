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
      <div className='menu-bar'>
        <div className='profile '>
           <img className='profile-pic'></img>
           <h3 className='greeting'>Welcome, Big Doofus</h3>
        </div>

        <div className='menu-links'>
          <div className='link-wrapper d-flex justify-content-center' >
           <Link>Home</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center' >
            
           <Link>Learn</Link>
          </div>
          <div className='link-wrapper d-flex justify-content-center' >
           <Link>Community</Link>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Menu;
