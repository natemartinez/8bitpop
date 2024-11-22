// server/twitchAuth.js
const axios = require('axios');
require('dotenv').config();

const getTwitchAccessToken = async () => {
    const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

    try {
        const response = await axios.post(TWITCH_TOKEN_URL, null, {
            params: {
                client_id: process.env.IGDB_ID,
                client_secret: process.env.IGDB_SECRET,
                grant_type: 'client_credentials',
            },
        });

        console.log('Access Token Response:', response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Twitch access token:', error.response?.data || error.message);
        throw error;
    }
};

// Export using CommonJS
module.exports = getTwitchAccessToken;
