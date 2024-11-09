const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');

const addHistory = async(req,res)=>{
    console.log('received')
    const userId = req.params.userId;
    const {movieId , title , image } = req.body;

    try{
        const movieData = {
            movieId , title , image
        }
        console.log(movieData);

        const updateData = await userSchema.findByIdAndUpdate(
            userId,
            {$push:{recentHistory:movieData}},
            {new:true}
        )
        res.status(200).json({ message: 'Movie added to history'});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error adding to history'});
    }
}

const addFavourite = ()=>{
    
}

const addWatchLater = ()=>{
    
}

const getHistory = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await userSchema.findById(userId).select('recentHistory'); // Only get the recentHistory field
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

}

const getWatchLater = async(req,res)=>{

}

const deleteHistory = async(req,res)=>{

}

const deleteFavourite = async(req,res)=>{

}

const deleteWatchLater = async(req,res)=>{

}

module.exports = {addHistory , addFavourite , addWatchLater , getHistory ,getFavourite , getWatchLater ,
deleteHistory , deleteFavourite ,deleteWatchLater
};