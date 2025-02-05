import {useState, useEffect } from "react";
import ModuleForm from "./ModuleForm";
import axios from "axios";

function WorldBuilding(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const SERVER = import.meta.env.VITE_SERVER;
  
  async function fetchContent() {
    try {
        const response = await axios.get(SERVER + '/api/content');
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