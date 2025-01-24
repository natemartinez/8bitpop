import {useState, useEffect} from 'react';
import axios from 'axios';

import Menu from '../Menu'

const Community = () => {

  // Need to connect DB to receive posts from other users
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  const [authorField, setAuthorField] = useState('');
  const [contentField, setContentField] = useState('');
  const [tagField, setTagField] = useState('');

  const [create, setCreate] = useState(false);
  const [tagError, setTagError] = useState(false);

  const [message, setMessage] = useState('');

  const createPost = async (author, title, content, tags) => {

    console.log(author, title, content, tags);

    try {
      const response = await axios.post('http://localhost:3001/api/createPost', {
        title: title,
        content: content,
        tags: tags
      });
      setCreate(false);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }
  const submitTag = (input, tags) => {
    // take the input from the tag field and save it to the
    // 'tags' array
    // should empty out the tags field
    // and display the tag that was written
    const tagArray = [...tags];

    if(tagArray.includes(input)){
      setTagError('Tag already exists');
      return
    }
    setTagError('');
    setTagField('');
    setTags(tagArray => [...tagArray, input]);
  };
  const cancelTag = (index) => {
      let tagArray = [...tags];
      tagArray.splice(index, 1);
      setTags(tagArray);
  }


  useEffect(() => {
    console.log(tags)
  }, [tags])

  

  return (
    <div className='container d-flex flex-column'>
        <div>
           <Menu /> 
        </div>
        <div>
            <h2>Build a help page strictly for inspiration - like deviantArt</h2>
            <h4>{message}</h4>
        </div>
        <div className='input-field-container'>
          {!create ? <button onClick={() => setCreate(true)}>Create</button> :
           <div className='d-flex flex-column input-fields'>
            <div className='row m-1'>
             <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='row m-1'>
              <input type="text" className='content-field' placeholder='Content' onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className='row m-1'>
               <input type="text" value={tagField} onChange={(e) => setTagField(e.target.value)} id='tag-field' placeholder='Tags'/>
               <button id='tag-btn' onClick={() => submitTag(tagField, tags)}>OK</button>
               <ul className='d-flex mt-3'>
                {tags.length > 0 ? tags.map((tag, index) => (
                 <li className='tag-items' key={index}>
                  <div className='d-flex align-items-center m-1'>
                    <button id='cancel-tag' onClick={() => cancelTag(index)}>X</button>
                    <p id='tag-name'>{tag}</p>             
                  </div>
                 </li>   
                 )) : ''}
               </ul>

              <p id='tag-error'>{tagError}</p>
            </div>
            <button onClick={() => setCreate(false)}>Cancel</button>
            <button onClick={() => createPost(author, title, content, tags)}>Submit</button>
           </div>}
        </div>

    </div>
  );
};

export default Community;
