import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const Profile = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);



  return (
    <div className="itch-feed container">
      {error && <p>{error}</p>}
      <ul>
        <li>Items</li>
        <li>Items</li>
      </ul>
    </div>
  );
};

export default Profile;