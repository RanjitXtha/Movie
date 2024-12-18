import React, { useEffect , useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Components/Search';
import Profile from '../Components/Profile';
import { GiHamburgerMenu } from "react-icons/gi";
import { UserAuthContext } from '../Context/userAuth';
import { useContext } from 'react';

const Header = () => {
  const { username } = useContext(UserAuthContext);
    const [movieGenres , setMovieGenres] = useState(null);
    const [menu , setMenu] = useState(false);
    const [headerbg , setHeaderbg] = useState(false);
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

    const handleHeaderBg=()=>{
      if(window.scrollY>100){
        setHeaderbg(true);
      }else{
        setHeaderbg(false)
      }
    }

    useEffect(()=>{
      document.addEventListener("scroll",handleHeaderBg)

      return ()=>{
        document.removeEventListener("scroll",handleHeaderBg);
      }
    },[])
    

    useEffect(()=>{

        const fetchMovieGenres = async () => {
            const response = await fetch(`https://movie-api-blush.vercel.app/api/genres/movies`);
            const data = await response.json();
            setMovieGenres(data.results.genres);
        }
        fetchMovieGenres();
    },[])


  
  
  return (
    <header className={`${headerbg?'bg-black':'bg-transparent'} bg-opacity-85 w-full h-14  max-container fixed left-0 right-0 padding z-50 py-[1rem] flex flex-row md:grid md:grid-cols-[15%_1fr_21%] gap-6 justify-between md:justify-center text-white font-medium `}>
      <button onClick={()=>setMenu(!menu)} className='block md:hidden text-xl relative'><GiHamburgerMenu />
      </button>

     

      <div ref={menuRef} className={`overflow-y-scroll hide-scrollbar ${menu?'w-[17rem]':'w-0 hidden'} bg-black p-4 gap-3 flex flex-col left-0 top-0 h-screen absolute`}>
        <nav><button className='button' onClick={()=>setMenu(!menu)}>Close Menu</button></nav>
        <nav className='z-[200] border-b-[1px] pb-2 border-gray-600'><Link to="/">Home</Link></nav>
        
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

        <a className='w-14 font-extrabold text-lg' href="/">NEPFLIX</a>

        <div className='header-navs hidden md:flex justify-center gap-10 '>
          <nav><Link to="/">Home</Link></nav>
 
          <nav className='relative group'>
            <Link >Genre</Link>
            <div className='hidden absolute p-4 text-md  group-hover:grid grid-cols-[repeat(3,9rem)] gap-4 bg-blue-500  top-[1.7rem] left-0 z-[200] transition duration-500 ease-in-out '>
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
            <div className='hidden group-hover:block p-4 absolute w-56 bg-blue-500  top-[1.7rem] left-0 z-[200]'>
              <nav><Link to="/api/movies/latest">Latest</Link></nav>
              <nav><Link to="/api/movies/popular">Popular</Link></nav>
              <nav><Link to="">Upcoming</Link></nav>
            </div>
          </nav>
            <nav className='relative group'>
              <Link to=""> TV Shows</Link>  
              <div className='hidden group-hover:block absolute p-4 text-md bg-blue-500 w-[10rem]  top-[1.7rem] left-0 z-[200]'>
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
            :<a href='/login' className='bg-blue-500 h-8 py-1 px-4 rounded-3xl'>Login</a>
          }
          
        </div>

      </header>
  )
}

export default Header