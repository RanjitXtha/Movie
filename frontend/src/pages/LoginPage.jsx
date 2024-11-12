import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import bg1 from '../assets/bg1.jpeg'

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
            navigate('/')
        }else{
            const error = await response.json();
            alert(error.message);
        }
      } 
      return (
        <div className="grid justify-center items-center h-screen w-screen bg-cover text-white "
        style={{backgroundImage:`url(${bg1})`}}
        >
            <a className='fixed left-0 top-[2rem] text-4xl font-bold padding' href="/">NEPFLIX</a>
        <form className=" form " onSubmit={handleSubmit}>
            <h1 className='text-3xl font-bold'>Log In</h1>
           
                <input type="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className='input' />
        

                <input type="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className='input' />
            <button className="w-full button">Submit</button>
            <p1 className="text-center">OR</p1>
            <a href="/signup" className="text-center hover:text-blue-500">No account? Sign up instead</a>
        </form>
       
       
    </div>
      )
}

export default LoginPage