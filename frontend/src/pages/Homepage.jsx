import React, { useEffect } from 'react';
import { useState } from 'react';

const Homepage = () => {

  const baseUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w500";

  const [hero , setHero] = useState([]);
  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/popular')
    const data = await response.json();
    console.log(data);
  } 

  const LatestMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/latest')
    const data = await response.json();
    setHero(data.latest.splice(0,5));
    
  } 

  //PopularMovies();
  LatestMovies();
},[])
  return (
    <div>
      <header className='w-full h-12 px-6 grid grid-cols-[14%_1fr_16%] gap-6 items-center bg-cyan-200 '>
        <div className='w-14'>NEPFLIX</div>

        <div className='flex justify-center gap-10 '>
          <nav>Home</nav>
          <nav>Genre</nav>
          <nav>Movies</nav>
          <nav>TV Shows</nav>
        </div>

        <div>
          <span>
            <input type="text" placeholder='Search' />
          </span>
        </div>

      </header>
    {
      hero &&
        <section className='relative w-full h-[calc(100vh-3rem)] bg-slate-600'>
        <p>{hero[0].title}</p>
        <p>Genre:</p>
        <span><p>Duration:</p><p>Rating</p></span>
        <p>Description</p>
        <button>
          Watch Now
        </button>
        <img  src={`${baseUrl}${posterSize}${hero[0].poster_path}`}
          alt={`${hero[0].title} poster`} className='absolute top-0 w-full' />
      </section>
    
    }
      

    </div>
   
  )
}

export default Homepage