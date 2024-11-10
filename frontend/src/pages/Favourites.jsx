import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../sections/Header';
 
const Favourites = () => {
  const { userId } = useContext(UserAuthContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${userId}/favourites`);
        const data = await response.json();
        const sortedFavourites = data.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));
        setFavourites(sortedFavourites);
      } catch (error) {
        console.error('Error fetching Favourites:', error);
      }
    };

    fetchFavourites();
  }, [userId]);

  const removeFromFavourites = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/favourites/${movieId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      setFavourites((prevFav) => prevFav.filter(movie => movie.movieId !== movieId));
    } catch (error) {
      console.error('Error removing movie from favourites:', error);
    }
  };

  return (
    <div className='text-white'>
      <Header />
      <div className='pt-[5rem] padding'>
      <h1 className='titles'>Your Favourites</h1>
      <div className="max-w-[70rem] mx-auto">
        {favourites.map((movie,index) => (
          <div key={movie.movieId} className="flex gap-6 items-center justify-between border-b-[1px] px-2 py-3 border-gray-700">
            <div className='flex items-center gap-6'>
      
            <p className='text-lg'>{index+1}.</p>
            <img className='w-[4rem] h-[4rem] object-cover' src={`https://image.tmdb.org/t/p/w185${movie.image}`} alt={movie.title} />
            <h3 className='text-lg font-bold'>{movie.title}</h3>
            </div>
              
            

            <button onClick={() => removeFromFavourites(movie.movieId)}>Remove</button>
          </div>
        ))}
      </div>

      </div>
     
    </div>
  );
};

export default Favourites;
