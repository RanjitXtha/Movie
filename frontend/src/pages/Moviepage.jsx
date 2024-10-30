import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Moviepage = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
    const {id:movieId} = useParams();
    //console.log(movieId);

    useEffect(()=>{
        const getMovie = async()=>{
            const response = await fetch(`http://localhost:5000/api/movies/movie/${movieId}`);
            const data = await response.json();
            console.log(data.details)
            const findTrailer = data.trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            setMovie(data.details);
            setTrailer(findTrailer.key);
            console.log(findTrailer.key)
        }
       getMovie();
    },[movieId])

    if (!movie) return <div>Loading...</div>;

  return (
     <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      { movie &&
        <div>
          <h2>Trailer</h2>
          <iframe
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${trailer}`} // Replace watch?v= with embed/
  title="Movie Trailer"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
        </div>
      }
      {/* Add additional details as needed */}
    </div>
  )
}

export default Moviepage