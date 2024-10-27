const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = require('./schema/userSchema');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/moviedb?retryWrites=true&w=majority";
const cors = require('cors');

const app = express();

const SECRET_KEY= 'thisisasecretkey';

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

app.post('/signup',async(req,res)=>{
    try{
        const {username , email , password} = req.body;
       
        const existingEmail = await userSchema.findOne({email});
        if(existingEmail){
            console.log('email already exists');
            return res.status(400).json({message:'Email already Exists'})
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new userSchema({
            email,username,password:hashedPassword
        } )

        await newUser.save();

        const token = jwt.sign({email , username },SECRET_KEY ,{expiresIn: '7d'} );
        return res.json({token});
    }catch(err){
        console.log('error in signup' + err);
    }
})


app.post('/login',async(req,res)=>{
    try{
        const {email , password} = req.body;
        
        const user = await userSchema.findOne(email);

        if (!user) {
            console.log('User doesn\'t exist');
            return res.status(404).json({ message: 'User does not exist' });
        }

    const isPasswordCorrect = await bcrypt.compare(password , user.password);

    if(!isPasswordCorrect){
        console.log('Incorrect Password');
        return res.status(400).json({message:'Wrong Password'})
    }

    console.log('Logged In');

    const token = jwt.sign({email , username },SECRET_KEY ,{expiresIn: '7d'} );
    return res.json({token});
}catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
}

})
