require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {LogIn , SignIn} = require('./controller/authController');
const {fetchMoviePage,
    handleMovies
} = require('./tmdb/getMovies');

const {fetchMovieGenres , fetchTvShowsGenres} = require('./tmdb/getGenres');

const {handleTvShows, fetchTvPage} = require('./tmdb/getTvShows');
const {handleMovieData, handleTVShowData} = require('./tmdb/getMovieDetails');
const {addHistory , addFavourite , addWatchLater , getHistory ,getFavourite , getWatchLater ,
    deleteHistory , deleteFavourite ,deleteWatchLater
    } = require('./userInfo/userInfo');

const {handleSearch} = require('./tmdb/handleSearch');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/moviedb?retryWrites=true&w=majority";
const cors = require('cors');
const app = express();

app.use(cors(
    {
        origin:["https://movie-api-blush.vercel.app/"],
        methods : ["POST","GET"],
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURL).then(()=>{
    app.listen(5000);
    console.log('server created');
    console.log('connected to db');
}).catch((error)=>{console.log(error)});


app.get('/',(req,res)=>{
    res.send('This is homee page');
})

app.get('/login',(req,res)=>{
    res.send('This is login page');
})

app.get('/signup',(req,res)=>{
    res.send('This is signup page');
})

app.post('/signup',SignIn)
app.post('/login',LogIn)

app.get('/api/genres/movies',fetchMovieGenres);
app.get('/api/genres/tv',fetchTvShowsGenres);

app.get('/api/movies/:category',handleMovies);
app.get('/api/movies/movie/:id',fetchMoviePage)
app.get('/api/movies/info/:movieId',handleMovieData);

app.get('/api/tvshows/:category',handleTvShows);
app.get('/api/tvshows/tv/:tvId',fetchTvPage);
app.get('/api/tvshows/info/:tvId',handleTVShowData);

app.get('/api/search',handleSearch);


app.post('/api/history',addHistory);
app.post('/api/favourites',addFavourite);
app.post('/api/watchlater',addWatchLater);

app.get('/api/:userId/history', getHistory);
app.get('/api/:userId/favourites', getFavourite);
app.get('/api/:userId/watchlater', getWatchLater);

app.delete('/api/:userId/history/:movieId', deleteHistory);
app.delete('/api/:userId/favourites/:movieId', deleteFavourite);
app.delete('/api/:userId/watchlater/:movieId', deleteWatchLater);

