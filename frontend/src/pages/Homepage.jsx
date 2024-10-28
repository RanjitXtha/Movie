import React from 'react';

const Homepage = () => {
  const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';
  async function fetchPopularMovies() {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.results); // Logs popular movies
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  fetchPopularMovies();
  return (
    <div>Homepagee
       <div>new page is added</div>
    </div>
   
  )
}

export default Homepage