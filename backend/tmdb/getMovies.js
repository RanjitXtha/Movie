const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';

const handleMovies = (req,res)=>{
  const category = req.params.category;
  //console.log(category);

  const fetchPopularMovies = async(req,res) =>{
    const page = req.query.page || 1;
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json({results:data.results}) 
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
        res.json({results:data.results}); 
      } catch (error) {
        console.error("Error fetching the latest movie:", error);
        res.status(500).json({ message: "Failed to fetch the latest movie" });
      }
    }

    const fetchMoviesByGenre = async(req,res)=>{
      console.log("Here")
      const genreType = req.query.genreType;
      const page = req.query.page;
      console.log('TYpe:'+ genreType + page)
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreType}
    `);
      const movies = await response.json()
      res.json({results:movies})
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


  
const fetchLatestTvShows = async (req, res) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`);
    const data = await response.json(); // Make sure to await here to properly parse JSON
    res.json({ results: data.results });
  } catch (err) {
    console.log('Error during fetching latest tv shows: ' + err);
    res.status(500).json({ message: 'Error during fetching latest tv shows' });
  }
};

const fetchMoviePage = async(req,res)=>{
  const movieId = req.params.id; 
  //console.log(movieId);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const movieData = await response.json()
  const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
  const movieTrailer = await trailerResponse.json()
  //console.log(movieData);
  res.json({details:movieData , trailer:movieTrailer})
}


const fetchMovieGenres = async(req,res)=>{
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  const genres = await response.json();
  //console.log("Request sent")
  //console.log(genres)
  res.json({results:genres})
}


module.exports = { handleMovies , fetchLatestTvShows , fetchMoviePage,
   fetchMovieGenres
};
  
