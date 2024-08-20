import { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function TrendCarousel(){
    const [posts, setPosts] = useState(null);
    const [row1, setRow1] = useState(null);
    const [row2, setRow2] = useState(null);
    //const [posts, setPosts] = useState(null);

    async function getPost() {
      try {
        const response = await axios.get('http://localhost:3001/api/articles');
        setPosts(response.data);
    
      } catch (error) {
        console.error(error);
      }
    }

    async function dividePosts(posts) {
      let row1 = [];
      let row2 = [];

      for(let i=0; i < posts.length; i++){
        if(row1.length < 3){
          row1.push(posts[i])
        }else if(i > 3){
          if(row2.length < 3){
            row2.push(posts[i]);
          }     
        } 
      }
      setRow1(row1);
      setRow2(row2);
    }

    useEffect(() => {
      getPost();
    }, []);

    useEffect(() => {
      if(posts !== null){
        dividePosts(posts);
      }
    }, [posts])

    return(
        <>
        <div className="container">
          <Carousel className="trend-carousel-wrapper" interval={null}>
           <CarouselItem>
            <div className="trend-lineup">
              {row1 !== null ? row1.map((post, index) => 
                <div key={index} className="article-card">
                  <h2>Image</h2>
                  <a href="#" className="text-white text-decoration-none"><p>{post.title}</p></a>
                  <Button>{post.category}</Button>
                </div>) : ''
              }
             </div>
            </CarouselItem>
            <CarouselItem>
            <div className="trend-lineup">
              {row2 !== null ? row2.map((post, index) => 
                <div key={index} className="article-card">
                  <h2>Image</h2>
                  <a href="#" className="text-white text-decoration-none"><p>{post.title}</p></a>
                  <Button>{post.category}</Button>
                </div>) : ''
              }
              </div>
            </CarouselItem>
          </Carousel>
         </div> 
        </>
    )
}

export default TrendCarousel;