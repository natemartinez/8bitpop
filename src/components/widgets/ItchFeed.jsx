import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const ItchFeed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/itch-feed');
        const items = response.data?.rss?.channel?.item || [];
        console.log(items);
        setFeedItems(items);
      } catch (err) {
        setError("Failed to load RSS feed");
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div className="itch-feed container">
      <h1 className="text-center m-3">Featured Games from Itch.io:</h1>
      {error && <p>{error}</p>}
      <ul>
        {feedItems.map((item, index) => (
          <div key={index} className="d-flex">
            <img className="itch-game" src={item.imageurl} alt="game cover" />
            <div>
              <a className="itch-link" href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p>{item.description.split('\n')[0]}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ItchFeed;
