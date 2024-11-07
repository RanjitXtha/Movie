const handleSearch = async(req,res)=>{
    const searchQuery = req.query.searchQuery;
    try{
    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${searchQuery}`);
    const movieData = await movieResponse.json();

    const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=YOUR_API_KEY&query=${searchQuery}`
      );
      const tvData = await tvResponse.json();

      const searchResult = movieData.results.concat(tvData.results);
      res.send({searchResult});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error fetching search results' });
    }

}

module.exports = {handleSearch};