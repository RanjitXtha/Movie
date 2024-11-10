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
       //console.log(movieData);

       const updateData = await userSchema.findByIdAndUpdate(
           userId,
           {$push:{favourites:movieData}},
           {new:true}
       )
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

    const updatedData = await userSchema.findOneAndUpdate(
      userId,{$push:{watchLater:movieData}},{new:true}
    )
    res.status(200).json({ message: 'Movie added to watchLater'});

  }catch(err){
    console.log(err);
    es.status(500).json({ message: 'Error adding to watchLater'});
  }
    
}

const getHistory = async (req, res) => {
  console.log('recieved')
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
    const user = await userSchema.findById(userId).select('favourties');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.recentHistory);
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
    res.json(user.recentHistory);
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

}

const deleteWatchLater = async(req,res)=>{

}

module.exports = {addHistory , addFavourite , addWatchLater , getHistory ,getFavourite , getWatchLater ,
deleteHistory , deleteFavourite ,deleteWatchLater
};