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
    const [cast , setCast]= useState([]);
    const [recommendation , setRecommendation]= useState([]);
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
            const findTrailer = data.trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            console.log(findTrailer);
            setTv(data.details);
            setTrailer(findTrailer.key);
        }

        const fetchTVShowDetails = async () => {
            const response = await fetch(`http://localhost:5000/api/tv/info/${tvId}`);
        
           const data = await response.json();
           setCast(data.castData.cast);
           setRecommendation(data.similarMovies.results.slice(0,12));
         }
        fetchTvShow();
        fetchTVShowDetails();
        console.log(cast)
        console.log(tv)
        console.log(trailer)
    },[])
  return (
    <div className='bg-black text-white'>
    <Header />
    
  </div>
  )
}

export default TvPage