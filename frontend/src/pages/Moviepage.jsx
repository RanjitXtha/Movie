import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState ,  useContext } from 'react';
import Header from '../sections/Header';
import Ratingbar from '../Components/Ratingbar';
import MovieTVSection from '../sections/MovieTVsection';
import { useRef } from 'react';
import Profile from '../assets/profile.png'
import { UserAuthContext } from '../Context/userAuth';

const Moviepage = () => {
  const { userId } = useContext(UserAuthContext);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast , setCast]= useState([]);
  const [recommendation , setRecommendation]= useState([]);

    const {id:movieId} = useParams();

    const baseUrl = "https://image.tmdb.org/t/p/";
    const moviePosterSize = 'w342';
    const heroPosterSize = 'original'
    const scrollContainerRef = useRef(null);

    const scroll = (scrollOffset) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += scrollOffset;
      }
    }

    const addToFavourite = async()=>{
      try{
        const movieData = {
          movieId:movie.id , 
          title:movie.title , 
          image:movie.poster_path,
          userId: userId,
        };
        
        const response = await fetch(`http://localhost:5000/api/favourites`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(movieData)
          });

          const data = await response.json();
          console.log(data);
      }catch(err){
        console.log(err);
      }
    }

    const addToWatchLater = async()=>{
      const movieData = {
        movieId:movie.id , 
        title:movie.title , 
        image:movie.poster_path,
        userId: userId,
      }
      try{
      const response = await fetch(`http://localhost:5000/api/watchlater`,{
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData), 
        });

        const data = await response.json();
        console.log(data);
      }catch(err){
        console.log(err);
      }
      
    }

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
          setCast(data.castData.cast);
          setRecommendation(data.similarMovies.results.slice(0,12));
        }
        fetchMovieDetails();
       getMovie();
    },[movieId])
 
    if(!movie) return <div className='bg-black h-screen w-screen  text-white'>Loading...</div>;

  return (
    <div className='bg-black text-white'>
       <Header />
  
    <div className='padding max-container' >
      { trailer ?
          <iframe
              className='w-full  pt-[4rem] h-[50vw] min-h-[30rem] max-h-[40rem] 2xl:max-h-[50rem]'
                  src={`https://www.youtube.com/embed/${trailer}`} // Replace watch?v= with embed/
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
          ></iframe>:
          <div className='w-full h-[40rem] pt-[4rem]'>
            <img src={`${baseUrl}${heroPosterSize}${movie.backdrop_path}`} alt={movie.id} />
          </div>
      }

      <div className='flex flex-col items-center lg:flex-row gap-6 mt-[3rem]'>
        <div className='max-w-[15rem] lg:w-[20rem] h-auto'>
          <img className='object-contain' src={`${baseUrl}${moviePosterSize}${movie.poster_path}`} alt={movie.title} />
        </div>

        <div className='flex w-full flex-col gap-3'>
         <span>
          <button onClick={addToFavourite} className='mr-4 bg-cyan-400 px-3 py-2 rounded-xl'>Add to Favourite </button>
          <button onClick={addToWatchLater} className='mr-4 bg-cyan-400 px-3 py-2 rounded-xl'>Watch Later </button>
           
         </span>
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
          <div>
            <p>Release Date: {movie.release_date}</p>
            <p>Duration: {movie.runtime} min</p>
            <p className='flex gap-2'>Country: {movie.origin_country.map((country,index)=><p key={index}>{country}</p>)}</p>
            <p className='flex gap-1 flex-wrap'>
              Production:
              {
                movie.production_companies.map((company,index)=>(
                  <p key={company.id}>{company.name},</p>
                ))
              }
            </p>
          </div>
        </div>
     
      </div>
    </div>
    <div className='padding my-[5rem] relative max-container'>
  <h1 className='titles'>Cast</h1>
  <div className=' flex gap-4 overflow-x-scroll hide-scrollbar scroll-smooth' ref={scrollContainerRef}>
    {cast.map((actor, index) => (
      <div key={index} className='flex-shrink-0 h-auto'>
        <div className='max-w-[13rem]'>
          <img className='h-full w-full' src={actor.profile_path?`${baseUrl}${moviePosterSize}${actor.profile_path}`:Profile} alt="" />
        </div>
        <div >
          <p key={actor.id}>{actor.name}</p>
          <p className='w-[200px] text-wrap'>{actor.character}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Left Scroll Button */}
  <button
    className='absolute top-0 left-0 h-full px-2 bg-black bg-opacity-50 text-white'
    onClick={() => scroll(-200)}
  >
    &lt;
  </button>

  {/* Right Scroll Button */}
  <button
    className='absolute top-0 right-0 h-full px-2 bg-black bg-opacity-50 text-white'
    onClick={() => scroll(200)}
  >
    &gt;
  </button>
</div>

    <MovieTVSection title={"Recommendation"} type={"movie"} movies={recommendation}/>
    </div>
    
  )
}

export default Moviepage