import { useState, useEffect } from 'react';
import axios from 'axios';
import './pageStyles.css';
import Menu from '../Menu';
import Programs from './Programs';
import Roadmaps from './Roadmaps';
import Goals from './Goals';
import ToolsandFrameworks from './ToolsandFrameworks';
import Settings from './Settings';

import XpCircle from '../widgets/XpCircle';
import Compiler from '../widgets/Compiler';

const Build = () => {
  const [programs, setPrograms] = useState(true);
  const [roadmaps, setRoadmaps] = useState(false);
  const [goals, setGoals] = useState(false);
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

  const changePage = (newPage) => {
   // setLoading(true);
    setPrograms(false);
    setRoadmaps(false);
    setGoals(false);
    setSettings(false);
    setToolsandFrameworks(false);

    switch (newPage) {
      case 'Programs':
        console.log('Heading to Programs')
        setPrograms(true);
        break;
      case 'Roadmaps':
        console.log('Heading to Roadmaps')
        setRoadmaps(true);
        break;
      case 'Goals':
        console.log('Heading to Goals')
        setGoals(true);
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

  useEffect(() => {
    //setPrograms(true);
  }, []);


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
            <a className="nav-link" href="#" onClick={() => changePage('Programs')}>Programs</a>
          </li>
          <li className="build-nav-item">
            <a className="nav-link" href="#" onClick={() => changePage('Roadmaps')}>Roadmaps</a>
          </li>
          <li className="build-nav-item">
            <a className="nav-link" href="#" onClick={() => changePage('Goals')}>Goals</a>
          </li>
          <li className="build-nav-item">
            <a className="nav-link" href="#" onClick={() => changePage('Tools & Frameworks')}>Tools & Frameworks</a>
          </li>
          <li className="build-nav-item">
            <a className="nav-link" href="#" onClick={() => changePage('Settings')}>Settings</a>
          </li>
         </ul>
        </div>
       </div>
       <div className='d-flex container'>
        <div className='col-2'></div>
        <div className='col-9'>
        {programs && <Programs />}
        {roadmaps && <Roadmaps />}
        {goals && <Goals />}
        {toolsandFrameworks && <ToolsandFrameworks />}
        {settings && <Settings />}          
        </div>
        <div className='col-1'></div>
       </div>
       <div className='d-flex container justify-content-center'>
        <Compiler/>
       </div>
      </div> 
    </div>
  );
};

export default Build;
