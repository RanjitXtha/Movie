import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('');

      const navigate = useNavigate();
    
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {email , password};
        const userData = JSON.stringify(data);

        const response = await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:userData,
        })

        if(response.ok){
            const tokenData = await response.json();
            localStorage.setItem('token',tokenData.token);
            console.log('token created');
        }else{
            const error = await response.json();
            alert(error.message);
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
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </span>
            <button className="w-20 h-8 bg-slate-900 text-white">Submit</button>
        </form>
        <a>No account?</a>
       
    </div>
      )
}

export default LoginPage