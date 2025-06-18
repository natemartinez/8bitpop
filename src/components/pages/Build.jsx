import { useState, useEffect } from 'react';
import axios from 'axios';
import './pageStyles.css';
import Menu from '../Menu';
import Programs from './Programs';
import Roadmaps from './Roadmaps';
import Notes from './Notes';
import ToolsandFrameworks from './ToolsandFrameworks';
import Settings from './Settings';

import XpCircle from '../widgets/XpCircle';
import Chatbot from '../widgets/Chatbot';

const Build = () => {
  const [editor, setEditor] = useState(true);
  const [roadmaps, setRoadmaps] = useState(false);
  const [notes, setNotes] = useState(false);
  const [toolsandFrameworks, setToolsandFrameworks] = useState(false);
  const [settings, setSettings] = useState(false);
 
  const request = {
    language: 'python',
    code: "print('Hello, World!')"
  }
  // My idea is to allow users to build creative representations, models of their 
  // game building ideas  

  // Like a pinterest board for game developers, but the content and ideas can
  // be edited and built upon  

  // I would love to incorporate different software to transform the
  // models into a more interactive experience.

  // Need to add testing software for the compiler

  //Also need to add frameworks and tools for the user to use (starter packs)

  const changePage = (newPage) => {
   // setLoading(true);
    setRoadmaps(false);
    setNotes(false);
    setSettings(false);
    setToolsandFrameworks(false);

    switch (newPage) {
      case 'Editor':
        console.log('Heading to Editor')
        setEditor(true);
        break;
      case 'Roadmaps':
        console.log('Heading to Roadmaps')
        setRoadmaps(true);
        break;
      case 'Notes':
        console.log('Heading to Goals')
        setNotes(true);
        break;
      case 'Tools & Frameworks':
        console.log('Heading to Tools & Frameworks')
        setToolsandFrameworks(true);
        break;
      case 'Settings':
        console.log('Heading to Settings')
        setSettings(true);
        break;
      default:
        break;
    }

  };



  return (
    <div className="container d-flex justify-content-center" >
      <div>
        <Menu />

      </div>
      <div className='build-content w-100'>
       <div className="build-header w-100 d-flex justify-content-center">
         <h1>Build</h1>
         <XpCircle />
       </div>
       <div className="build-nav-container">
        <div className="build-nav d-flex row justify-content-start">
         <ul className="nav justify-content-center">
          <li className="build-nav-item">
            {roadmaps ? <a className='nav-link active' href='#'>Roadmaps</a> :
             <a className="nav-link" href="#" onClick={() => changePage('Roadmaps')}>Roadmaps</a>
            }
          </li>
          <li className="build-nav-item">
            {notes ? <a className='nav-link active' href='#'>Notes</a> :
             <a className="nav-link" href="#" onClick={() => changePage('Goals')}>Notes</a>
            }
          </li>
          <li className="build-nav-item">
            {toolsandFrameworks ? <a className='nav-link active' href='#'>Tools and Frameworks</a> :
             <a className="nav-link" href="#" onClick={() => changePage('Tools and Frameworks')}>Tools and Frameworks</a>
            }
          </li>
          <li className="build-nav-item">
            {settings ? <a className='nav-link active' href='#'>Settings</a> :
             <a className="nav-link" href="#" onClick={() => changePage('Settings')}>Settings</a>
            }
          </li>
         </ul>
        </div>
       </div>
       <div className='d-flex container'>
        <div className='col-2'></div>
        <div className='col-9'>
        {roadmaps && <Roadmaps />}
        {notes && <Notes />}
        {toolsandFrameworks && <ToolsandFrameworks />}
        {settings && <Settings />}          
        </div>
        <div className='col-1'></div>
       </div>

      </div> 
      
      <Chatbot/>
    </div>
  );
};

export default Build;
