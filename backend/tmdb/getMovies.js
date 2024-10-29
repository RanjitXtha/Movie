const access_token_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2E2ZDViMzEzZDBhMWNmZDlkYTlmOWJkMGU0ZTQ3NSIsIm5iZiI6MTczMDExMjgzMi4wMjg4NTEsInN1YiI6IjY3MWY2YWI1MWVhMzM5MjgyOTdkYjcxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2awqv6l8i_1r-MPvnOjmV09Di_ocFNol5hGlOJUOeCA';
const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchPopularMovies = async(req,res) =>{
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      res.json({popular:data.results}) 
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch the latest movie" });
    }
  }

 const fetchLatestMovie =  async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
      const data = await response.json();
      res.json({latest:data.results}); 
    } catch (error) {
      console.error("Error fetching the latest movie:", error);
      res.status(500).json({ message: "Failed to fetch the latest movie" });
    }
  }
  
const fetchLatestTvShows = async (req, res) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`);
    const data = await response.json(); // Make sure to await here to properly parse JSON
    res.json({ latest: data.results });
  } catch (err) {
    console.log('Error during fetching latest tv shows: ' + err);
    res.status(500).json({ message: 'Error during fetching latest tv shows' });
  }
};

module.exports = {fetchPopularMovies , fetchLatestMovie , fetchLatestTvShows};
