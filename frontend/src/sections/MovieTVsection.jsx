import React from 'react';
import { Link } from 'react-router-dom';

const MovieTVsection = ({title , movies}) => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'

  return (
    <section className='text-white px-[3rem]'>
        <h1 className='titles'>{title}</h1>
        <div className='flex overflow-x-scroll gap-3 hide-scrollbar'>
        { movies && movies.map((movie)=>(
        <Link to={`/api/movies/movie/${movie.id}`}>
        <div key={movie.id} className='w-52 h-64 flex-shrink-0 bg-slate-500'>
            <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        </Link>
        ))
        
        }
        </div>
  </section>
  )
}

export default MovieTVsection