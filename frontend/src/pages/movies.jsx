import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Header from '../sections/Header';

const Movies = () => {
  const [pageCategory, setCategory] = useState('');
  const [page, setPage] = useState(1); // State for current page
  const location = useLocation();
  const category = useParams();
  const searchParams = new URLSearchParams(location.search);
  const genreType = searchParams.get("genreType");
  
  const [movies, setMovies] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/";
  const moviePosterSize = 'w185';

  const fetchMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    category.category === 'genre'?setMovies(data.results.results): setMovies(data.results); 
  };

  const Popular = () => fetchMovies(`http://localhost:5000/api/movies/popular?page=${page}`);
  const Latest = () => fetchMovies(`http://localhost:5000/api/movies/latest?page=${page}`);
  const ByGenre = () => fetchMovies(`http://localhost:5000/api/movies/genre?genreType=${genreType}&page=${page}`);
  const fetchMovieGenres = async () => {
    const response = await fetch(`http://localhost:5000/api/genres/movies`);
    const data = await response.json();
    const genre = data.results.genres.find(e=>e.id === parseInt(genreType))
   setCategory(genre.name)
  }
 
  useEffect(() => {
    if(category.category === 'genre'){
      
      fetchMovieGenres();

    }else{
      setCategory(category.category.charAt(0).toUpperCase() + category.category.slice(1));
    }

    switch (category.category) {
      case 'latest':
        setPage(1)
        Latest();
        break;
      case 'popular':
        setPage(1)
        Popular();
        break;
      case 'genre':
        setPage(1)
        ByGenre();
        break;
      default:
        break;
    }
  }, [category, page, genreType]); // Trigger useEffect when page changes

  const buttons = [1, 2, 3, 4, 5];

  return (
    <div className='bg-black text-white'>
      <Header />
      <section className='pt-[5rem] padding'>
        <h1 className='titles'>{pageCategory} Movies</h1>

        <div className='flex flex-wrap gap-y-6 justify-between'>
          {movies && movies.map((movie) => (
            <Link key={movie.id} to={`/api/movies/movie/${movie.id}`}>
              <div className='w-full'>
                <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
              </div>
              <div>
                <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {movie.title}
                </p>
                <span className='text-sm flex gap-4'>
                  <p>{movie.release_date?.substring(0,4)}</p>
                  <p>Rating: {movie.vote_average?.toFixed(1)}</p>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='w-full flex justify-center gap-4'>
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => setPage(button)} // Update page state on click
            className={`w-8 h-8 flex justify-center items-center rounded-full ring-2 ${page === button ? 'bg-cyan-500' : ''}`}
          >
            {button}
          </button>
        ))}
      </section>
    </div>
  );
};

export default Movies;