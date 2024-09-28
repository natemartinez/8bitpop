require('dotenv').config();
const bcrypt = require('bcrypt');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const UserModel = require('./models/User.js');
const { MongoClient } = require('mongodb');
const connectDB = require('./db.js');
const User = require('./models/User.js');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(express.json());
app.use(cors());

connectDB();

const port = 3001;
const sanityProjectId = process.env.ID;
const sanityDataset = process.env.DATASET;       
const sanityApiVersion = process.env.API_VERSION;    
const sanityToken = process.env.API_TOKEN;
const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`;

const igdbID = process.env.IGDB_ID;
const igdbSECRET = process.env.IGDB_SECRET;
const igdbTOKEN = process.env.IGDB_TOKEN;

const axiosHeaders = {
  'Client-ID': igdbID,
  'Authorization': `Bearer ${igdbTOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'text/plain'
};

const fetchContent = async (params) => {
  try {
    const query = '*[_type == "content"]{title, class, priority, type, coverLink, logoLink, page, content, tob}';
    const response = await axios.get(sanityUrl, {
      params: { query },
      headers: sanityToken ? { Authorization: `Bearer ${sanityToken}` } : {}
    });

    const data = response.data.result;
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
};
app.get('/api/content', async (req, res) => {
  try {
    const data = await fetchContent();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

const fetchGallery = async () => {
  try {
    const query = '*[_type == "gallery"]{title, image, link, class}';
    const response = await axios.get(sanityUrl, {
      params: { query },
      headers: sanityToken ? { Authorization: `Bearer ${sanityToken}` } : {}
    });

    const data = response.data.result;
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
};
app.get('/api/gallery', async (req, res) => {
  try {
    const data = await fetchGallery();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

app.post('/api/users', async(req, res) => {
   const {username, password, preferences} = req.body;

  try {
    const newUser = new User({username, password, preferences});
    await newUser.save();
    console.log('User saved')
  } catch (error) {
    console.error(error);
  }
});


const fetchPS5Releases = async () => {
  var currentTime = Date.now();
  console.log(currentTime)

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.igdb.com/v4/release_dates',
      headers: axiosHeaders,
      data: `fields game; 
             where game.platforms = 167 & date > ${currentTime}; 
             sort date desc;
             limit 10;`
             // 167 = PS5 ID (found inside IGDB /platforms)
    });
    
    searchGamesByIDs(response.data); // Should output a list of game details (name, first_release_date, platforms)
  } catch (error) {
    console.error('Error fetching upcoming releases:', error);
  }
};

app.get('/api/releases', async(req, res) => {
 try {
   const releaseInfo = await fetchPS5Releases();
   //res.status(200).json(releaseInfo); 
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Error fetching releases' });
 }
});

// fetchPS5Releases => search game ID's based on output => back to upcoming releases with array of games and info

const searchGamesByIDs = (idArray) => {

  const newArr = idArray.map(curGame => curGame.game);

   // need to find a way to search for multiple games within the idArray, to then output 
   // an array of games and their info

   axios.post('https://api.igdb.com/v4/games', `fields name; where id = (${newArr});`, {headers: axiosHeaders})
   .then(response => {
    console.log(response.data);
   })
   .catch(error => {
    console.error(error);
   });

};


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});