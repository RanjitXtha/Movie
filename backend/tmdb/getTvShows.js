const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';

const handleTvShows =(req,res)=>{
    const category = req.params.category;
    //console.log('category:'+ category )
    
    const fetchLatestTvShows = async (req, res) => {
      //console.log("request obtained")
        try {
          const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`);
          const data = await response.json(); 
          //console.log(data.results)
          res.json({ results: data.results });
        } catch (err) {
          console.log('Error during fetching latest tv shows: ' + err);
          res.status(500).json({ message: 'Error during fetching latest tv shows' });
        }
      };

      const fetchTodayTvShows = async (req, res) => {
        //console.log("request obtained")
          try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`);
            const data = await response.json(); 
            //console.log(data.results)
            res.json({ results: data.results });
          } catch (err) {
            console.log('Error during fetching latest tv shows: ' + err);
            res.status(500).json({ message: 'Error during fetching latest tv shows' });
          }
        };

        const fetchPopularTvShows = async (req, res) => {
            try {
              const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
              const data = await response.json(); 
              res.json({ results: data.results });
            } catch (err) {
              console.log('Error during fetching latest tv shows: ' + err);
              res.status(500).json({ message: 'Error during fetching latest tv shows' });
            }
          };
    
      const fetchTopRatedTvShows = async (req, res) => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`);
           
          const data = await response.json(); 
          res.json({ results: data.results });
        } catch (err) {
          console.log('Error during fetching latest tv shows: ' + err);
          res.status(500).json({ message: 'Error during fetching latest tv shows' });
        }
      };

      switch(category){
        case 'on_the_air':{
            fetchLatestTvShows(req,res);
            break;
        }
        case 'top_rated':{
            fetchTopRatedTvShows(req,res);
            break;
        }case 'popular':{
          fetchPopularTvShows(req,res);
          break;
        }case 'airing_today':{
          fetchTodayTvShows(req,res);
          break;
        }
        default:{
            return;
        }
      }
}

module.exports = {handleTvShows}