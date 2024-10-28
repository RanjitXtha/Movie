const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = require('./schema/userSchema');

const SECRET_KEY= 'thisisasecretkey';

const LogIn = async(req,res)=>{
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
}


const SignIn = async(req,res)=>{
    try{
        
        const {email , password} = req.body;
        
        const user = await userSchema.findOne({email});



        if (!user) {
            console.log('User doesn\'t exist');
            return res.status(404).json({ message: 'User does not exist' });
        }
    const username = user.username;
    const isPasswordCorrect = await bcrypt.compare(password , user.password);

    if(!isPasswordCorrect){
        console.log('Incorrect Password');
        return res.status(400).json({message:'Wrong Password'})
    }

    console.log('Logged In');

    const token = jwt.sign({email ,username },SECRET_KEY ,{expiresIn: '7d'} );
    return res.json({token});
}catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
}

}

module.exports = {LogIn , SignIn};