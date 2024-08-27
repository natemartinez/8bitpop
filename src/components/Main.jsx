import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import Menu from './Menu';
import Nav from './Nav';
import FeatureCarousel from './FeatureCarousel';
import Trend from './Trend';
import SocialMedia from './SocialMedia';

function Main() {
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePage = (newPage) => {
    
    setLoading(true);

    switch (newPage) {
      case 'Retro':
        setMainPage(false);
        setRetroPage(true);
        setModernPage(false);
        setFuturePage(false);
        break;
      case 'Modern':
        setMainPage(false);
        setRetroPage(false);
        setModernPage(true);
        setFuturePage(false);
        break;
      case 'Future':
        setMainPage(false);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(true);
        break;
      case 'Main':
        setMainPage(true);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(false);
        break;
      default:
        break;
    }
    loadContent()

  };



  useEffect(() => {
    if(mainPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [mainPage])
  useEffect(() => {
    if(retroPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [retroPage])
  useEffect(() => {
    if(modernPage){
      setTimeout(() => setLoading(false), [1000]);
    };
  }, [modernPage])
  useEffect(() => {
    if(futurePage){
      setTimeout(() => setLoading(false), [1000]);
    };
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
        {loading ? <h2>Loading...</h2> :
        <div className='main-content'>
          {retroPage ? 
            <div className='content retroPage'> 
            <div className='mt-4 mb-4'>
              <h2>This is the retro page</h2>
            </div>  
              
            <div className='retro-feat'>
               <div className='d-flex p-5'>
                 <div className='retro-feat-img border border-primary'>
                  <h3>Image</h3>
                 </div>
                 
                 <div>
                  <h2>Title</h2>
                  <p>This is just an example of the mini description for the article.</p>
                  <p>The description should be intriging.</p>
                  <Button value='Read More'>Read More</Button>
                 </div>
                 
               </div>
               <div></div>
            </div>
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
                       <h1 className='text-center mt-3'>Trending Topics</h1>
                       <Trend></Trend>
                       <h1 className='text-center mt-3'>Featured Topics</h1>
                       <FeatureCarousel></FeatureCarousel>  
                      </div> : ''
          }
        </div> 
       }
    
        <SocialMedia></SocialMedia>      
       </div>

    </div>
  );
}

export default Main;
