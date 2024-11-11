import React, { useEffect, useRef, useState } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
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
            <div ref={profileRef} className={`text-base ${profile?'block':'hidden'} right-0 p-4 grid gap-y-4 top-[2.2rem] text-start  bg-blue-500 w-full min-w-[10rem] justify-start absolute`}>
                <nav><p>< IoPersonCircleSharp className='inline mr-2 text-xl' />{username}</p></nav>
                <nav><a href={`/api/history`}>< FaHistory className='inline mr-2 text-xl' />History</a></nav>
                <nav><a href={`/api/favourites`}>< FaHeart className='inline mr-2 text-xl' />Favourites</a></nav>
                <nav><a href={`/api/watchlater`}>< FaClock className='inline mr-2 text-xl' />Watch Later</a></nav>
                <a href="/" onClick={LogOut}> <FiLogOut className='inline mr-2 text-xl'/>Logout</a>
            </div>
        </button>
    </div>
  )
}

export default Profile