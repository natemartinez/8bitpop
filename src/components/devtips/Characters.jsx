import { useEffect } from "react";
import ModuleForm from "./ModuleForm";

function Characters(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function fetchContent() {
    try {
        const response = await axios.get('http://localhost:3001/api/articles');
        const api = response.data;
        console.log(api)
        //const content = api.filter(data => data.page === 'menu');
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchContent();
  }, [])
    
 return (
    <div>
        <ModuleForm title={'Getting Started with Phaser'} content={'Yummers'}/>
    </div>
 )
}

export default Characters;