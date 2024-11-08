require('dotenv').config();
const API_KEY = process.env.API_KEY;
//const fetch = require('node-fetch');


const fetchMovieGenres = async(req,res)=>{
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const genres = await response.json();
    res.json({results:genres})
  }

const fetchTvShowsGenres = async(req,res)=>{
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`);
    const genres = await response.json();
    res.json({results:genres})
}

  module.exports = {fetchMovieGenres, fetchTvShowsGenres};