import React, { useEffect , useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Components/Search';
import Profile from '../Components/Profile';
import { GiHamburgerMenu } from "react-icons/gi";
import { jwtDecode } from 'jwt-decode';

const Header = () => {
    const [movieGenres , setMovieGenres] = useState(null);
    const [tvShowGenres , setTvShowGenres] = useState(null);
    const [menu , setMenu] = useState(false);
    const [username , setUsername] = useState('');
    const menuRef = useRef();

    const handleVisibility = (e)=>{
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setMenu(false);
      }
    }

    useEffect(()=>{
      document.addEventListener("mousedown",handleVisibility);
      return ()=>{
        document.removeEventListener("mousedown",handleVisibility);
      }
    },[]);
    

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
          const decodedToken = jwtDecode(token);
        
          const { username } = decodedToken;
          setUsername(username);
        }

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
    <header className='w-full h-12  max-container fixed left-0 right-0 padding z-50 py-[1rem] flex flex-row md:grid md:grid-cols-[15%_1fr_21%] gap-6 justify-between md:justify-center text-white font-medium '>
      <button onClick={()=>setMenu(!menu)} className='block md:hidden text-xl relative'><GiHamburgerMenu />
      </button>

     

      <div ref={menuRef} className={`overflow-y-scroll hide-scrollbar ${menu?'w-[17rem]':'w-0 hidden'} bg-black p-4 gap-3 flex flex-col left-0 top-0 h-screen absolute`}>
        <nav><button onClick={()=>setMenu(!menu)}>Close Menu</button></nav>
        <nav className='border-b-[1px] pb-2 border-gray-600'><Link to="/">Home</Link></nav>
        
        <nav className='group border-b-[1px] pb-2 border-gray-600'>
            <Link>Genre</Link>
            <div className='mt-2 hidden text-sm  group-hover:grid grid-cols-2 gap-x-6 gap-y-2  transition duration-500 ease-in-out '>
              {
                movieGenres && movieGenres.map((genre)=>(
                  <Link key={genre.id} to={`/api/movies/genre?genreType=${genre.id}&page=1`}>
                    <p>{genre.name}</p>
                  </Link>
                ))
              }
            </div>
          </nav>
          <nav className='group border-b-[1px] pb-2 border-gray-600'>
            <Link to="">Movies</Link>
            <div className='hidden text-sm mt-2 group-hover:grid gap-2'>
              <nav><Link to="/api/movies/latest">Latest</Link></nav>
              <nav><Link to="/api/movies/popular">Popular</Link></nav>
              <nav><Link to="">Upcoming</Link></nav>
            </div>
          </nav>
            <nav className='group border-b-[1px] pb-2 border-gray-600'>
              <Link to=""> TV Shows</Link>  
              <div className='hidden text-sm mt-2 group-hover:grid gap-2'>
                <nav><Link to="/api/tvshows/trending">Trending</Link></nav>
                <nav><Link to="/api/tvshows/airing_today">Airing Today</Link></nav>
                <nav><Link to="/api/tvshows/on_the_air">On The Air</Link></nav>
                <nav><Link to="/api/tvshows/popular">Popular</Link></nav>
                <nav><Link to="/api/tvshows/top_rated">Top Rated</Link></nav>
              </div>
            </nav>
      </div>

        <div className='w-14'>NEPFLIX</div>

        <div className='header-navs hidden md:flex justify-center gap-10 '>
          <nav><Link to="/">Home</Link></nav>

          <nav className='relative group'>
            <Link >Genre</Link>
            <div className='hidden absolute p-4 text-md  group-hover:grid grid-cols-[repeat(3,9rem)] gap-4 bg-cyan-500  top-[1.7rem] left-0 z-[200] transition duration-500 ease-in-out '>
              {
                movieGenres && movieGenres.map((genre)=>(
                  <Link key={genre.id} to={`/api/movies/genre?genreType=${genre.id}&page=1`}>
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
        
        <div className='flex justify-end gap-6 '>
          <Search />
          {
            username?
            <Profile username={username} />
            :<a href='/login'>Login</a>
          }
          
        </div>

      </header>
  )
}

export default Header