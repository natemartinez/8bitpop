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
    //const [posts, setPosts] = useState(null);

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
            console.log('Main Post: ', posts[i]);
            setMainPost(posts[i]);
          } else if(priority == 'Medium'){
            listArray.push(posts[i]);
          } else{
            listArray.push(posts[i]);
          }

         setNewsList(listArray);
       };

       console.log('News List: ', listArray);

        // this function will organize each post by priority
    }

    async function getImages(link) {
      setMainPostCover(link)
    }

    useEffect(() => {
      getTrends();
      getImages('https://cdn.sanity.io/images/m5zbytnr/production/7e8014ad85ebae1fae3117ac9bdd07b15715ee60-1920x1370.jpg');
    }, []);

    useEffect(() => {
      console.log(mainPost)
    }, [])

    return(
        <>
        <div className="container trend-topics">
          <div className="main-post d-flex flex-column align-items-center">
            <div className="mainpost-cover-wrapper">
              {mainPost ? <img className='mainpost-cover' src={mainPostCover} alt="" /> : ''}
            </div>
            <h2>{mainPost ? mainPost.title : ''}</h2>
          </div>

          <div className="news-list">
              {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex">
                    <p>category icon</p>
                    <h5>{post.title}</h5>
                  </div>
                ): ''}
          </div>
         
        </div> 
        </>
    )
}

export default Trend;