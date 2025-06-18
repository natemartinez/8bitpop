import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TrendMain() {
  const SERVER = import.meta.env.VITE_SERVER;
  const [mainPost, setMainPost] = useState(null);
  const [newsList, setNewsList] = useState(null);

  const navigate = useNavigate();

  async function getTrends() {
    try {
      const response = await axios.get(SERVER + '/api/content');
      organizePosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function organizePosts(posts) {
    let mainPosts = posts.filter(post => post.page === 'main');
    let trendPost = mainPosts.find(post => post.priority === 'high'); 
    let newsList = mainPosts.filter(post => post.priority === 'medium'); 

    setMainPost(trendPost);
    setNewsList(newsList);
  }

  useEffect(() => {
    getTrends();    
  }, []);

  useEffect(() => {
    console.log(mainPost)
  }, [mainPost])

  return (
    <div className="trend-topics container-fluid">
      <div className="row justify-content-center g-0">
        <div className="col-12 col-md-6 col-lg-6 mb-4 mb-md-0">
          <div className="main-post-wrapper">
            <div className="main-post d-flex flex-column align-items-center">
              <div className="mainpost-cover-wrapper mb-3">
                {mainPost !== null ? <img className='mainpost-cover' src={mainPost.coverLink} alt="" /> : ''}
              </div>
              <div className="mainpost-desc text-center">
                {mainPost !== null ? 
                 <div>
                  <a onClick={() => navigate('/articles/trending', { state: { post: mainPost } })}>
                   <h4 className="post-title text-center text-white text-decoration-none">{mainPost.title}</h4>
                  </a>
                  <p className="text-center p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                 </div>: ''}     
              </div>
            </div>                
          </div>            
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <div className="news-list-wrapper">
            <div className="news-list">
              <h2 className="text-center other-trend-title">Other Trending News</h2>  
              {newsList ?  
                newsList.map((post, index) => 
                  <div key={index} className="d-flex align-items-center justify-content-center mb-3">
                    <img src={post.logoLink} className='trend-icons' alt="icon" />
                    <a onClick={() => navigate('/articles/trending', { state: { post } })} className="text-white text-decoration-none" >
                      <h3 className="news-list-items mb-0">{post.title}</h3>
                    </a>        
                  </div>
                ) : ''}
            </div>              
          </div>
        </div>    
      </div>
    </div>
  );
}

export default TrendMain;