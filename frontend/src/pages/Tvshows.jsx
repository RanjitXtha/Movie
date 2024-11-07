import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PageButtons from '../Components/PageButtons';
import Header from '../sections/Header';

const Tvshows = () => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const moviePosterSize = 'w185'
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
        default:
          return;
      }
    }, [category , page]);
   
    useEffect(()=>{
      setPage(1);
    },[category])

  return (
    <div className='bg-black text-white'>
    <Header />
    <section className='pt-[5rem] padding'>
      <PageButtons setPage={setPage} totalPages={totalPages} currentPage={page} />
      <h1 className='titles'>{category.category} Movies</h1>

      <div className='flex flex-wrap gap-y-6 justify-between'>
        {tvShows && tvShows.map((tv) => (
          <Link key={tv.id} to={`/api/tvshows/tv/${tv.id}`}>
            <div className='w-full'>
              <img src={`${baseUrl}${moviePosterSize}${tv.poster_path}`} alt={tv.title} />
            </div>
            <div>
              <p className="font-bold w-[185px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {tv.name}
              </p>
              <span className='text-sm flex gap-4'>
                <p>{tv.first_air_date?.substring(0,4)}</p>
                <p>Rating: {tv.vote_average?.toFixed(1)}</p>
              </span>
            </div>
          </Link>
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