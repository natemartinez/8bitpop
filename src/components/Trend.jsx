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
        const response = await axios.get('http://localhost:3001/api/trending');
        organizePosts(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    async function organizePosts(posts) {
      let listArray = [];

       for(let i=0; i < posts.length; i++){
          let priority = posts[i].priority;

          if(priority == 'High'){
            setMainPost(posts[i]);
            setMainPostCover(posts[i].logo)
          } else if(priority == 'Medium'){
            listArray.push(posts[i]);
          } else{
            listArray.push(posts[i]);
          }

         setNewsList(listArray);
       };

        // this function will organize each post by priority
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
              {mainPost ? <img className='mainpost-cover' src={mainPostCover} alt="" /> : ''}
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