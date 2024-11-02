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
  const [latestTvShows , setLatestTvShows] = useState(null);
  const [topRatedTvShows , settopRatedTvShows] = useState(null)

  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/popular`)
    const data = await response.json();
    setTrending(data.results.slice(0,12));
    //console.log(data.results);
  } 

  const LatestMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/latest`)
    const data = await response.json();
    
    setLatestMovies(data.results.slice(0,12));
    //console.log(data.latest)
    
  } 

  const fetchLatestTvShows = async () => {
      const response = await fetch(`http://localhost:5000/api/tv/on_the_air`);
      const data = await response.json();
      console.log('Results:', data);
      setLatestTvShows(data.results.slice(0,12));
  }

  const fetchTopRatedTvShows = async () => {
    const response = await fetch(`http://localhost:5000/api/tv/top_rated`);
    const data = await response.json();
    console.log('Results:', data);
    settopRatedTvShows(data.results.slice(0,12));
}



  PopularMovies();
  LatestMovies();
  fetchLatestTvShows();
  fetchTopRatedTvShows();
},[])


  return (
    <div className='bg-black'>
      <Header />
      <Hero />

      {/*Trending */}
      <MovieTVsection title={"Trending"} type={"movie"} movies={trendingMovies}  />

      {/*Latest */}
      <MovieTVsection title={"Latest"} type={"movie"} movies={latestMovies}  />

      {/*Latest*/}
      <MovieTVsection title={"TV Shows"} type={"tv"} movies={latestTvShows}  />

      {/*Top Rated */}
      <MovieTVsection title={"Top Rated"} type={"tv"} movies={topRatedTvShows}  />

  


    
      

    </div>
   
  )
}

export default Homepage