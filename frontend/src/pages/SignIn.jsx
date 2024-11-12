import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import bg2 from '../assets/bg2.jpg'

const SignIn = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [username , setUsername] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
      
        try{
            const userData = {email, username, password};
            const data = JSON.stringify(userData)
                     
            const response = await fetch('http://localhost:5000/signup',{
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
                navigate('/');
            }else{
                const error = await response.json();
                alert(error.message);
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

                <input className='input' type="text" id="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />

                <input className='input' type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button className="w-full button">Submit</button>
            <p className='text-center'>OR</p>
            <a href="/login" className="text-center hover:text-blue-500">Already have an account? Log In </a>
        </form>
       
    </div>
  )
}

export default SignIn