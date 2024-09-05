require('dotenv').config();

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(express.json());
app.use(cors());

const port = 3001;

const sanityProjectId = process.env.ID;
const sanityDataset = process.env.DATASET;       
const sanityApiVersion = process.env.API_VERSION;    
const sanityToken = process.env.API_TOKEN;
const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`;

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

/* // may have to make call to check if user exists
const checkUsers = async (userInfo) => {
  try {
    const query = '*[_type == "users"]{username, password}';
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
*/

// The addUsers function
const addUsers = async (username, password) => {
  const userUrl = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/mutate/${sanityDataset}`;

  console.log(username);

  const response = await fetch(userUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sanityToken}`
    },
    body: JSON.stringify({
      mutations: [
        {
          "create": {
            _type: 'user',
            username: username,
            password: password
          }
        }
      ]
    })
  });

  return response.json();
};

// Endpoint to add a user
app.post('api/add-user', async (req, res) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {


    const data = await addUsers(username, password);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
