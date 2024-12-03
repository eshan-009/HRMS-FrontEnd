import React from 'react'

const Headings = ({title}) => {
  return (
    <div className='flex justify-between font-bold w-full xl:text-2xl md:text-xl sm:text-sm  mt-4 mb-8'>
           <p>{title}</p>
           <p>Home / <span className='text-yellow-600'>{title}</span></p>
           </div>
  )
}

export default Headings
