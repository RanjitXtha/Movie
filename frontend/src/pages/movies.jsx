import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [latest , setLatest] = useState(null);
  const [popular , setPopular] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/";
   const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'
  useEffect(()=>{
    const Popular = async()=>{
      const response = await fetch(`http://localhost:5000/api/movies/popular?page=1`)
      const data = await response.json();
      setPopular(data.results);

    };

    const Latest = async()=>{
      const response = await fetch(`http://localhost:5000/api/movies/latest?page=1`)
      const data = await response.json();
      setLatest(data.results);

    };

    Popular();
    Latest();
  },[])
  return (
    <div className='flex flex-wrap'>
      <h1>This is a movies page</h1>
      { latest && latest.map((movie,index)=>(
        <Link to={`/api/movies/movie/${movie.id}`}>
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        </Link>
      ))
        
      }
      </div>
  )
}

export default Movies