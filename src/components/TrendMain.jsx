import { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function TrendMain(){
    const SERVER = import.meta.env.VITE_SERVER;
    const [posts, setPosts] = useState(null);
    const [mainPost, setMainPost] = useState(null);
    const [newsList, setNewsList] = useState(null);

    async function getTrends() {
      try {
        const response = await axios.get(SERVER + '/api/content');
        organizePosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function organizePosts(posts) {
      let mainPosts = posts.filter(post => post.page == 'main');
      let trendPost = mainPosts.find(post => post.priority == 'high'); 
      let newsList = mainPosts.filter(post => post.priority == 'medium'); 

      setMainPost(trendPost);
      setNewsList(newsList);
    }

    useEffect(() => {
      getTrends();    
    }, []);


    return(
       <>
         <div className="trend-topics container">
          <div className="col-1"></div>
          <div className="col-4">
           <div className="main-post-wrapper">
             <div className="main-post d-flex justify-content-center">
              <div className="mainpost-cover-wrapper mb-1 d-flex justify-content-center">
               {mainPost !== null ? <img className='mainpost-cover' src={mainPost.coverLink} alt="" /> : ''}
              </div>
              <div className="mainpost-desc">
               <Link className="post-title text-center text-white text-decoration-none" to={"/articles/trending"} >
                 <h4 className="pt-1 pb-3">{mainPost != null ? mainPost.title : ''}</h4>
               </Link> 
               <p className="text-center p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>        
              </div>
             </div>                
           </div>            
          </div>
          <div className="col-1"></div>
          <div className="col-5">
            <div className="news-list-wrapper">
              <h2 className="text-center other-trend-title mt-1">Other Trending News</h2>
              <div className="news-list">
               {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex align-items-center">
                    <img src={post.logoLink} className='trend-icons' alt="icon" />
                    <Link className="text-white text-decoration-none" to={"/articles/featured"}>
                     <h3 className="news-list-items">{post.title}</h3>
                    </Link>        
                  </div>
                ): ''}
              </div>              
            </div>
          </div>
          <div className="col-1"></div>
         </div>          
 
       </>
    )
}

export default TrendMain;