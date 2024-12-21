import {useState, useEffect } from "react";
import ModuleForm from "./ModuleForm";
import axios from "axios";

function WorldBuilding(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function fetchContent() {
    try {
        const response = await axios.get('http://localhost:3001/api/content');
        const api = response.data;
        console.log(api)
        //const content = api.filter(data => data.page === 'menu');
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    console.log('useEffect is called')
    fetchContent();
  }, [])
    
 return (
    <div>
        <ModuleForm title={title} content={content}/>
    </div>
 )
}

export default WorldBuilding;