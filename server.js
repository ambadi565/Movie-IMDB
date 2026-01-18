import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/movie', async (req, res) => {
  try {
    const { movieName } = req.body;

    if (!movieName) {
      return res.status(400).json({ error: 'Movie name is required' });
    }

    const omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${process.env.OMDB_API_KEY}`;

    const response = await fetch(omdbUrl);
    const data = await response.json();

    if (!data.Response || data.Response === 'False') {
      return res.status(404).json({ error: data.Error || 'Movie not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
