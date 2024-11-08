import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Components/Search'

const Header = () => {
    const [movieGenres , setMovieGenres] = useState(null);
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
    <header className=' w-full h-12 fixed z-50 padding py-[1rem] flex flex-row md:grid md:grid-cols-[15%_1fr_21%] gap-6 justify-between md:justify-center text-white font-medium '>
        <div className='w-14'>NEPFLIX</div>

        <div className='header-navs hidden md:flex justify-center gap-10 '>
          <nav><Link to="/">Home</Link></nav>

          <nav className='relative group'>
            <Link >Genre</Link>
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
              <Link to=""> TV Shows</Link>  
              <div className='hidden group-hover:block absolute p-4 text-md bg-cyan-500 w-[10rem]  top-[1.7rem] left-0 z-[200]'>
                <nav><Link to="/api/tvshows/trending">Trending</Link></nav>
                <nav><Link to="/api/tvshows/airing_today">Airing Today</Link></nav>
                <nav><Link to="/api/tvshows/on_the_air">On The Air</Link></nav>
                <nav><Link to="/api/tvshows/popular">Popular</Link></nav>
                <nav><Link to="/api/tvshows/top_rated">Top Rated</Link></nav>
              </div>
            </nav>
        </div>
        
        <Search />
        

      </header>
  )
}

export default Header