import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Profile from '../assets/profile.jpg';
import MovieTVSection from '../sections/MovieTVsection';
import Header from '../sections/Header';
import Ratingbar from '../Components/Ratingbar';

const TvPage = () => {
    const {tvId} = useParams();
    const [tv, setTv] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast , setCast]= useState(null);
    const [recommendation , setRecommendation]= useState(null);
    const baseUrl = "https://image.tmdb.org/t/p/";
    const moviePosterSize = 'w342';

    const scrollContainerRef = useRef(null);

    const scroll = (scrollOffset) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += scrollOffset;
      }
    }

    useEffect(()=>{
        const fetchTvShow = async()=>{
            const response = await fetch(`http://localhost:5000/api/tvshows/tv/${tvId}`);

            const data = await response.json();
            console.log('data');
            //console.log(data)
            const findTrailer =  data.trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            
         
            console.log(findTrailer);
            //console.log(data.details)
            setTv(data.details);
            setTrailer(findTrailer.key);
            
        }

        const fetchTVShowDetails = async () => {
            const response = await fetch(`http://localhost:5000/api/tvshows/info/${tvId}`);
        
           const data = await response.json();
           //console.log(data)
           setCast(data.castData.cast);
           setRecommendation(data.similarMovies.results.slice(0,12));
         }
        fetchTvShow();
        fetchTVShowDetails();
    },[]);
    if (!tv) return <div>Loading...</div>;
    return (
        <div className='bg-black text-white'>
            <Header />

          <div className='padding'>
            {tv &&
              <iframe
                className='w-full h-[40rem] pt-[4rem]'
                src={`https://www.youtube.com/embed/${trailer}`} // Replace watch?v= with embed/
                title="TV Show Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            }
      
            <div className='flex gap-6 mt-[3rem]'>
              <div className='w-[20rem] h-auto'>
                <img className='object-contain' src={`${baseUrl}${moviePosterSize}${tv.poster_path}`} alt={tv.title} />
              </div>
      
              <div className='flex w-full flex-col gap-3'>
                <h1 className='font-bold text-2xl'>{tv.name}</h1>
                <span className='flex gap-5'>
                  {tv.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </span>
                <div className='flex items-center gap-6'>
                  Rating: {tv.vote_average.toFixed(1)} <Ratingbar score={tv.vote_average.toFixed(1)} />
                </div>
                <p>{tv.overview}</p>
                <p>Release Date: {tv.release_date}</p>
                <p>Duration: {tv.runtime} min</p>
                <p className='flex gap-2'>Country: {tv.origin_country.map((country, index) => <p key={index}>{country}</p>)}</p>
                <p className='flex gap-1'>
                  Production:
                  {tv.production_companies.map((company) => (
                    <p key={company.id}>{company.name},</p>
                  ))}
                </p>
              </div>
            </div>
          </div>
      
          <div className='padding my-[5rem] relative'>
            <h1 className='titles'>Cast</h1>
            <div className='flex gap-4 overflow-x-scroll hide-scrollbar scroll-smooth' ref={scrollContainerRef}>
              {cast && cast.map((actor, index) => (
                <div key={index} className='flex-shrink-0 h-auto'>
                  <div className='max-w-[13rem]'>
                    <img className='h-full w-full' src={actor.profile_path ? `${baseUrl}${moviePosterSize}${actor.profile_path}` : Profile} alt="" />
                  </div>
                  <div>
                    <p>{actor.name}</p>
                    <p>{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
    
            <button
              className='absolute top-0 left-0 h-full px-2 bg-black bg-opacity-50 text-white'
              onClick={() => scroll(-200)}
            >
              &lt;
            </button>
      
            
            <button
              className='absolute top-0 right-0 h-full px-2 bg-black bg-opacity-50 text-white'
              onClick={() => scroll(200)}
            >
              &gt;
            </button>
          </div>
      
          <MovieTVSection title={"Recommendation"} type={"tv"} movies={recommendation} />

        </div>
      );
}

export default TvPage