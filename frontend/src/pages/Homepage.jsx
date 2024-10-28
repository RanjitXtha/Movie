import React, { useEffect } from 'react';

const Homepage = () => {
  useEffect(()=>{

 
  const PopularMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/popular')
    const data = await response.json();
    console.log(data);
  } 

  const LatestMovies = async()=>{
    const response = await fetch('http://localhost:5000/api/movies/latest')
    const data = await response.json();
    console.log(data.latest);
  } 

  //PopularMovies();
  LatestMovies();
})
  return (
    <div>Homepagee
       <div>new page is added</div>
    </div>
   
  )
}

export default Homepage