// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const Client_ID = '8e3fb8a3e6a9fd276f4c';
const Client_Secret = 'eda401925570dd5c2747ce9a04ad78999a1dc860';
const Redirect_URI = 'http://localhost:3000/'; // Your registered callback URL

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/auth', (req, res) => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${Client_ID}&redirect_uri=${Redirect_URI}`;
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const params = `client_id=${Client_ID}&client_secret=${Client_Secret}&code=${code}`;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error while fetching access token:', error);
        res.status(500).send('Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
