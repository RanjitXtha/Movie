import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../sections/Header';
import { Link } from 'react-router-dom';
import moviepic from '../assets/moviepic.png';
import MovieTvCards from '../Components/MovieTvCards';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');

  const [movies, setMovies] = useState(null);
  const [tvShows, setTvShows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://image.tmdb.org/t/p/";
  const moviePosterSize = 'w185';

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://movie-api-blush.vercel.app/api/search?query=${searchQuery}`);
        const data = await response.json();
        setMovies(data.searchResult.movieData.results);
        setTvShows(data.searchResult.tvData.results);
      } catch (error) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchData();
  }, [searchQuery]);


  return (
    <div className='bg-black text-white'>
      <Header />
      <section className='pt-[5rem] padding'>
        <h1 className='titles'>Search Results for "{searchQuery}"</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <h2 className="titles">Movies</h2>
    
        <div className='grid grid-cols-2  md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-3 justify-between'>
        
          {movies && movies.map((movie) => (
            <MovieTvCards movie={movie} type={"movie"} />
          ))}
        </div>
        {!tvShows && <div>
          <h2 className="titles mt-[5rem]">TV Shows</h2>
          <div className='grid grid-cols-2  md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-3 justify-between'>
            
            {tvShows && tvShows.map((tv) => (
              <MovieTvCards movie={tv} type={"tv"} />
            ))}
          </div>
        </div>
        }
      </section>
    </div>
  );
};

export default SearchPage;
