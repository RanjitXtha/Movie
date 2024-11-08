require('dotenv').config();
const API_KEY = process.env.API_KEY;
console.log(API_KEY);
//const fetch = require('node-fetch');

const handleMovies = (req,res)=>{
  const category = req.params.category;

  const fetchPopularMovies = async(req,res) =>{
    const page = req.query.page || 1;
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json({results:data.results,total_pages:data.total_pages}) 
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch the latest movie" });
      }
    }
  
   const fetchLatestMovie =  async (req, res) => {
      const page = req.query.page || 1;
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        res.json({results:data.results,total_pages:data.total_pages}); 
      } catch (error) {
        console.error("Error fetching the latest movie:", error);
        res.status(500).json({ message: "Failed to fetch the latest movie" });
      }
    }

    const fetchMoviesByGenre = async(req,res)=>{
      const genreType = req.query.genreType;
      const page = req.query.page;
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreType}&page=${page}
    `);
      const movies = await response.json()
      res.json({results:movies.results,total_pages:movies.total_pages})
    }
    

    switch(category){
      case 'latest':{
        fetchLatestMovie(req,res);
        break;
        }
      case 'popular':{
        fetchPopularMovies(req,res);
        break;
      } 
      case 'genre':{
        fetchMoviesByGenre(req,res);
        break;
      }
      default:
        return ;
    }

  

}


const fetchMoviePage = async(req,res)=>{
  const movieId = req.params.id; 
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const movieData = await response.json()
  const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
  const movieTrailer = await trailerResponse.json()
  res.json({details:movieData , trailer:movieTrailer})
}





module.exports = { handleMovies , fetchMoviePage,
};
  
