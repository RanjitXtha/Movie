const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Username Required'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    recentHistory: [
        {
          movieId: { type: String, required: true },
          title: { type: String, required: true },
          image:{type:String},
          watchedAt: { type: Date, default: Date.now }
        }
      ],

      favourites: [
        {
          movieId: { type: String, required: true },
          title: { type: String, required: true },
          image:{type:String},
        }
      ],

      watchLater: [
        {
          movieId: { type: String, required: true },
          title: { type: String, required: true },
          image:{type:String},
        }
      ],

},{timestamps:true});

module.exports = mongoose.model('userData',userSchema);