import React from 'react'
import { IoSearch } from "react-icons/io5";
import { useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate();
    const [searchbar , setSearchBar]=  useState(false);
    const [searchQuery , setSearchQuery] = useState('');
    const handleSearch = (e)=>{
        if(e.key === 'Enter'){
            console.log('enter');
            if(searchQuery !==''){
                navigate(`/api/search?query=${searchQuery}`);
            }   
           
        }

    }

  return (
    <div>
        <span className='flex justify-end pt-[3px]'>
                  
        <input type="text" placeholder='Search' className={`${!searchbar?'w-0':'w-full'} 
            placeholder-white px-[2rem] md:px-2 focus:outline-none transition-all bg-transparent
                absolute md:static top-[3rem] left-0 right-0
            `} 
            onChange={(e)=>setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            />
            <button onClick={()=>setSearchBar(!searchbar)} className='text-xl'><IoSearch /></button>
        </span>
    </div>
  )
}

export default Search