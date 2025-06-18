import { useState, useEffect } from "react";
import axios from 'axios';
import Carousel from "react-multi-carousel";
import {Button} from "react-bootstrap";
import { connect } from "react-redux";

const Retro = () => {
    const SERVER = import.meta.env.VITE_SERVER;
    const accessToken = import.meta.env.IGDB_TOKEN;
    const accessID = import.meta.env.IGDB_ID;

    const [loading, setLoading] = useState(true);

    const [retroGOTW, setRetroGOTW] = useState(null);
    const [retroPosts, setRetroPosts] = useState([]);
    const [archiveContent, setArchiveContent] = useState(null);

    const [similarGames, setSimilarGames] = useState([]);

    async function fetchContent(){
      try {
        const response = await axios.get(SERVER + '/api/content');
        const retroContent = response.data.filter(obj => obj.page == 'retro');
        sortContent(retroContent);
      } catch (error) {
        console.error(error)
      }
    };
    function sortContent(content){
      let posts = [];

      for(let i=0; i < content.length; i++){
        if(content[i].priority == 'high'){
           setRetroGOTW(content[i]);
        } else if(content[i].priority == 'medium'){
          posts.push(content[i]);
        } else{
          // archives
        }
      }
      setRetroPosts(posts);
    };
    async function fetchGameData(){
      try {
         const serverData = await axios.get(SERVER + '/api/gameData');
         const gameArray = serverData.data.similarGames;
         setSimilarGames(gameArray);
         setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
 
    useEffect(() => {
      fetchContent();
      fetchGameData();
    }, [])

   /* SIMILAR GAMES: 
     - I want to make each similar game into a carousel
     - I want to make either the loading time is faster or 
     make a 'loading screen'
     - I want the similar games to stay the same once they're loaded in for the first time
   */

  return (
    <div className="container d-flex justify-content-center" >
        <div className='content retroPage'> 
             <div className='d-flex mt-4 mb-4 '>
             {retroGOTW !== null ?    
              <div className='d-flex flex-column align-items-center'>
                <div className='mb-3 mt-3'>
                    <h1 className="fw-bold">Retro Game of the Week</h1>
                </div>  
                <div className='d-flex retro-gotw justify-content-center container mt-3'>
                  <div className='col-lg-5'>
                    <img className='retro-gotw-img' src={retroGOTW.coverLink} alt={retroGOTW.title} />
                  </div>
                  <div className='era-main col-lg-3 '>
                    <h3 className='text-center'>A look back at:</h3>
                    <p className='retro-gotw-title text-center'>{retroGOTW.title}</p>
                  </div>
                </div>  
    
               {loading !== true ? 
                 <div className="mt-4 similar-games-list">
                   <h2 className="mb-3 text-center">Similar games like <span className="fw-bold">{retroGOTW.title}</span></h2>
                   {similarGames !== null ? similarGames.map((game, index) =>
                     <h4><li key={index}>{game}</li></h4>) : ''
                   }           
                 </div> : <div><h1>Loading...</h1></div>
                } 
              </div> : '' } 
             </div>     
             <h1 className='mt-5 mb-3 fw-bold'>Featured Posts</h1>
             {retroPosts !== null ? retroPosts.map((post, index) =>  
                <div className='retro-feature mb-5 d-flex justify-content-center' key={index}>
                  <div className='d-flex era-posts p-5'>
                    <div className='retro-feature-div'>
                      <img className='retro-feature-img' src={post.coverLink} alt="" />
                    </div>                 
                   <div className='p-3'>
                    <h2>{post.title}</h2>
                    <p>This is just an example of the mini description for the article.</p>
                    <p>The description should be intriging.</p>
                    <Button value='Read More'>Read More</Button>
                   </div>     
                </div>
               <div></div>
                </div>) :  ''}
        </div>
    </div>
  );
};

export default Retro;
