import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import bg1 from '../assets/bg1.jpeg';
import { jwtDecode } from 'jwt-decode';
import { UserAuthContext } from '../Context/userAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUsername, setUserId } = useContext(UserAuthContext); 
  const [error , setError] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    const userData = JSON.stringify(data);

    const response = await fetch('https://movie-api-blush.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    });

    if (response.ok) {
      const tokenData = await response.json();
      localStorage.setItem('token', tokenData.token);

      const decodedToken = jwtDecode(tokenData.token);
      setUsername(decodedToken.username); 
      setUserId(decodedToken.userId); 
      //directly set the userAuth's username and id as navigating wont cause userauth to run again. only refreshing does. 
      //changing thevalue directly changes the state and helps render the header.

      navigate('/');
    } else {
      const error = await response.json();
      setError(error.message);
    }
  };

  return (
    <div
      className="grid justify-center items-center h-screen w-screen bg-cover text-white"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <a className="fixed left-0 top-[2rem] text-4xl font-bold padding" href="/">
        NEPFLIX
      </a>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Log In</h1>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button className="w-full button">Submit</button>
        {error}
        <p className="text-center">OR</p>
        <a href="/signup" className="text-center hover:text-blue-500">
          No account? Sign up instead
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
