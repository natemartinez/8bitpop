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

const sanityProjectId = 'm5zbytnr';
const sanityDataset = 'production';       
const sanityApiVersion = '2023-08-01';    
const sanityToken = 'skbZxwUqhV9uT2NjJijdCkmXIB38b1t3gw3H4HgsGxyrvMc2a3y7cpo0uoi5slVjoaOluLArf46tXuJbLVGNal7ISRbGA9POVWGyPZ9lFRwBw9kdQKjT8Dxb57t52JNZChojjlVxCbgMHS2iOHsBB46tltRnJWNLesgWBU2ckvLsDV28EjpA';
const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}`;

const fetchArticles = async () => {
  try {
    const query = '*[_type == "post"]{title, content, category}';
    const response = await axios.get(sanityUrl, {
      params: { query },
      headers: sanityToken ? { Authorization: `Bearer ${sanityToken}` } : {}
    });

    const data = response.data.result;
    console.log('Sanity Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
};

app.get('/api/articles', async (req, res) => {
  try {
    const data = await fetchArticles();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from Sanity');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
