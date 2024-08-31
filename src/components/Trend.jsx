import { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function Trend(){
    const [posts, setPosts] = useState(null);
    const [mainPost, setMainPost] = useState(null);
    const [mainPostCover, setMainPostCover] = useState(null);
    const [newsList, setNewsList] = useState(null);


    async function getTrends() {
      try {
        const response = await axios.get('http://localhost:3001/api/content');
        organizePosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function organizePosts(posts) {
      let trends = [];

       for(let i=0; i < posts.length; i++){
        let postClass = posts[i].class;
        let postPriority = posts[i].priority;
         if(postClass == 'trending' && postPriority == 'high' ){
           setMainPost(posts[i]);
         };
         if(postClass == 'trending' && postPriority == 'medium'){
          trends.push(posts[i]);
         };
       };

       setNewsList(trends);
    }
  

    useEffect(() => {
      getTrends();
    }, []);


    return(
        <>
        <div className="container trend-topics">
        <h1 className='text-center mt-3'>Trending Topics</h1>
          <div className="main-post d-flex align-items-center justify-content-center">
            <div className="mainpost-cover-wrapper">
              {mainPost ? <img className='mainpost-cover' src={mainPost.coverLink} alt="" /> : ''}
            </div>
            <Link className="text-white text-decoration-none" to={"/articles/trending"}><h2>{mainPost ? mainPost.title : ''}</h2></Link>
          </div>

          <div className="news-list">
              {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex">
                    <img src={post.logo} className='trend-icons' alt="icon" />
                    <h5>{post.title}</h5>
                  </div>
                ): ''}
          </div>
         
        </div> 
        </>
    )
}

export default Trend;