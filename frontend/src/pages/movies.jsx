import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Movies = () => {
  const location = useLocation();
  const category = useParams();


  
  const [movies , setMovies] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/";
   const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'

  const Popular = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/popular?page=1`)
    const data = await response.json();
    setMovies(data.results);

  };

  const Latest = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/latest?page=1`)
    const data = await response.json();
    setMovies(data.results);

  };

  const ByGenre = async()=>{
    const searchParams = new URLSearchParams(location.search);
    const genreType = searchParams.get("genreType");
    const page = searchParams.get("page") || 1;
    const response = await fetch(`http://localhost:5000/api/movies/genre?genreType=${genreType}&page=${page}`)
    const data = await response.json();
    console.log(data.results.results);
    setMovies(data.results.results);
  }

  useEffect(()=>{
    console.log(category.category)
 
    switch(category.category){
      case 'latest':{
        console.log("Hlelo")
        Latest();
        break;
      }
      case 'popular':{
        Popular();
        break;
      }
      case 'genre':{
        ByGenre();
        break;
      }
    }

  },[category])
  return (
    <div className='flex flex-wrap'>
      <h1>This is a movies page</h1>
      { movies && movies.map((movie,index)=>(
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