import React, { useEffect, useState } from 'react'

const PageButtons = ({ setPage , page , totalPages}) => {
    const buttons = [1, 2, 3, 4, 5];
    const [val,setVal] = useState(0);
    
    const totalButtons = buttons.length;

    

  return (
    <section className='w-full flex justify-center gap-4'>
        <button onClick={setPage(1)}></button>
        <button onClick={setPage(1)}></button>
    {buttons.map((button) => (
      <button
        key={button}
        onClick={() => setPage(button)}
        className={`w-8 h-8 flex justify-center items-center rounded-full ring-2 ${page === button ? 'bg-cyan-500' : ''}`}
      >
        {button+val}
      </button>
    ))}
  </section>
  )
}

export default PageButtons