import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../sections/Header';

const History = () => {
  const { userId } = useContext(UserAuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${userId}/history`);
        const data = await response.json();
        const sortedHistory = data.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));
        setHistory(sortedHistory);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  const removeFromHistory = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/history/${movieId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      setHistory((prevHistory) => prevHistory.filter(movie => movie.movieId !== movieId));
    } catch (error) {
      console.error('Error removing movie from history:', error);
    }
  };

  return (
    <div className='text-white'>
      <Header />
      <div className='pt-[5rem] padding'>
      <h1 className='titles'>Your Watch History</h1>
      <div className="max-w-[70rem] mx-auto">
        {history.map((movie) => (
          <div key={movie.movieId} className="flex flex-col sm:flex-row gap-6 items-center justify-between border-b-[1px]  px-2 py-3 border-gray-700">
            <div className='flex items-center gap-6'>
      
             <p className='text-xs sm:text-sm'>{new Date(movie.watchedAt).toLocaleDateString()}</p>
            <img className='w-[4rem] h-[4rem] object-cover' src={`https://image.tmdb.org/t/p/w185${movie.image}`} alt={movie.title} />
            <h3 className='text-sm sm:text-lg font-bold'>{movie.title}</h3>
            </div>
              
            

            <button onClick={() => removeFromHistory(movie.movieId)}>Remove</button>
          </div>
        ))}
      </div>

      </div>
     
    </div>
  );
};

export default History;