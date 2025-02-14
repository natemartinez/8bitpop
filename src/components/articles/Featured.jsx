import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ArticleLayout from './ArticleLayout';

function Featured() {
  const SERVER = import.meta.env.VITE_SERVER;

  const [loading, setLoading] = useState(true);
  const [coverImg, setCoverImg] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function fetchArticle() {
    const articles = await axios.get(SERVER + '/api/content');
    const curArticle = articles.data[0];
    setCoverImg('https://cdn.sanity.io/images/m5zbytnr/production/7e8014ad85ebae1fae3117ac9bdd07b15715ee60-1920x1370.jpg');
    setTitle(DOMPurify.sanitize(curArticle.title));
    setContent(DOMPurify.sanitize(curArticle.content));
    setLoading(false);
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div>
     <Menu/>
     <div>
      {!loading && (
        <div className='container d-flex flex-column justify-content-center article-content'>   
          <div className='d-flex article-cover-wrapper'>
            {coverImg && <img className='article-cover' src={coverImg} alt="cover" />}
            <h2 id='title'>{title}</h2>
          </div>
          <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
        </div>    
      )}
     </div>
    </div>

  );
}

export default Featured;
