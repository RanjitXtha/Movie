import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../sections/Header';

const WatchLater = () => { 
  const { userId } = useContext(UserAuthContext);
  const [WatchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await fetch(`https://movie-api-blush.vercel.app/api/${userId}/watchlater`);
        const data = await response.json();
        const sortedWatchLater = data.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));
        setWatchLater(sortedWatchLater);
      } catch (error) {
        console.error('Error fetching WatchLater:', error);
      }
    };

    fetchWatchLater();
  }, [userId]);

  const removeFromWatchLater = async (movieId) => {
    try {
      const response = await fetch(`https://movie-api-blush.vercel.app/api/${userId}/watchlater/${movieId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      setWatchLater((prevFav) => prevFav.filter(movie => movie.movieId !== movieId));
    } catch (error) {
      console.error('Error removing movie from WatchLater:', error);
    }
  };

  return (
    <div className='text-white'>
      <Header />
      <div className='pt-[5rem] padding'>
      <h1 className='titles'>Your WatchLater</h1>
      <div className="max-w-[70rem] mx-auto">
        {WatchLater.map((movie,index) => (
          <div key={movie.movieId} className="flex flex-col sm:flex-row gap-6 items-center justify-between border-b-[1px]  px-2 py-3 border-gray-700">
            <div className='flex items-center gap-6'>
      
             <p className='text-sm sm:text-lg'>{index+1}.</p>
            <img className='w-[4rem] h-[4rem] object-cover' src={`https://image.tmdb.org/t/p/w185${movie.image}`} alt={movie.title} />
            <h3 className='text-sm sm:text-lg font-bold'>{movie.title}</h3>
            </div>
              
            

            <button onClick={() => removeFromWatchLater(movie.movieId)}>Remove</button>
          </div>
        ))}
      </div>

      </div>
     
    </div>
  );
};

export default WatchLater;
