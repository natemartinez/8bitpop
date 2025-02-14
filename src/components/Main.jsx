import { useState, useEffect } from 'react';
import '../style.css';
import { Link, useLocation } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { Button, Accordion } from 'react-bootstrap';
import { Carousel, CarouselItem } from 'react-bootstrap';
import axios from 'axios';

import Menu from './Menu';
import Nav from './NavMain';
import FeaturedMain from './FeaturedMain';
import TrendMain from './TrendMain';
import Modern from './pages/Modern';
import Retro from './pages/Retro';
import Future from './pages/Future';

import SocialMedia from './widgets/SocialMedia';
import Review from './Review';
import ItchFeed from './widgets/ItchFeed'

function Main() {

  const SERVER = import.meta.env.VITE_SERVER;
  
  const location = useLocation();
  const { state } = location;
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('Loading...');

  /*Content for other Pages in Nav */
  const [mainPage, setMainPage] = useState(true);
  const [retroPage, setRetroPage] = useState(false);
  const [modernPage, setModernPage] = useState(false);
  const [futurePage, setFuturePage] = useState(false);
  const [loading, setLoading] = useState(false);

  /* MAIN CONTENT */
  const [spotlight, setSpotlight] = useState(null);
  const [spotlightInfo, setSpotlightInfo] = useState(null);
  const [content, setContent] = useState(null);
  const [gameReleases, setGameReleases] = useState(null);

   /*Game Mechanic Content*/
  const [mechanicBkgrd, setMechanicBkgrd] = useState(null);
  const [mechanics, setMechanics] = useState(null);
  const [factTopic, setFactTopic] = useState(null);
  const [factImage, setFactImage] = useState(null);
  const [fact, setFact] = useState(null);

   /* API Game Jam Content */
  const [featuredJam, setFeaturedJam] = useState(null);
  const [alakajamLogo, setAlakajamLogo] = useState(null);
  const [itchIoLogo, setItchIoLogo] = useState(null);

  function changePage(newPage){
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
        setMainPage(true);
        setRetroPage(false);
        setModernPage(false);
        setFuturePage(false);
        break;
      default:
        break;
    }
    setLoading(false);

  };

  async function fetchMedia(page) {
    try {
      const response = await axios.get(SERVER + '/api/gallery');
      setMedia(response.data, page)
    } catch (error) {
      console.error(error);
    }
  };
  function setMedia(gallery, page){

    const pageContents = gallery.filter(content => content.page === page);
    const pageVideo = gallery.filter(content => content.page === page && content.type == 'video');
    const pageArt = gallery.filter(content => content.page === page && content.type == 'photo');


    if(page == 'main'){
      const mechanicBkgrd = gallery.find(content => content.title === 'gameMechanicBkgrd');
      setMechanicBkgrd(mechanicBkgrd);

      const alakajamLogo = gallery.find(content => content.title === 'alakajam-logo');
      const itchIoLogo = gallery.find(content => content.title === 'itch.io-logo');

      setAlakajamLogo(alakajamLogo);
    }


  };

  //receives all content that belongs in main pages
  async function fetchReleases() {
    try {
      const releaseInfo = await axios.get(SERVER + '/api/releases');
      console.log('Games: ', releaseInfo.data);
      setGameReleases(releaseInfo.data)
    } catch (error) {
      console.error(error)
    }
  };
  async function fetchMechanics() {
    try {
      const releaseInfo = await axios.get(SERVER + '/api/mechanics');
      setMechanics(releaseInfo.data);
      console.log(releaseInfo.data);
    } catch (error) {
      console.error(error)
    }
  };
  async function fetchSpotlight() {
    try {
      const spotlight = await axios.get(SERVER + '/api/spotlight');
      console.log('Spotlight: ', spotlight.data);
      
      setSpotlightInfo(spotlight.data.description);
      setSpotlight(spotlight.data)
    } catch (error) {
      console.error(error)
    }
  };

  async function fetchFacts() {
    try {
      const facts = await axios.get(SERVER + '/api/facts');
      chooseFacts(facts.data);
    } catch (error) {
      console.error(error)
    }
  };
  function chooseFacts(arr){
    if (!Array.isArray(arr) || arr.length === 0) {
     throw new Error("Input must be a non-empty array.");
    }
   const randomIndex = Math.floor(Math.random() * arr.length);

   console.log(arr[randomIndex])
   setFactTopic(arr[randomIndex].topic);
   setFactImage(arr[randomIndex].imageLink);
   setFact(arr[randomIndex].fact);
  };

  async function fetchJams() {
    try {
      const facts = await axios.get(SERVER + '/api/jams');
      sortJams(facts.data);
    } catch (error) {
      console.error(error)
    }
  };
  function sortJams(arr){
    //let jams = arr.find(item => item.status === 'pending');
    // need 'display_date', 'title' & 'url'

    const featuredJam = {
       name: arr.title,
       dates: arr.display_dates,
       link: arr.url
    }
    setFeaturedJam(featuredJam);
  };

  useEffect(() => {
    if(mainPage){
      fetchMedia('main'),
      fetchSpotlight();
      fetchFacts();
      fetchJams();
      fetchReleases();
      fetchMechanics();
    }           

  }, [mainPage])

  useEffect(() => {
    if(state !== null){
      setCurrentUser(state.userData)
    }
  },[state])
 
  return (
    <div>       
       <div className='container'>
        <Menu state={currentUser}></Menu>
        <Nav sendPage={changePage}></Nav>
        
        {loading ? <h1 className='text-center'>{message}</h1> :
        <div className='main-content'>
          {retroPage ? <Retro/> : ''}
          {modernPage ? <Modern/> : ''}
          {futurePage ? <Future/> : ''}
          {mainPage ? <div className='container'>
               <TrendMain/>
               <FeaturedMain/>
               <div className='dyk d-flex justify-content-center mt-5 mb-5 container'>
                        {fact !== null && factTopic !== null && factImage !== null ? 
                        <div className='dyk-box d-flex flex-column'>
                          <h4 className='text-center mb-3'>{factTopic}</h4>
                          <div className='d-flex flex-row'>
                            <div className='col-6'>
                              <img src={factImage} id='fact-image' alt="fact image" />
                            </div>
                            <div className='col-6'>
                               <p id='fact'>{fact}</p> 
                            </div>         
                          </div>  
                        </div> : ''}
               </div> 
               <div className='indie-spotlight-wrapper d-flex mt-4 container'>
                        <h2 className='spotlight-header text-center mb-3'>Indie Game Spotlight</h2>
                        {spotlight !== null ? spotlight.map((game, index) =>
                          <div key={index} className='indie-spotlight d-flex flex-column mt-4'>  
                              <div className=' d-flex justify-content-center featured-indie-cover'>
                                <div className='d-flex flex-column align-items-center'>
                                 <h2 className='m-5'>{game.title}</h2>
                                 <h4><strong>Platforms:</strong></h4> 
                                 <h4>{game.platforms}</h4>                                  
                                </div>
                                <img id='indie-game-cover' src={game.link} alt="game cover" />
                              </div>
                              <div className='d-flex align-items-center flex-column mt-3'>
                                <div className='d-flex row mt-4'>
                                 <h3>Plot:</h3>                                    
                                </div>
                                <div className='row indie-description'>                           
                                  <p>{game.description}</p>
                                </div>
                              </div>
                          </div>): ''}                    
               </div>
               <div className='game-releases-div container'>
                         <h2 className=' text-center mt-5 mb-5'>Upcoming Games</h2>
                         <div>
                          <ul className='game-releases'>
                            {gameReleases !== null ? 
                              gameReleases.map((element, index) =>
                               <li key={index} className='release-titles mt-4 flex-column d-flex'>
                                {element.cover?.url ? 
                                  (<img className='game-releases-cover' src={element.cover.url} alt="game cover" />) : 
                                  (<img className='game-releases-cover' alt="game cover" />)
                                }
                                <p>{element.name}</p>
                               </li>
                              ) : ''}                  
                          </ul>
                         </div>
               </div>
               <ItchFeed />
               <div className='game-tips-wrapper d-flex flex-column align-items-center mt-5 container'>
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
               <div className='mechanic-wrapper container'>
                        <div className='d-flex row mb-4'>
                         <div className='col-2'></div>
                         <div className='col-8'>
                          <div className='mechanic-info'>
                            <div className='mechanic-bkgrd-wrapper'>
                             {mechanicBkgrd !== null ? <img id='mechanic-bkgrd' src={mechanicBkgrd.link} alt=""/> : ''} 
                            </div>
                           <div id='mechanic-text'>
                            <h3> Deep dive into games with the best</h3>
                            <h1>Game Mechanics</h1>
                             <p id='mechanic-desc'>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.<br></br> Consectetur fugit, aliquam ipsam animi officiis amet omnis explicabo<br></br> excepturi nesciunt quidem voluptas suscipit culpa quibusdam,<br></br> esse, perspiciatis magnam? Cupiditate, eligendi accusantium?
                             </p>
                           </div>
                          </div>
                         </div>
                         <div className='col-2'></div> 
                        </div>
                        <div className='d-flex row mt-4'>
                          <div className='col-2'></div>
                          <div className='col-8 accordion-div'>
                           <Accordion defaultActiveKey="0" id="mech-accordion">
                              {mechanics !== null ? mechanics.map((mechanic, index) => (
                               <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{mechanic.name}</Accordion.Header>
                                 <Accordion.Body>
                                   {mechanic.links && mechanic.links.length > 0 ? (
                                     mechanic.links.map((link, linkIndex) => (
                                    
                                      <div key={linkIndex}>
                                        <button className={mechanic.class}>
                                          <img src={link.logoLink} alt="Mechanic icon" />
                                          <a href={link.route}>{link.title}</a>
                                        </button>
                                       
                                      </div>
                                    ))
                                 ) : (
                                     <span>No links available</span>
                                )}
                                 </Accordion.Body>
                                </Accordion.Item>
                              )) : ''}
                            </Accordion>


                          </div> 
                          <div className='col-2'></div>                          
                        </div>
               </div>             
               <div className='game-jams-wrapper mt-5 mb-5 container align-items-center'>
                          <h2 className='text-center mb-5 mt-3'>Upcoming Game Jams</h2>
                          <div className='game-jams-list'>
                            {featuredJam !== null ? 
                              <div>
                                <div className='d-flex flex-row justify-content-center'>
                                  {alakajamLogo !== null ? <img src={alakajamLogo.link} alt="Alakajam Logo" id='alakajam-logo'/> : ''}    
                                  <div id='gamejam-info'>
                                    <h4>{featuredJam.name}</h4>
                                    <p>{featuredJam.dates}</p>
                                    <button className='btn btn-secondary'>
                                      <a href={featuredJam.link} target="_blank" rel="noopener noreferrer">Link to Jam</a>
                                    </button>
                                    
                                  </div> 
                                </div>       
                              </div> : ''}
                          </div>         
               </div>
               <div className='top-ten d-flex align-items-center flex-column mt-4'>
                          <h2 className='mt-5'>Top 10's</h2>
                          <div className='top-ten-modules'>
                            <div>
                              <h4>Top 10 redemption arcs in Gaming</h4> 
                            </div>
                            <div>

                            </div>
                          </div>
                          <div className='top-ten-modules'>
                            <div>
                              <h4>Top 10 Debuts for Game Studios</h4>
                            </div>
                            <div>

                            </div>
                          </div>
                          <div className='top-ten-modules'>
                            <div>
                              <h4>Top 10 redemption arcs in Gaming</h4>  
                            </div>
                            <div>

                            </div>     
                          </div>
               </div>
              </div> : ''}             
        </div> 
       }            
      </div>
        
    </div>
  );
}

export default Main;
