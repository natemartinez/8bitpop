import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const ToolsandFrameworks = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);



  return (
    <div>
      <h1>Tools and Frameworks</h1>
      <p>Below is an example of what I want the page to be</p>
      <p>Here is a list of tools and frameworks that can help you build your game.</p>
      <ul>
        <li>Unity</li>
        <li>Unreal Engine</li>
        <li>Godot Engine</li>
        <li>GameMaker Studio</li>
        <li>Construct</li>
        <li>Phaser</li>
        <li>Defold</li>
        <li>Love2D</li>
        <li>LibGDX</li>
        <li>Monogame</li>
        <li>Pygame</li>
        <li>SDL</li>
      </ul>

      <p>Next to each item is a description and vague tag of what it helps - "Environmental", "Online Support", "Graphics"</p>
    </div>
  );
};

export default ToolsandFrameworks;