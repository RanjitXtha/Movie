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

    useEffect(()=>{
        const Popular = async()=>{
            const response = await fetch(`http://localhost:5000/api/tv/popular?page=1`)
            const data = await response.json();
            setTvShows(data.results);
        
          };
        
          const Latest = async()=>{
            const response = await fetch(`http://localhost:5000/api/tv/latest?page=1`)
            const data = await response.json();
            setTvShows(data.results);
        
          };
          switch(category.category){
            case 'latest':{
              console.log("Hlelo")
              Latest();
              break;
            }
            case 'popular':{
              Popular();
              break;
            }
           
          }

    },[category])
   
  return (
    <div>
        <h1>This is a tv show page</h1>
        <div className='flex flex-wrap'>
        { tvShows && tvShows.map((tv,index)=>(
            <Link to={`/api/tv/movie/${tv.id}`}>
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