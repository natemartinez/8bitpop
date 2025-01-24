import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const Roadmaps = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);



  return (
    <div className="itch-feed container">
      {error && <p>{error}</p>}
      <ul>
        {feedItems.map((item, index) => (
          <div key={index} className="d-flex">
            <img className="itch-game" src={item.imageurl} alt="game cover" />
            <div>
              <a className="itch-link" href={item.link} target="_blank" rel="noopener noreferrer">
               {item.plainTitle}
              </a>
              <p>{item.description.split('\n')[0]}</p>            
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Roadmaps;