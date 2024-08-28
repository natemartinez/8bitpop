import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import '../../style.css';
import axios from 'axios';
import Nav from '../Nav';
import DOMPurify from 'dompurify';

function Trending() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [content, setContent] = useState(null);

  async function fetchArticle() {
    const articles = await axios.get('http://localhost:3001/api/trending');

    let curArticle = articles.data[0];

    setCoverImg('https://cdn.sanity.io/images/m5zbytnr/production/7e8014ad85ebae1fae3117ac9bdd07b15715ee60-1920x1370.jpg');

    let sanitizedTitle = DOMPurify.sanitize(curArticle.title);
    let sanitizedContent = DOMPurify.sanitize(curArticle.content);
  
    document.getElementById('title').innerHTML = sanitizedTitle;
    document.getElementById('content').innerHTML = sanitizedContent;
    
  };

  useEffect(() => {
    fetchArticle();
  }, [])


  return (
    <>
    <div>
      <div>
        <Button><Link className='text-white text-decoration-none' to={"/"}>Home</Link></Button>      
      </div>
     {!loading ? '' :
     <div> 
      <div className='container d-flex justify-content-center'>
       <div className='article-cover-wrapper'>
         {!coverImg ? '' : <img className='article-cover' src={coverImg} alt="steam" />}
       </div>
       <h2 id='title'></h2>
      </div>
      <div className='container'>
        <h1>Reminder: If the article is a review, remember to allow rederss to add their collective reviews and votes</h1>`
       <div id='content'>

       </div>
       <div id='comments'>
          <h2>COMMENT SECTION</h2>
       </div>
      </div>
     </div> 
     }
     </div>
    </>
  );
}

export default Trending;

