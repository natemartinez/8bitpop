import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../style.css';
import axios from 'axios';

function Menu() {

  return (
    <>
      <div className='menu-bar'>
        <div className='profile d-flex flex-column align-items-center'>
           <img className='profile-pic'></img>
           <h3 className='greeting'>Welcome, Big Doofus</h3>
        </div>

        <div className='link-wrapper d-flex justify-content-center' >
          <Link>News</Link>
        </div>
        <div className='link-wrapper d-flex justify-content-center' >
          <Link>Learn</Link>
        </div>
        <div className='link-wrapper d-flex justify-content-center' >
          <Link>Community</Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
