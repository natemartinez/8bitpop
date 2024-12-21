import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const ItchFeed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent('https://itch.io/feed/featured.xml')}`
        );
          

        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const items = jsonData?.rss?.channel?.item || [];
        console.log(items)
        setFeedItems(items);
      } catch (err) {
        setError("Failed to load RSS feed");
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div className="itch-feed container">
      <h2 className="text-center">Games from Itch.io</h2>
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

export default ItchFeed;
