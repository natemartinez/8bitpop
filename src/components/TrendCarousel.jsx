import { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import axios from "axios";

function TrendCarousel(){
    const [posts, setPosts] = useState(null);

    async function getPost() {
      try {
        const response = await axios.get('http://localhost:3001/api/articles');
        setPosts(response.data);
    
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getPost();
    }, [posts]);

    return(
        <>
        <div className="container">
          <Carousel className="trend-carousel-wrapper" interval={null}>
           <CarouselItem>
            <div className="trend-lineup">
              {posts !== null ? posts.map((post, index) => 
                <div key={index} className="article-card">
                  <p>{post.title}</p>
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