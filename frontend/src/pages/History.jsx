import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const History = () => {
  const { userId } = useParams(); // Assume userId is passed as a route param
  const [history, setHistory] = useState([]);

  // Fetch history data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${userId}/history`);
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  // Remove movie from history
  const removeFromHistory = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/history/${movieId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      setHistory(data.recentHistory); // Update history after deletion
    } catch (error) {
      console.error('Error removing movie from history:', error);
    }
  };

  return (
    <div>
      <h1>Your Watch History</h1>
      <div className="history-list">
        {history.map((movie) => (
          <div key={movie.movieId} className="history-item">
            <img src={`https://image.tmdb.org/t/p/w185${movie.image}`} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <p>Watched At: {new Date(movie.watchedAt).toLocaleDateString()}</p>
              <button onClick={() => removeFromHistory(movie.movieId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
