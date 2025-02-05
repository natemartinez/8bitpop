import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import './pageStyles.css'

const Roadmaps = () => {
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState(false);
  const [curCard, setCurCard] = useState('');

  const SERVER = import.meta.env.VITE_SERVER;
  
  const switchCard = (str) => {
    setSelection(true);
    setCurCard(str);
    setProgram(str)
  };

 async function setProgram() {
    // this function is going to grab from the sanity api
    // list of modules within the game genre (Currency in a RPG, or gun pattern in FPS)
    // content connected with IGDB, maybe have a mixture of SANITY and SERVER info

    const articles = await axios.get(SERVER+ '/api/content');

    console.log(articles)
    
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <h2>Roadmap</h2> 
      <ul className="d-flex roadmap-list">
        <div className="col gap-2">
         <li className="m-3">
          <div className="roadmap-card">
            <a href="#" onClick={() => switchCard('rpg')}><h2>RPG's</h2></a>
          </div>
         </li>
         <li className="m-3">
          <div className="roadmap-card">
           <a href="#" onClick={() => switchCard('shooters')}><h2>Shooters</h2></a> 
          </div>
         </li>          
        </div>
        <div className="col">
          <li className="m-3">
           <div className="roadmap-card">
            <a href="#" onClick={() => switchCard('casual')}><h2>Casual</h2></a> 
           </div>
          </li>
          <li className="m-3">
           <div className="roadmap-card">
             <a href="#" onClick={() => switchCard('puzzle')}><h2>Puzzle</h2></a> 
           </div>
          </li>        
        </div>
      </ul>

    </div>
  );
};

export default Roadmaps;