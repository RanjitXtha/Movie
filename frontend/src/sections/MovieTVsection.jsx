import React from 'react';
import { Link } from 'react-router-dom';
import Circle from './circle';

const MovieTVsection = ({title , type, movies}) => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "w1280";
  const moviePosterSize = 'w185'

  return (
    <section className='text-white padding mb-[5rem]'>
        <h1 className='titles'>{title}</h1>
        <div className='flex flex-wrap gap-y-6 justify-between  '>
        { movies && movies.map((movie)=>(
        <Link to={type==='movie'?`/api/movies/movie/${movie.id}`:`/api/tvshows/tv/${movie.id}`}>
        <div key={movie.id} className='w-full'>
            <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        <div>
            <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {movie.title}
            </p>
            <span className='text-sm flex gap-4'>
              <p>{type==="movie"?movie.release_date.substring(0,4):movie.first_air_date.substring(0,4)}</p>
              <p>Rating: {movie.vote_average.toFixed(1)}</p>
            </span>
            </div>
        </Link>
        ))
        
        }
        </div>
  </section>
  )
}

export default MovieTVsection