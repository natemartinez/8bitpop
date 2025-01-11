import { useState, useEffect } from "react";
import ModuleForm from "./ModuleForm";
import axios from "axios";
import DOMPurify from 'dompurify';

function PhaserIntro(){
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    // function that receives content from Sanity and returns a JSX element
    async function receiveContent() {
        try {
          const facts = await axios.get('http://localhost:3001/api/devtips');

          setTitle(facts.data[0].title);
          setContent(facts.data[0].content);
        } catch (error) {
          console.error(error)
        }
    };

    useEffect(() => {
        receiveContent()
    }, [])

 return (
    <div>
        <ModuleForm title={title} content={content}/>
    </div>
 )
}

export default PhaserIntro;