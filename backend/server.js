// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
// const API_KEY = process.env.OMDB_API_KEY; // Use a key from OMDB or another source
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(cors());


app.get('/',(req, res)=>{
    res.send('Hello');
  })
// Fetch movies by category (default: popular)
// app.get('/movies/:category', async (req, res) => {
//     const category = req.params.category || 'popular';
//     try {
//         const response = await axios.get(`https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch movies' });
//     }
// });

app.get('/movies/:category', async (req, res) => {
    const category = req.params.category || 'now_playing';
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
            params: { language: 'en-US', page: 1 },
            headers: { Authorization: `Bearer ${TMDB_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

// Fetch movie trailers (alternative API needed)
// app.get('/movies/:id/videos', async (req, res) => {
//     const movieId = req.params.id;
//     try {
//         const response = await axios.get(`https://api.tvmaze.com/shows/${movieId}`);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch movie details' });
//     }
// });

app.get('/movies/:id/videos', async (req, res) => {
    const movieId = req.params.id;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
            params: { language: 'en-US' },
            headers: { Authorization: `Bearer ${TMDB_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie videos' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
