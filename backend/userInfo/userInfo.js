const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');

const addHistory = async(req,res)=>{
    const {movieId , title , image , userId } = req.body;

    try{
        const movieData = {
            movieId , title , image
        }
        //console.log(movieData);

        const updateData = await userSchema.findByIdAndUpdate(
            userId,
            {$push:{recentHistory:movieData}},
            {new:true}
        )
        //res.status(200).json({ message: 'Movie added to history'});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error adding to history'});
    }
}

const addFavourite = async(req,res)=>{
   const {movieId , title , image , userId } = req.body;

   try{
       const movieData = {
           movieId , title , image
       }

       const user = await userSchema.findById(userId);

       if(!user){
        return res.status(404).json({ message: 'User not found' });
       }
       const movieExists = user.favourites.some((movie) => String(movie.movieId) === String(movieId));
       //movie.movidId and movieId maybe be diff datatypes. String vs Int
       if (movieExists) {
        return res.status(400).json({ message: 'Movie already in favourites' });
      }

      user.favourites.push(movieData);
      await user.save();

       res.status(200).json({ message: 'Movie added to favourites'});
   }catch(err){
       console.log(err);
       res.status(500).json({ message: 'Error adding to favourites'});
   } 
}

const addWatchLater = async(req,res)=>{
  const {movieId , title , image , userId } = req.body;
  try{
    const movieData = {
      movieId, title , image
    };

    const user = await userSchema.findById(userId);

    if(!user){
     return res.status(404).json({ message: 'User not found' });
    }
    const movieExists = user.watchLater.some((movie) => String(movie.movieId) === String(movieId));
    if (movieExists) {
     return res.status(400).json({ message: 'Movie already in watch later' });
   }

   user.watchLater.push(movieData);
   await user.save();

    
    res.status(200).json({ message: 'Movie added to watchLater'});

  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error adding to watchLater'});
  }
    
}

const getHistory = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userSchema.findById(userId).select('recentHistory');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.recentHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching history' });
    }
  }

const getFavourite = async(req,res)=>{
  const {userId} = req.params;
  try{
    const user = await userSchema.findById(userId).select('favourites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching favourites' });
  }

}

const getWatchLater = async(req,res)=>{
  const {userId} = req.params;
  try{
    const user = await userSchema.findById(userId).select('watchLater');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.watchLater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching watchLater' });
  }

}

const deleteHistory = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the movie with the specified movieId
    user.recentHistory = user.recentHistory.filter(
      (item) => item.movieId !== movieId
    );

    await user.save();
    res.json({ message: 'Movie removed from history', recentHistory: user.recentHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing movie from history' });
  }
}

const deleteFavourite = async(req,res)=>{
  const { userId, movieId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favourites = user.favourites.filter(
      (item) => item.movieId !== movieId
    );

    await user.save();
    res.json({ message: 'Movie removed from history', favourites: user.favourites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing movie from favourites' });
  }

}

const deleteWatchLater = async(req,res)=>{
  const { userId, movieId } = req.params;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.watchLater = user.watchLater.filter(
      (item) => item.movieId !== movieId
    );

    await user.save();
    res.json({ message: 'Movie removed from history', watchLater: user.watchLater });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing movie from watchlater' });
  }

}

module.exports = {addHistory , addFavourite , addWatchLater , getHistory ,getFavourite , getWatchLater ,
deleteHistory , deleteFavourite ,deleteWatchLater
};