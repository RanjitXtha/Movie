import React from 'react';
import MovieTvCards from '../Components/MovieTvCards';

const MovieTVsection = ({title , type, movies}) => {


  return (
    <section className='text-white max-container padding mb-[5rem]'>
        <h1 className='titles'>{title}</h1>
        <div className='grid grid-cols-2  md:grid-cols-4 xl:grid-cols-6 gap-y-6 gap-x-3 justify-between  '>
        { movies && movies.map((movie)=>(
          <MovieTvCards movie={movie} type={type} />
        ))
        
        }
        </div>
  </section>
  )
}

export default MovieTVsection