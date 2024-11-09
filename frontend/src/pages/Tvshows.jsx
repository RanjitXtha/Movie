import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PageButtons from '../Components/PageButtons';
import Header from '../sections/Header';
import MovieTvCards from '../Components/MovieTvCards';


const Tvshows = () => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const moviePosterSize = 'w342'
    const [tvShows , setTvShows] = useState(null);
    const category = useParams();
    const [pageCategory, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(null);

    useEffect(() => {
      console.log(page)
      const fetchTvShows = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setTvShows(data.results);
        setTotalPages(data.total_pages)
      };
    
      const Popular = () => fetchTvShows(`http://localhost:5000/api/tvshows/popular?page=${page}`);
      const Trending = () => fetchTvShows(`http://localhost:5000/api/tvshows/trending?page=${page}`);
      const Latest = () => fetchTvShows(`http://localhost:5000/api/tvshows/latest?page=${page}`);
      const OnTheAir = () => fetchTvShows(`http://localhost:5000/api/tvshows/on_the_air?page=${page}`);
      const TopRated = () => fetchTvShows(`http://localhost:5000/api/tvshows/top_rated?page=${page}`);
      const AiringToday = () => fetchTvShows(`http://localhost:5000/api/tvshows/airing_today?page=${page}`);
    
      switch (category.category) {
        case 'latest':
          Latest();
          break;
        case 'popular':
          Popular();
          break;
        case 'on_the_air':
          OnTheAir();
          break;
        case 'top_rated':
          TopRated();
          break;
        case 'airing_today':
          AiringToday();
          break;
        case 'trending':
          Trending();
          break;
        default:
          return;
      }
    }, [category , page]);
   
    useEffect(()=>{
      setPage(1);
    },[category]);

    if(!tvShows) return <div className='bg-black h-screen w-screen text-white'>Loading...</div>;

  return (
    <div className='bg-black text-white'>
    <Header />
    <section className='pt-[5rem] padding'>
      <PageButtons setPage={setPage} totalPages={totalPages} currentPage={page} />
      <h1 className='titles'>{category.category} Movies</h1>

      <div className='grid grid-cols-2  md:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-3 justify-between'>
        {tvShows && tvShows.map((tv) => (
          <MovieTvCards movie={tv} type={"tv"} />
        ))}
      </div>
    </section>
  </div>
    
  )
}


/* <div>
        <h1>This is a tv show page</h1>
        <div className='flex flex-wrap'>
        { tvShows && tvShows.map((tv,index)=>(
            <Link to={`/api/tv/${tv.id}`}>
            <div className='w-52 h-64 flex-shrink-0 bg-slate-500'>
            <img src={`${baseUrl}${moviePosterSize}${tv.poster_path}`} alt={tv.title} />
            </div>
            </Link>
        ))
            
        }
      </div>

    </div>*/

export default Tvshows