import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import {Button} from "react-bootstrap";
import axios from 'axios'

const Future = () => {

  const SERVER = import.meta.env.VITE_SERVER;
  const [content, setContent] = useState([]);
  const [mainPost, setMainPost] = useState(null);

  async function fetchContent(){
    try {
      const response = await axios.get(SERVER + '/api/content');
      const futureContent = response.data.filter(obj => obj.page == 'future');
      const mainPost = response.data.filter(obj => obj.priority == 'high' && obj.page == 'future');
      setContent(futureContent);
      setMainPost(mainPost);
    } catch (error) {
      console.error(error)
    }
 }

 useEffect(() => {
    fetchContent();
 }, [content])
  

 return (
  <div className='content futurePage'>
    <div className='future-posts-wrapper d-flex flex-column align-items-center'>
      <h1 className="text-center fw-bold">Featured Posts about the Future of Gaming</h1>
      {content.length > 0 ? (
        <>
          <div className="main-post row">
            {mainPost && (
              <div className="col">
                <h1>{mainPost.title}</h1>
              </div>
            )}
          </div>
          <div className='mid-posts'>
            <div>
              {content.map((post, index) => (
                <div key={index} className='future-posts'>
                  <div>
                    <img className='future-img' src={post.coverLink} alt="" />
                  </div>
                  <div>
                    <h3 className="text-center mt-3">{post.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
);
};

export default Future;
