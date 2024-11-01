const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';

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