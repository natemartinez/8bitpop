import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const Roadmaps = () => {
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState(false);
  const [curCard, setCurCard] = useState('');

  const switchCard = (str) => {
    setSelection(true);
    setCurCard(str);
    setProgram(str)
  };

  const setProgram = () => {
    // this function is going to grab from the sanity api

    
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      {!selection ? <h2>Roadmap</h2>: 
      <ul className="d-flex roadmap-list">
        <li>
          <div className="roadmap-card">
            <a href="#" onClick={() => switchCard('RPG')}><h2>RPG's</h2></a>
          </div>
        </li>
        <li>
          <div className="roadmap-card">
           <a href="#" onClick={() => switchCard('shooters')}><h2>Shooters</h2></a> 
          </div>
        </li>
      </ul>}

    </div>
  );
};

export default Roadmaps;