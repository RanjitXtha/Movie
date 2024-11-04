import React, { useEffect, useState } from 'react'

const PageButtons = ({ setPage , page , totalPages}) => {
    const buttons = [3, 4, 5, 6, 7];
    const [val,setVal] = useState(0);
    
    const totalButtons = buttons.length;

    

  return (
    <section className='w-full flex justify-center gap-4'>
      
        {buttons.map((button) => (
      <button
        key={button}
        onClick={() => setPage(button)}
        className={`pagebutton ${page === button ? 'bg-cyan-500' : ''}`}
      >
        {button+val}
      </button>
    ))}
  </section>
  )
}

export default PageButtons