import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../sections/Header';
import Ratingbar from '../Components/Ratingbar';
import MovieTVSection from '../sections/MovieTVsection';

const Moviepage = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast , setCast]= useState([]);
  const [recommendation , setRecommendation]= useState([]);

    const {id:movieId} = useParams();
    //console.log(movieId);

    const baseUrl = "https://image.tmdb.org/t/p/";
    const moviePosterSize = 'w342';

    useEffect(()=>{
        const getMovie = async()=>{
            const response = await fetch(`http://localhost:5000/api/movies/movie/${movieId}`);
            const data = await response.json();
            const findTrailer = data.trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            setMovie(data.details);
            setTrailer(findTrailer.key);
        }

        const fetchMovieDetails = async () => {
           const response = await fetch(`http://localhost:5000/api/movies/info/${movieId}`);
       
          const data = await response.json();
          console.log(data);
          setCast(data.castData.cast);
          setRecommendation(data.similarMovies.results.slice(0,12));
        }
        fetchMovieDetails();
       getMovie();
    },[movieId])

    if (!movie) return <div>Loading...</div>;

  return (
    <div className=' bg-black text-white'>
       <Header />
 <div  className='padding' >
     
     
      { movie &&
          <iframe
              className='w-full h-[40rem] pt-[4rem]'
                  src={`https://www.youtube.com/embed/${trailer}`} // Replace watch?v= with embed/
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
          ></iframe>
      }

      <div className='flex gap-6 mt-14'>
        <div>
          <img className='w-[342px]' src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>

        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-2xl'>{movie.title}</h1>
          <span className='flex gap-5'>
            {movie.genres.map((genre)=>(
              <p>{genre.name}</p>
            ))}
          </span>
          <div className='flex items-center gap-6'>
            Rating: {movie.vote_average.toFixed(1)} <Ratingbar score={movie.vote_average.toFixed(1)} />
          </div>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Duration: {movie.runtime} min</p>
          <p className='flex gap-2'>Country: {movie.origin_country.map((country,index)=><p key={index}>{country}</p>)}</p>
          <p className='flex gap-1'>
            Production:
            {
              movie.production_companies.map((company,index)=>(
                <p key={company.id}>{company.name},</p>
              ))
            }
          </p>

          <p className='flex gap-1'>
            Cast:
            {
              cast.slice(0,4).map((company,index)=>(
                <p key={company.id}>{company.name},</p>
              ))
            }
          </p>
        </div>
     
      </div>
    </div>
    <MovieTVSection title={"Recommendation"} type={"movie"} movies={recommendation}/>
    </div>
    
  )
}

export default Moviepage