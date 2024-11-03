import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Tvshows = () => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const heroPosterSize = "w1280";
    const moviePosterSize = 'w342'
    const [tvShows , setTvShows] = useState(null);
    const category = useParams();
    console.log(category)

    useEffect(() => {
      const fetchTvShows = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setTvShows(data.results);
      };
    
      const Popular = () => fetchTvShows(`http://localhost:5000/api/tv/popular?page=1`);
      const Latest = () => fetchTvShows(`http://localhost:5000/api/tv/latest?page=1`);
      const OnTheAir = () => fetchTvShows(`http://localhost:5000/api/tv/on_the_air?page=1`);
      const TopRated = () => fetchTvShows(`http://localhost:5000/api/tv/top_rated?page=1`);
      const AiringToday = () => fetchTvShows(`http://localhost:5000/api/tv/airing_today?page=1`);
    
      switch (category.category) {
        case 'latest':
          console.log("Hello");
          Latest();
          break;
        case 'popular':
          Popular();
          break;
        case 'on_the_air':
          OnTheAir();
          break;
        case 'top_rated':
          TopRated();
          break;
        case 'airing_today':
          AiringToday();
          break;
        default:
          return;
      }
    }, [category]);
   
  return (
    <div>
        <h1>This is a tv show page</h1>
        <div className='flex flex-wrap'>
        { tvShows && tvShows.map((tv,index)=>(
            <Link to={`/api/tv/${tv.id}`}>
            <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
            <img src={`${baseUrl}${moviePosterSize}${tv.poster_path}`} alt={tv.title} />
            </div>
            </Link>
        ))
            
        }
      </div>

    </div>
  )
}

export default Tvshows