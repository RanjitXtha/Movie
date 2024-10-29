import React, { useEffect } from 'react';
import { useState } from 'react';

const Homepage = () => {

  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "w1280";
  const moviePosterSize = 'w342'

  const [activeIndex , setActiveIndex] = useState(0);

  const [hero , setHero] = useState(null);
  const [trending , setTrending] = useState(null);
  const [latestMovies,setLatestMovies] = useState(null);
  const [latestTvShows , setLatestTvShows] = useState(null)
  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/popular')
    const data = await response.json();
    setTrending(data.popular.slice(0,11));
    //console.log(data.popular);
  } 

  const LatestMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/latest')
    const data = await response.json();
    setHero(data.latest.splice(0,5));
    setLatestMovies(data.latest.slice(0,11));
    //console.log(data.latest)
    
  } 

  const fetchLatestTvShows = async () => {
      const response = await fetch('http://localhost:5000/api/tvshows/latest');
      const data = await response.json();
      console.log('Results:', data);
      setLatestTvShows(data.latest.slice(0,11));
  }

  PopularMovies();
  LatestMovies();
  fetchLatestTvShows();
},[])

const buttons = [
  1,2,3,4,5
]
  return (
    <div>
      <header className='w-full h-12 fixed z-50 px-6 grid grid-cols-[14%_1fr_16%] gap-6 items-center bg-cyan-200 '>
        <div className='w-14'>NEPFLIX</div>

        <div className='flex justify-center gap-10 '>
          <nav>Home</nav>
          <nav>Genre</nav>
          <nav>Movies</nav>
          <nav>TV Shows</nav>
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
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} />
        </div>
      ))
        
      }
      </div>
    </section>


    <section>
      <h1>Latest</h1>
      <div className='flex flex-wrap'>
      { latestMovies && latestMovies.map((movie,index)=>(
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} />
        </div>
      ))
        
      }
      </div>
    </section>

    <section>
      <h1>Latest</h1>
      <div className='flex flex-wrap'>
      { latestTvShows && latestTvShows.map((movie,index)=>(
        <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
          <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} />
        </div>
      ))
        
      }
      </div>
    </section>
      

    </div>
   
  )
}

export default Homepage