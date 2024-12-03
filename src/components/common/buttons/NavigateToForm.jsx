import React from 'react'
import { useSelector } from 'react-redux'
import { IoAddCircleOutline } from "react-icons/io5";
const NavigateToForm = ({onClick,buttonText}) => {
    const Theme = useSelector((state)=>state.Theme.theme)
  return (
    <button
    onClick={onClick}
    className={`p-2 rounded hover:scale-95 min-w-24 bg-red-500 text-white flex items-center gap-2 `} >
    <IoAddCircleOutline size={20}/>{buttonText}
       </button>
  )
}

export default NavigateToForm
