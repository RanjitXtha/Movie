import React, { useEffect, useRef, useState } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../Context/userAuth';
import { useContext } from 'react';

const Profile = () => {
    const {username , userId} = useContext(UserAuthContext);
    
    const navigate = useNavigate();
    const [profile , setProfile] = useState(false);
    const profileRef = useRef();

    const handleVisibility = (e)=>{
        if(profileRef.current && !profileRef.current.contains(e.target)){
            setProfile(false)
        }

    }

    const LogOut = ()=>{
        console.log('logout')
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(()=>{
        document.addEventListener('mousedown',handleVisibility);
        return ()=>{
            document.removeEventListener('mousedown',handleVisibility);
        }
    },[])
  return (
    <div >
        <button onClick={()=>setProfile(!profile)} className='relative text-3xl'>
            <IoPersonCircleSharp />
            <div ref={profileRef} className={`text-base ${profile?'block':'hidden'} right-0 p-4 grid gap-4 top-[2rem] bg-cyan-500 min-w-[10rem] absolute`}>
                <p>{username}</p>
                <nav><a href={`/api/history`}>History</a></nav>
                <nav><a href={`/api/favourites`}>Favourites</a></nav>
                <nav><a href={`/api/watchlater`}>Watch Later</a></nav>
                <a href="/" onClick={LogOut}>Logout</a>
            </div>
        </button>
    </div>
  )
}

export default Profile