import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserAuthContext } from '../Context/userAuth';
import { useContext } from 'react';


const MovieTvCards = ({movie,type}) => {
  const { userId } = useContext(UserAuthContext);
    const baseUrl = "https://image.tmdb.org/t/p/";
    const heroPosterSize = "w1280";
    const moviePosterSize = 'w342'

    const addToHistory = async()=>{
      console.log('runnin')
      try{
        const movieData = {
          movieId:movie.id , 
          title:movie.title || movie.name , 
          image:movie.poster_path,
          userId: userId,
        }

        const response = await fetch(`http://localhost:5000/api/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData), // Convert the object to a JSON string
        });
        const data = await response.json();
        console.log(data);
      }catch(err){
        console.log(err)
      }
    }

    const addToFavourite = ()=>{
      
    }

    const addToWatchLater = ()=>{
      
    }

  return (
    <Link onClick={addToHistory} to={type === 'movie'?`/api/movies/movie/${movie.id}`:`/api/tvshows/tv/${movie.id}`}>
        <div key={movie.id} className='w-full'>
            <img src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>
        <div>
            <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {movie.title}
            </p>
            <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {movie.name}
            </p>
            <span className='text-sm flex gap-4'>
              <p>{type==="movie"?movie.release_date.substring(0,4):movie.first_air_date.substring(0,4)}</p>
              <p>Rating: {movie.vote_average.toFixed(1)}</p>
            </span>
            </div>
        </Link>
  )
}

export default MovieTvCards