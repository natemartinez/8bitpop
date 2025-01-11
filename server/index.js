require('dotenv').config();
const bcrypt = require('bcrypt');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');


const UserModel = require('./models/User.js');
const { MongoClient } = require('mongodb');
const connectDB = require('./db.js');
const User = require('./models/User.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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

app.post('/api/register', async (req, res) => {
  const { username, password, progress, preferences } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.',
    });
  }

  try {
    const newUser = new User({ username, password, progress, preferences });

    await newUser.save();

    console.log('User saved');
    res.status(201).json({
      success: true,
      message: 'User created successfully.',
    });
  } catch (error) {
    console.error('Error saving user:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
});

app.post('/api/log-in', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
    const query = '*[_type == "mechanics"]{name, links, description, articleTag, class}';
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

//Info for user database

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

const fetchDevTips = async () => {
  try {
    const query = '*[_type == "devTips"]{title, content}';
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
app.get('/api/devtips', async (req, res) => {
  try {
    const data = await fetchDevTips();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});