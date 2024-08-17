import { useState, useEffect } from 'react';
import '../styles/style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

import Menu from './Menu';
import Nav from './Nav';
import FeatureCarousel from './FeatureCarousel';
import TrendCarousel from './TrendCarousel';
import SocialMedia from './SocialMedia';

function Main() {
  /*
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  */

  /*
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  */

 
  return (
    <div>
       <Menu></Menu>
       
       <div className='container'>
        <Nav></Nav>
        <TrendCarousel></TrendCarousel>
        <FeatureCarousel></FeatureCarousel>
        
          
        <SocialMedia></SocialMedia>      
       </div>

    </div>
  );
}

export default Main;
