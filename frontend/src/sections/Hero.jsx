import React, {useState, useEffect } from 'react';


const Hero = () => {
  const baseUrl = "https://image.tmdb.org/t/p/";
  const heroPosterSize = "original";
  const moviePosterSize = 'w342';
  
  const [hero , setHero] = useState(null);
  const [activeIndex , setActiveIndex] = useState(0);

  useEffect(()=>{
    const heroMovies = async()=>{
      const response = await fetch(`https://movie-flax-ten.vercel.app/api/movies/latest`)
      const data = await response.json();
      setHero(data.results.slice(0,5));
    } 
    
    heroMovies()
  },[])

  const buttons = [
    1,2,3,4,5
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 0));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  

  return (

    <div className='max-container'>
          
    {
      hero &&
      <section className='mb-[5rem] relative py-[3rem] flex w-full items-end h-[50vw] min-h-[30rem] max-h-[40rem] 2xl:max-h-[50rem]'>
        <div className='padding flex gap-5 w-full'>
          <div className='min-w-[8rem] min-h-[13rem] w-[8rem] h-[13rem] md:w-[10rem] md:h-[15rem] lg:w-[13rem] lg:h-[18rem] z-20'>
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
            <button className='button'>
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