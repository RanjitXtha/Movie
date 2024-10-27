import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

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
    <div className="grid justify-center items-center ">
        <form className=" flex flex-col gap-y-4 my-8 " onSubmit={handleSubmit}>
            <span className="flex gap-5">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            </span>

            <span className="flex gap-5">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
            </span>
        
            <span className="flex gap-5">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </span>
            <button className="w-20 h-8 bg-slate-900 text-white">Submit</button>
        </form>
       
    </div>
  )
}

export default SignIn