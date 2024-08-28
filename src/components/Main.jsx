import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import Menu from './Menu';
import Nav from './Nav';
import Featured from './Featured';
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
    console.log(newPage);

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
        console.log('Heading to Main')
        setMainPage(true);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(false);
        break;
      default:
        break;
    }

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
              <div>
                <h2>Retro Game of the Week</h2>
                <div>
                  <h2>Image</h2>
                  <h3>Random Game</h3>
                </div>
                <div>
                  <h2>Similar games list</h2>
                </div>
              </div>

            </div>        
            <div className='retro-feature'>
               <div className='d-flex p-5'>
                 <div className='retro-feature-img border border-primary'>
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
              <h2 className='m-5'>This is the modern page</h2>
              <div>
                <h2>Coolest art styles w/ examples of games using that style</h2>
                <h2>Video that shows behind the scenes content</h2>
                <h2>VR Indie Game Development</h2>
                <h2>Game storytelling elements</h2>
              </div>
            </div> : ''}
          {futurePage ? 
            <div className='content futurePage'>   
              <h2 className='m-5'>This is the future page</h2>
               <div>
                 <h2>Game Dev concept ideas</h2>
               </div>
            </div> : ''}
          {mainPage ? <div>
                       <div className='featured-review-wrapper d-flex justify-content-center'>
                        <div className='featured-review'>
                          <h2>If there's a live stream or re-recording of last game expo
                          or a review of my own
                          </h2>
                        </div>
                         
                       </div>
                       <h1 className='text-center mt-3'>Trending Topics</h1>
                       <Trend></Trend>
                       <h1 className='text-center mt-3'>Featured Topics</h1>
                       <Featured></Featured>  
                       <div>
                        <h2>Indie Game Spotlight</h2>
                       </div>
                       <div>
                        <h2>Game Dev Tips</h2>
                       </div>
                       <div>
                        <h2>Current Game Jams</h2>
                       </div>
                       <div>
                        <h2>Polls, quizzes, personality tests - Similar to myers-briggs, but with games
                        </h2>
                       </div>
                       <div>
                        <h2>Best soundtracks</h2>
                       </div>
                       <div>
                        <h2>MODERN</h2>
                       </div>
                       <div>
                        <h2>RETRO</h2>
                       </div>
                       <div>
                        <h2>FUTURE</h2>
                       </div>
                      </div> : ''}
        </div> 
       }
    
        <SocialMedia></SocialMedia>      
       </div>

    </div>
  );
}

export default Main;
