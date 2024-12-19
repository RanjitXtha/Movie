
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import PageButtons from '../Components/PageButtons';
import Header from '../sections/Header';
import MovieTvCards from '../Components/MovieTvCards';

const Movies = () => {
  const [pageCategory, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const location = useLocation();
  const category = useParams();
  const searchParams = new URLSearchParams(location.search);
  const genreType = searchParams.get("genreType");

  const [movies, setMovies] = useState(null);
  const baseUrl = "https://image.tmdb.org/t/p/";
  const moviePosterSize = 'w342';

  const fetchMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setMovies(data.results); 
  };

  const Popular = () => fetchMovies(`movie-api-blush.vercel.app/api/movies/popular?page=${page}`);
  const Latest = () => fetchMovies(`movie-api-blush.vercel.app/api/movies/latest?page=${page}`);
  const ByGenre = () => fetchMovies(`movie-api-blush.vercel.app/api/movies/genre?genreType=${genreType}&page=${page}`);

  const fetchMovieGenres = async () => {
    const response = await fetch(`movie-api-blush.vercel.app/api/genres/movies`);
    const data = await response.json();
    const genre = data.results.genres.find(e => e.id === parseInt(genreType));
    setCategory(genre.name);
  };

  useEffect(() => {
    setPage(1);
  }, [category, genreType]);

  useEffect(() => {
    if (category.category === 'genre') {
      fetchMovieGenres();
    } else {
      setCategory(category.category.charAt(0).toUpperCase() + category.category.slice(1));
    }

    switch (category.category) {
      case 'latest':
        Latest();
        break;
      case 'popular':
        Popular();
        break;
      case 'genre':
        ByGenre();
        break;
      default:
        break;
    }
  }, [category, page, genreType]);

  if(!movies) return <div className='bg-black h-screen w-screen  text-white'>Loading...</div>;

  return (
    <div className='bg-black text-white'>
      <Header />
      <section className='pt-[5rem] padding max-container'>
        <PageButtons setPage={setPage} totalPages={totalPages} currentPage={page} />
        <h1 className='titles'>{pageCategory} Movies</h1>
        <div className='grid grid-cols-2  md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-3 justify-between'>
          {movies && movies.map((movie) => (
            <MovieTvCards movie={movie} type={"movie"} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Movies;
