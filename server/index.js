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
    const query = '*[_type == "article"]{title, class, priority, type, coverLink, logoLink, coverImg, page, content, tob}';
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

const fetchMechanics = async (params) => {
  try {
    const query = '*[_type == "mechanics"]{name, links, description, articleTag}';
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
app.get('/api/mechanics', async (req, res) => {
  try {
    const data = await fetchMechanics();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

const fetchGallery = async () => {
  try {
    const query = '*[_type == "gallery"]{title, page, type, image, link, class}';
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

const fetchGameReleases = async () => {
  var currentTime = Math.floor(Date.now() / 1000);

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.igdb.com/v4/games',
      headers: axiosHeaders,
      data: `fields name, first_release_date, rating, rating_count, cover.url, platforms;
             where first_release_date > ${currentTime};
             sort rating;
             sort rating_count desc;
             limit 6;`
            
    }); 
  
    // Should output a list of game details (name, first_release_date, platforms)
    return response.data;

  } catch (error) {
    console.error('Error fetching upcoming releases:', error);
  }
};
app.get('/api/releases', async(req, res) => {
 try {
   const gameReleases = await fetchGameReleases();
   res.status(200).json(gameReleases);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Error fetching releases' });
 }
});

const fetchSpotlight = async () => {
  try {
    const query = '*[_type == "spotlight"]{title, link, platforms, description}';
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
app.get('/api/spotlight', async (req, res) => {
  try {
    const data = await fetchSpotlight();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

const fetchFacts = async () => {
  try {
    const query = '*[_type == "facts"]{topic, fact, imageLink}';
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
app.get('/api/facts', async (req, res) => {
  try {
    const data = await fetchFacts();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

const fetchGameJams = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://alakajam.com/api/featuredEvent',
      headers: axiosHeaders,
    }); 

    return response.data;

  } catch (error) {
    console.error('Error fetching upcoming releases:', error);
  }
};
app.get('/api/jams', async (req, res) => {
  try {
    const data = await fetchGameJams();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});