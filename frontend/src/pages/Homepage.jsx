import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../sections/Hero';
import Header from '../sections/Header';
import MovieTVsection from '../sections/MovieTVsection';

const Homepage = () => {

  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'

  const [trendingMovies , setTrending] = useState(null);
  const [latestMovies,setLatestMovies] = useState(null);
  const [latestTvShows , setLatestTvShows] = useState(null)

  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/popular`)
    const data = await response.json();
    setTrending(data.results.slice(0,11));
    //console.log(data.results);
  } 

  const LatestMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/latest`)
    const data = await response.json();
    
    setLatestMovies(data.results.slice(0,11));
    //console.log(data.latest)
    
  } 

  const fetchLatestTvShows = async () => {
      const response = await fetch(`http://localhost:5000/api/tvshows/latest`);
      const data = await response.json();
      //console.log('Results:', data);
      setLatestTvShows(data.results.slice(0,11));
  }



  PopularMovies();
  LatestMovies();
  fetchLatestTvShows();
},[])


  return (
    <div className='bg-black'>
      <Header />
      <Hero />

      {/*Trending */}
      <MovieTVsection title={"Trending"} movies={trendingMovies}  />

      {/*Trending */}
      <MovieTVsection title={"Latest"} movies={latestMovies}  />

      {/*Trending */}
      <MovieTVsection title={"TV Shows"} movies={latestTvShows}  />

  


    
      

    </div>
   
  )
}

export default Homepage