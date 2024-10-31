import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {

  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'

  const [activeIndex , setActiveIndex] = useState(0);

  const [hero , setHero] = useState(null);
  const [trending , setTrending] = useState(null);
  const [latestMovies,setLatestMovies] = useState(null);
  const [latestTvShows , setLatestTvShows] = useState(null)
  const [movieGenres , setMovieGenres] = useState(null)
  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/popular`)
    const data = await response.json();
    setTrending(data.results.slice(0,11));
    //console.log(data.results);
  } 

  const LatestMovies = async()=>{
    const response = await fetch(`http://localhost:5000/api/movies/latest`)
    const data = await response.json();
    setHero(data.results.slice(0,5));
    setLatestMovies(data.results.slice(0,11));
    //console.log(data.latest)
    
  } 

  const fetchLatestTvShows = async () => {
      const response = await fetch(`http://localhost:5000/api/tvshows/latest`);
      const data = await response.json();
      //console.log('Results:', data);
      setLatestTvShows(data.results.slice(0,11));
  }

  const fetchMovieGenres = async () => {
    const response = await fetch(`http://localhost:5000/api/genres/movies`);
    const data = await response.json();
    //console.log( data.results.genres);
    setMovieGenres(data.results.genres);
}

  PopularMovies();
  LatestMovies();
  fetchLatestTvShows();

  fetchMovieGenres();
},[])

const buttons = [
  1,2,3,4,5
]
  return (
    <div>
      <header className='w-full h-12 fixed z-50 px-6 grid grid-cols-[14%_1fr_16%] gap-6 items-center bg-cyan-200 '>
        <div className='w-14'>NEPFLIX</div>

        <div className='flex justify-center gap-10 '>
          <nav><Link to="/">Home</Link></nav>
          <nav className='relative'>
            <Link to="">Genre</Link>
            <div className='absolute w-56 bg-cyan-500  top-[5rem] left-0 z-[200]'>
              {
                    movieGenres && movieGenres.map((genre)=>(
                      <Link to={`/api/movies/genre?genreType=${genre.id}&page=1`}>
                        <p>{genre.name}</p>
                      </Link>
                    ))
                  }
            </div>
          </nav>
          <nav className='relative'><Link to="">Movies</Link>
          <div className='absolute w-56 bg-cyan-500  top-[5rem] left-0 z-[200]'>
                <nav><Link to="api/movies/latest">Latest</Link></nav>
                <nav><Link to="api/movies/popular">Popular</Link></nav>
                <nav><Link to="">Upcoming</Link></nav>
            </div>
          </nav>
          <nav><Link to="/api/tvshows">TV Shows</Link></nav>
        </div>

        <div>
          <span>
            <input type="text" placeholder='Search' />
          </span>
        </div>

      </header>
    {
      hero &&
      <section className='relative flex items-end w-full h-[calc(100vh-3rem)]'>
        <div className='z-20 text-white'>
          <p className='text-3xl'>{hero[activeIndex].title}</p>
          <span><p>{hero[activeIndex].vote_average}</p></span>
          <p>{hero[activeIndex].overview}</p>
          <button>
            Watch Now
          </button>
        </div>
      
        <img  src={`${baseUrl}${heroPosterSize}${hero[activeIndex].backdrop_path}`} //poster_path
        alt={`${hero[activeIndex].title} poster`} className='z-[-1] absolute top-0 w-full' />

        <div className='z-50 absolute h-10 w-52 bg-cyan-600 bottom-0 left-[50%]'>
          {
            buttons.map((button,index)=>(
              <button onClick={()=>{setActiveIndex(index); console.log(activeIndex)}

              } className={`${activeIndex===index?'bg-white':''} w-3 h-3 ring-2 mr-3 ring-white rounded-full`} key={index}></button>

            ))
          }
        </div>
    </section>
    
    }


    <section>
      <h1>Trending</h1>
      <div className='flex flex-wrap'>
      { trending && trending.map((movie,index)=>(
        <Link to={`/api/movies/movie/${movie.id}`}>
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        </Link>
      ))
        
      }
      </div>
    </section>


    <section>
      <h1>Latest</h1>
      <div className='flex flex-wrap'>
      { latestMovies && latestMovies.map((movie,index)=>(
        <Link to={`/api/movies/movie/${movie.id}`}>
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        </Link>
      ))
        
      }
      </div>
    </section>

    <section>
      <h1>Latest</h1>
      <div className='flex flex-wrap'>
      { latestTvShows && latestTvShows.map((movie,index)=>(
        <Link to={`/api/movies/movie/${movie.id}`}>
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        </Link>
      ))
        
      }
      </div>
    </section>
      

    </div>
   
  )
}

export default Homepage