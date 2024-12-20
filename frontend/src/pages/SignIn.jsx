import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import bg2 from '../assets/bg2.jpg'
import { jwtDecode } from 'jwt-decode';
import { UserAuthContext } from '../Context/userAuth';
import { useContext } from 'react';


const SignIn = () => {
    const { setUsername, setUserId } = useContext(UserAuthContext); 
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [username , setUsernameSignIn] = useState('');
    const [error , setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
      
        try{
            const userData = {email, username, password};
            const data = JSON.stringify(userData)

            if (password.length < 8) {
                setError("Password must be at least 8 characters long.");
                return;
              }
              setError('');
                     
            const response = await fetch('https://movie-api-blush.vercel.app/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:data,
             
            })

            if(response.ok){
                const tokendata = await response.json();
                localStorage.setItem('token',tokendata.token)
                console.log('token created');

                const decodedToken = jwtDecode(tokendata.token);
                setUsername(decodedToken.username); 
                setUserId(decodedToken.userId); 
                navigate('/');
            }else{
                const error = await response.json();
                setError(error.message);
            }
 
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="grid justify-center items-center h-screen w-screen bg-cover text-white "
    style={{backgroundImage:`url(${bg2})`}}
    > <a className='fixed left-0 top-[2rem] text-4xl font-bold padding' href="/">NEPFLIX</a>
        <form className=" form " onSubmit={handleSubmit}>

                <input className='input' type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

                <input className='input' type="text" id="username" placeholder="Username" onChange={(e)=>setUsernameSignIn(e.target.value)} />

                <input className='input' type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button className="w-full button">Submit</button>
            {error}
            <p className='text-center'>OR</p>
            <a href="/login" className="text-center hover:text-blue-500">Already have an account? Log In </a>
        </form>
       
    </div>
  )
}

export default SignIn