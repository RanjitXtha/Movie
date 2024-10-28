const express = require('express');
const mongoose = require('mongoose');

const {LogIn , SignIn} = require('./controller/authController');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/moviedb?retryWrites=true&w=majority";
const cors = require('cors');
const app = express();

app.use(cors());
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
