import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import "bootstrap/dist/css/bootstrap.min.css";
import './pageStyles.css';
import Menu from '../Menu';

const Profile = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const SERVER = import.meta.env.VITE_SERVER;

  const storedUser = localStorage.getItem('userData');
  const curationChoice = document.getElementById('curate-form');

  const handleForm = (e) => {
   e.preventDefault();
   const formData = new FormData(e.target);
   const formProps = Object.fromEntries(formData);
   adjustContent(Object.values(formProps));
  }

  async function adjustContent(data) {
    // Send info to server, adjust preferences property of assigned user
    const userData = JSON.parse(storedUser);

    const dataToUpdate = {
      username: userData.username,
      preferences: data
    }
    try {
      const response = await axios.post(SERVER + '/api/curate', dataToUpdate);
      console.log(response.data);
     } catch (error) {
      console.error(error);
     }
  }

  useEffect(() => {
    if(curationChoice){
      curationChoice.addEventListener("submit", handleForm);
    }
  }, []);

  
  return (
    <div className="container">
      {error && <p>{error}</p>}
      <Menu />
      <div className="curate-options">
        <form id="curate-form">
          <input type="checkbox" name="New Games" value="New Games" />
          <label htmlFor="new"></label>New Games<br/>
          <input type="checkbox" name="Sales" value="Sales" />
          <label htmlFor="sales">Sales</label><br/>
          <input type="checkbox" name="Retro" value="Retro" />
          <label htmlFor="retro">Retro</label><br/>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;