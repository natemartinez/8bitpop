import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button, Accordion } from 'react-bootstrap';
import { Carousel, CarouselItem } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import Menu from './Menu';
import Nav from './NavMain';
import FeaturedMain from './FeaturedMain';
import TrendMain from './TrendMain';
import SocialMedia from './SocialMedia';
import Review from './Review';
import Calendar from './Calendar';

function Main() {
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spotlight, setSpotlight] = useState(null);
  const [content, setContent] = useState(null);
  const [chestImg, setChestImg] = useState(null);

  const [gameReleases, setGameReleases] = useState(null)

 // const location = useLocation();

 // const userData = location.state?.userData;

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

  async function fetchImgs() {
    try {
      const response = await axios.get('http://localhost:3001/api/gallery');
      setImages(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  //receives all content that belongs in main pages
  async function fetchContent(page) {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/content');
      getPageContent(response.data, page);
      fetchReleases();
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchReleases() {
    try {
      const releaseInfo = await axios.get('http://localhost:3001/api/releases');
      console.log('Games: ', releaseInfo.data);
      setGameReleases(releaseInfo.data)
    } catch (error) {
      console.error(error)
    }
  };

  //receives content to then divide them
  const getPageContent = (content, page) => {

    let curContent = [];
    let spotlightContent = [];

     for(let i = 0; i < content.length; i++){
       if(content[i].page == page){
         if(content[i].class == 'spotlight'){
           spotlightContent.push(content[i]);
         }else{
           curContent.push(content[i]);
         } 
       }   
     };
    
     setContent(curContent);
     setSpotlight(spotlightContent);
     setLoading(false);
  };
  const setImages = (gallery) => {
   const chest = gallery.find(image => image.title === 'chest');

   setChestImg(chest.link);

  };


  useEffect(() => {
    fetchImgs();
  }, []);
  useEffect(() => {
    if(mainPage){
      setTimeout(() => fetchContent('main'), [500]);
    };
  }, [mainPage])
  useEffect(() => {
    if(retroPage){
      setTimeout(() => fetchContent('retro'), [500]);
    };
  }, [retroPage])
  useEffect(() => {
    if(modernPage){
      setTimeout(() => 
        fetchContent('modern'),
      [500]);
    };
  }, [modernPage])
  useEffect(() => {
    if(futurePage){
      setTimeout(() => fetchContent('future'), [500]);
    };
  }, [futurePage])



  // Make each retro, modern, and future page needs to be components
 
  return (
    <div>
       <Menu></Menu>
       <div>
        <Nav sendPage={changePage}></Nav>
        {loading ? <h1 className='text-center mt-5'>Loading...</h1> :
        <div className='main-content'>
          {retroPage ? 
            <div className='content retroPage'> 
             <div className='d-flex flex-column mt-4 mb-4'>
              <h2>This is the retro page</h2>
              <div>
                  <div>
                    <h3>Retro Game of the Week</h3>
                  </div>                
                <div className='era-main d-flex'>
                  <div>
                   <h2>Image</h2>
                   <h3>Random Game</h3>
                  </div>
                  <div>
                    <h2>Make a mini-article intro</h2>
                    <p>Should be a headline and description of about 3-4 sentences</p>
                  </div>
                </div>        

                <div>
                  <h2>Similar games list</h2>
                </div>
              </div>

             </div>        
             <div className='retro-feature mb-5'>
               <div className='d-flex era-posts p-5'>
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
             <div className='retro-feature'>
               <div className='d-flex era-posts p-5'>
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
              <div className='d-flex flex-column align-items-center'>
                <div className='era-main d-flex justify-content-center'>
                 {content ? content.map((post, index) =>
                   <div key={index} className='post-blocks'>
                     <h2>{post.title}</h2>
                   </div>
                 ): ''}                  
                </div>

                <div className='d-flex mt-3 mb-3 era-posts'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                  <h2>Coolest art styles w/ examples of games using that style</h2>
                </div>
                <div className='d-flex mt-3 mb-3 era-posts'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                  <h2>Video that shows behind the scenes content</h2>
                </div>
                <div className='d-flex mt-3 mb-3 era-posts'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                  <h2>VR Indie Game Development</h2>
                </div>
                <div className='d-flex mt-3 mb-3 era-posts'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                  <h2>Game storytelling elements</h2>
                </div>   
              </div>
            </div> : ''}
          {futurePage ? 
            <div className='content futurePage'>   

              <div className='d-flex flex-column align-items-center'>
               <h2 className='m-5'>This is the future page</h2>                
               <div className='era-main'>
                  <div>
                    <h2>Image Placement</h2>
                  </div>
                 <h2>Game Dev concept ideas</h2>
               </div>                
              </div>

            </div> : ''}
          {mainPage ? <div>
                       <TrendMain></TrendMain>
                       <FeaturedMain></FeaturedMain> 
                       <div className='dyk d-flex justify-content-center mt-5 mb-5'>
                        <div className='dyk-box d-flex flex-column'>
                          <h4>Did You Know?</h4>
                          <div className='d-flex flex-row'>
                           <h3>Image</h3>
                           <h3>Did you know</h3>  
                          </div>  
                        </div>
       
                       </div> 
                       <div className='indie-spotlight-wrapper d-flex'>

                        <h2 className='spotlight-header text-center'>Indie Game Spotlight</h2>
                        {spotlight !== null ? spotlight.map((post, index) =>
                          <div key={index} className='indie-spotlight d-flex'>  
                            <div className='featured-indie-game'>
                              <h3 className='m-3'>{post.title}</h3>
                              <img id='indie-game-cover' src={post.coverLink} alt="game cover" />
                            </div>
                            <div>
                              <p>Publisher/Developers: <strong>Mojang</strong></p>
                              <button>Buy on itch.io</button>
                              <button>Buy on Google Play</button>                              
                            </div>
                          </div>): ''}                    
                       </div>
                       <div className='game-releases d-flex flex-column align-items-center'>
                         <h2 className='mt-5 mb-5'>Upcoming Games</h2>
                         <div className='game-releases-list d-flex '>
                          <ul>
                            {gameReleases !== null ? 
                              gameReleases.map((element, index) =>
                               <li key={index} className='release-titles'>
                                 <p>{element.name}</p>
                               </li>
                              ): ''}                  
                          </ul>
                         </div>
                       </div>
                       <div className='game-tips-wrapper d-flex flex-column align-items-center mt-5 mb-5'>
                         <h2 className='text-center mb-5'>Game Dev Tips</h2>
                         <Carousel interval={null} className=''>
                            <CarouselItem>
                              <div className='game-tip'>
                                <div className='game-tip-bkgrd'>
                                  <img src="https://cdn.sanity.io/images/m5zbytnr/production/06c866cd77a4c99192874971889e9faff270a6f2-1920x1080.png" alt="" />
                                </div>
                                
                                <div id='tip-title'>
                                  <Link to='/devtips/phaser-intro' className='tip-title-link'><h2>Intro to Phaser</h2></Link>
                                  <Button className='btn-warning'>Beginner</Button>
                                </div>
                                
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className='game-tip'>
                                <div className='game-tip-bkgrd'>
                                  <img src="https://cdn.sanity.io/images/m5zbytnr/production/06c866cd77a4c99192874971889e9faff270a6f2-1920x1080.png" alt="" />
                                </div>
                                
                                <div id='tip-title'>
                                  <Link to='/devtips/phaser-intro' className='tip-title-link'><h2>Tools to use when making your game art</h2></Link>
                                  <Button className='btn-warning'>Beginner</Button>
                                </div>
                                
                              </div>
                            </CarouselItem>
                         </Carousel>
                       </div>
                       <div className='mechanic-wrapper d-flex flex-column align-items-center mt-5 p-5'>
                         <h2 className='text-center mb-5'>Deep dive into Game Mechanics</h2>
                        
                         <Accordion defaultActiveKey="0" alwaysOpen className='mech-accordion'>
                          <Accordion.Item eventKey="0">
                           <Accordion.Header>Accordion Item #1</Accordion.Header>
                           <Accordion.Body>
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                             aliquip ex ea commodo consequat. Duis aute irure dolor in
                             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                             culpa qui officia deserunt mollit anim id est laborum.
                           </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                           <Accordion.Header>Accordion Item #2</Accordion.Header>
                           <Accordion.Body>
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                             aliquip ex ea commodo consequat. Duis aute irure dolor in
                             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                             culpa qui officia deserunt mollit anim id est laborum.
                           </Accordion.Body>
                          </Accordion.Item>
                         </Accordion>
                                      
                       </div>             
                       <div className='game-jams-wrapper mt-5 mb-5'>
                        <div>
                          <h2 className='text-center mb-5'>Upcoming Game Jams</h2>
                          <div className='d-flex'>
                            <Calendar></Calendar>
                            <div className='game-jams-list'>
                              <ul>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                                <li>
                                  <p className='jam-names'>Game Jam 1</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                        </div>     
                       </div>
                       <div className='mod-news-wrapper mt-5 mb-5'>
                        <div className='mod-news-div mb-4 align-items-center'>
                         <h2 className='text-center mb-5'>Oh My Mod! - Modding News</h2>
                         <Carousel interval={null}>
                            <CarouselItem>
                              <div className='mod-news'>
                                <div>
                                  <h4>Image</h4>
                                </div>
                                <h2>Super Smash Bros. Mod</h2>
                              </div>
                            </CarouselItem>
                            <CarouselItem>
                              <div className='mod-news'>
                                <div>
                                  <h4>Image</h4>
                                </div>
                                <h2>Kingdom Hearts Mod</h2>
                              </div>
                            </CarouselItem>
                         </Carousel>                          
                        </div>
                       </div>
                       <div className='top-ten d-flex align-items-center flex-column mt-4'>
                          <h2 className='mt-5'>Top 10's</h2>
                          <div className='top-ten-modules'>Top 10 redemption arcs in Gaming</div>
                          <div className='top-ten-modules'>Top 10 Debuts for Game Studios</div>
                          <div className='top-ten-modules'>Top 10 redemption arcs in Gaming</div>
                       </div>
                      </div> : ''}

         <SocialMedia></SocialMedia>    
                  
        </div> 
       }            
       </div>
        
    </div>
  );
}

export default Main;
