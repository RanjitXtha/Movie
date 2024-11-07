import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../sections/Header';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://image.tmdb.org/t/p/";
  const moviePosterSize = 'w185';

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/search?query=${searchQuery}`);
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
    <div className='bg-black'>
      <Header />
      <section className='pt-[5rem] padding'>
        <h1 className='titles'>Search Results for "{searchQuery}"</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className='flex flex-wrap gap-y-6 justify-between'>
          <h2 className="text-white">Movies</h2>
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
                  <p>{movie.release_date?.substring(0, 4)}</p>
                  <p>Rating: {movie.vote_average?.toFixed(1)}</p>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className='flex flex-wrap gap-y-6 justify-between mt-8'>
          <h2 className="text-white">TV Shows</h2>
          {tvShows && tvShows.map((tv) => (
            <Link key={tv.id} to={`/api/tvshows/tv/${tv.id}`}>
              <div className='w-full'>
                <img src={`${baseUrl}${moviePosterSize}${tv.poster_path}`} alt={tv.name} />
              </div>
              <div>
                <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {tv.name}
                </p>
                <span className='text-sm flex gap-4'>
                  <p>{tv.first_air_date?.substring(0, 4)}</p>
                  <p>Rating: {tv.vote_average?.toFixed(1)}</p>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
