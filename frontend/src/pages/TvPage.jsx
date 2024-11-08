import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Profile from '../assets/profile.png';
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
    const heroPosterSize = 'original'
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
            console.log(data)
            const findTrailer =  data.trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if(findTrailer){
              setTrailer(findTrailer.key);
            }else{
              const findTrailer =  data.trailer.results.find(video => video.type === 'Teaser' && video.site === 'YouTube');;
              findTrailer && setTrailer(findTrailer.key);
             
            }
            setTv(data.details);
        }

        const fetchTVShowDetails = async () => {
          const response = await fetch(`http://localhost:5000/api/tvshows/info/${tvId}`);
           const data = await response.json();
           let combinedCast = data.castData.cast;

            if (combinedCast.length < 5) {
                combinedCast = combinedCast.concat(data.castData.crew);
            }
          setCast(combinedCast)
          setRecommendation(data.similarMovies.results.slice(0,12));
         }
        fetchTvShow();
        fetchTVShowDetails();
    },[tvId]);
    if (!tv) return <div className='bg-black h-screen w-screen text-white' >Loading...</div>;

    return (
        <div className='bg-black text-white'>
            <Header />

          <div className='padding'>
            {trailer ?
              <iframe
                className='w-full h-[40rem] pt-[4rem]'
                src={`https://www.youtube.com/embed/${trailer}`} // Replace watch?v= with embed/
                title="TV Show Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>:
              <div className='w-full h-[40rem] pt-[4rem]'>
                  <img src={`${baseUrl}${heroPosterSize}${tv.backdrop_path}`} alt={tv.id} />
              </div>
            }
            
      
            <div className='flex flex-col items-center lg:flex-row  gap-6 mt-[3rem]'>
              <div className='max-w-[15rem] lg:w-[20rem]  h-auto'>
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
                <div key={index} className='flex-shrink-0 '>
                  <div className='max-w-[13rem]'>
                    <img className='h-full w-full' src={actor.profile_path ? `${baseUrl}${moviePosterSize}${actor.profile_path}` : Profile} alt="" />
                  </div>
                  <div>
                    <p>{actor.name}</p>
                    <p className='w-[200px] text-wrap'>{actor.character}</p>
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