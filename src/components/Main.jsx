import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

import Menu from './Menu';
import Nav from './Nav';
import FeatureCarousel from './FeatureCarousel';
import TrendCarousel from './TrendCarousel';
import SocialMedia from './SocialMedia';

function Main() {
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);

  const changePage = (newPage) => {
    setMainPage(false);

    switch (newPage) {
      case 'Retro':
        setRetroPage(true);
        setModernPage(false);
        setFuturePage(false);
        break;
      case 'Modern':
        setRetroPage(false);
        setModernPage(true);
        setFuturePage(false);
        break;
      case 'Future':
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if(retroPage !== null){
      console.log(retroPage);
    }
  }, [retroPage])
  useEffect(() => {
    if(modernPage !== null){
      console.log(modernPage);
    }
  }, [modernPage])
  useEffect(() => {
    if(futurePage !== null){
      console.log(futurePage);
    }
  }, [futurePage])
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
        <Nav sendPage={changePage}></Nav>
        {retroPage ? 
          <div className='content retroPage'>   
            <h2>This is the retro page</h2>
          </div> : ''}
        {modernPage ? 
          <div className='content modernPage'>   
            <h2>This is the modern page</h2>
          </div> : ''}
        {futurePage ? 
          <div className='content futurePage'>   
            <h2>This is the future page</h2>
          </div> : ''}

        {mainPage ? <div>
                     <TrendCarousel></TrendCarousel>
                     <FeatureCarousel></FeatureCarousel>  
                    </div> : ''
        }
    
        <SocialMedia></SocialMedia>      
       </div>

    </div>
  );
}

export default Main;
