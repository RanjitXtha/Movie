require('dotenv').config();
const API_KEY = process.env.API_KEY;
//const fetch = require('node-fetch');


const handleSearch = async (req, res) => {
    const searchQuery = req.query.query?.trim() || '';
  
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
  
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}`
      );
      const movieData = await movieResponse.json();
  
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodedQuery}`
      );
      const tvData = await tvResponse.json();
  
      const searchResult = { movieData, tvData };
      res.send({ searchResult });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching search results' });
    }
  };
  
  module.exports = { handleSearch };