import React, {useState, useEffect } from 'react';


const Hero = () => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "original";
  const moviePosterSize = 'w342';
  
  const [hero , setHero] = useState(null);
  const [activeIndex , setActiveIndex] = useState(0);

  useEffect(()=>{
    const heroMovies = async()=>{
      const response = await fetch(`http://localhost:5000/api/movies/latest`)
      const data = await response.json();
      setHero(data.results.slice(0,5));
    } 
    heroMovies()
  },[])

  const buttons = [
    1,2,3,4,5
  ]

  return (

    <div>
          
    {
      hero &&
      <section className='mb-[5rem] relative py-[3rem] flex items-end w-full h-[calc(100vh-3rem)]'>
        <div className='padding flex gap-5 w-full'>
          <div className='w-[13rem] h-[18rem] z-20'>
              <img className='object-fill' src={`${baseUrl}${moviePosterSize}${hero[activeIndex].poster_path}`} alt={hero[activeIndex].title} />
          </div>

          <div className='z-20 flex flex-col gap-4 items-start text-white w-[30rem]'>
            <p className='text-3xl font-bold'>{hero[activeIndex].title}</p>
            <p>Rating: {hero[activeIndex].vote_average.toFixed(1)}</p>
            <p 
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            className='text-wrap overflow-hidden truncate text-ellipsis w-full whitespace-pre-line max-h-[4.5em]'>{hero[activeIndex].overview}</p>
            <button className='ring-2 py-2 px-3 rounded-3xl'>
              Watch Now
            </button>
          </div>
          
          
        </div>
        
      
        <img  src={`${baseUrl}${heroPosterSize}${hero[activeIndex].backdrop_path}`} //poster_path
        alt={`${hero[activeIndex].title} poster`} className='z-0 lur-[1px] opacity-60 absolute top-0 w-full' />

        <div className='z-10 flex justify-center w-full absolute h-10 bottom-0'>
          {
            buttons.map((button,index)=>(
              <button onClick={()=>{setActiveIndex(index); console.log(activeIndex)}

              } className={`${activeIndex===index?'bg-white':''} w-3 h-3 ring-2 mr-3 ring-white rounded-full`} key={index}></button>

            ))
          }
        </div>
    </section>
    
    }
    </div>
  )
}

export default Hero