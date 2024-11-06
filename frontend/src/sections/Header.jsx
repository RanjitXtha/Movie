import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

const Header = () => {
    const [movieGenres , setMovieGenres] = useState(null);
    const [searchbar , setSearchBar]=  useState(false);
    const [tvShowGenres , setTvShowGenres] = useState(null);

    useEffect(()=>{
        const fetchMovieGenres = async () => {
            const response = await fetch(`http://localhost:5000/api/genres/movies`);
            const data = await response.json();
            setMovieGenres(data.results.genres);
        }

        const fetchTvShowGenres = async () => {
          const response = await fetch(`http://localhost:5000/api/genres/tv`);
          const data = await response.json();
          setTvShowGenres(data.results.genres);
      }

        fetchMovieGenres();
        fetchTvShowGenres();
    },[])


  
  
  return (
    <header className='w-full h-12 fixed z-50 padding py-[1rem] grid grid-cols-[15%_1fr_21%] gap-6 items-center text-white font-medium '>
        <div className='w-14'>NEPFLIX</div>

        <div className='header-navs flex justify-center gap-10 '>
          <nav><Link to="/">Home</Link></nav>

          <nav className='relative group'>
            <Link to="">Genre</Link>
            <div className='hidden absolute p-4 text-md  group-hover:grid grid-cols-[repeat(3,9rem)] gap-4 bg-cyan-500  top-[1.7rem] left-0 z-[200] transition duration-500 ease-in-out '>
              {
                movieGenres && movieGenres.map((genre)=>(
                  <Link to={`/api/movies/genre?genreType=${genre.id}&page=1`}>
                    <p>{genre.name}</p>
                  </Link>
                ))
              }
            </div>
          </nav>

          <nav className='relative group'>
            <Link to="">Movies</Link>
            <div className='hidden group-hover:block p-4 absolute w-56 bg-cyan-500  top-[1.7rem] left-0 z-[200]'>
              <nav><Link to="/api/movies/latest">Latest</Link></nav>
              <nav><Link to="/api/movies/popular">Popular</Link></nav>
              <nav><Link to="">Upcoming</Link></nav>
            </div>
          </nav>
            <nav className='relative group'>
              <Link to="/api/tvshows"> TV Shows</Link>  
              <div className='hidden group-hover:block absolute p-4 text-md bg-cyan-500 w-[10rem]  top-[1.7rem] left-0 z-[200]'>
                <nav><Link to="/api/tvshows/airing_today">Airing Today</Link></nav>
                <nav><Link to="/api/tvshows/on_the_air">On The Air</Link></nav>
                <nav><Link to="/api/tvshows/popular">Popular</Link></nav>
                <nav><Link to="/api/tvshows/top_rated">Top Rated</Link></nav>
              </div>
            </nav>
        </div>

        <div>
          <span className='flex justify-end'>
                  
          <input type="text" placeholder='Search' className={`${!searchbar?'w-0':'w-full'} 
            placeholder-white px-2 focus:outline-none transition-all bg-transparent `} />
            <button onClick={()=>setSearchBar(!searchbar)} className='text-xl'><IoSearch /></button>
          </span>
        </div>

      </header>
  )
}

export default Header