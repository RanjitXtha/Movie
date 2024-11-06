const API_KEY = '67a6d5b313d0a1cfd9da9f9bd0e4e475';
const BASE_URL = 'https://api.themoviedb.org/3';

const handleMovieData = async(req,res)=>{
    try{
    const movieId = req.params.movieId;
    const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const castData = await castResponse.json();
    
    const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const similarMovies = await similarResponse.json();

    const details = {
        castData , similarMovies
    }
    //console.log(castData);
    res.json(details);
}catch(err){
    console.log(err);
}

}

const handleTVShowData = async(req,res)=>{
    try{
    const tvId = req.params.tvId;
    const castResponse = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${API_KEY}`);
    const castData = await castResponse.json();
    
    const similarResponse = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${API_KEY}`);
    const similarMovies = await similarResponse.json();

    const details = {
        castData , similarMovies
    }
    //console.log('obtained')
    //console.log(castData);
    res.json(details);
}catch(err){
    console.log(err);
}

}
module.exports = {handleMovieData,handleTVShowData };
