import React from 'react';
import { useEffect , useState } from 'react';

const SearchPage = () => {
    useEffect(()=>{
        const fetchSearchData = async()=>{
            const response = await fetch(`http://localhost:5000/api/search?query=${searchQuery}`);
            console.log(response);
        }
        fetchSearchData();
    },[])
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage